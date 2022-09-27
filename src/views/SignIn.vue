<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->

  <div class="signIn">
    <div class="logo">
      <h1>Foodies</h1>
      <p v-show="isOwner" style="margin-left: 3px">Owner</p>
      <p v-show="!isOwner" style="margin-left: 3px">Customer</p>
    </div>


    <el-card style="text-align: center">
      <el-form class="signin-form"
               :model="credentials"
               :rules="rules"
               ref="form"
               @submit.prevent="login"
      >
        <el-form-item prop="username">
          <el-input v-model="credentials.username" placeholder="Username" prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="credentials.password" placeholder="Password" type="password" prefix-icon="Lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              :loading="loading"
              class="signin-button"
              type="primary"
              native-type="submit"
              block>
            Sign In
          </el-button>
        </el-form-item>
      </el-form>
      <el-button
          v-on:click="goSignUp"
          type="primary"
          link>
        Need an account?
      </el-button>
      <el-col style="margin-top: 5px">
        <el-button
            v-show="!isOwner"
            v-on:click="switchUserType"
            type="primary"
            link>
          I'm a restaurant owner
        </el-button>
        <el-button
            v-show="isOwner"
            v-on:click="switchUserType"
            type="primary"
            link>
          I'm a customer
        </el-button>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import router from "@/router";
import UserService from "@/services/UserService";

export default {
  name: 'SignIn',
  components: {},
  data() {
    return {
      UserService: UserService.getInstance(),
      validCredentials: {
        username: "testu",
        password: "testp"
      },
      credentials: {
        username: "",
        password: ""
      },
      isOwner: false,
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur"
          }
        ],
        password: [
          {required: true, message: "Password is required", trigger: "blur"},
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    switchUserType() {
      this.isOwner = !this.isOwner;
    },
    simulateLoginWait() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async login() {
      let valid = await this.$refs.form.validate();

      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLoginWait();
      this.loading = false;
      if (this.credentials.username === this.validCredentials.username &&
          this.credentials.password === this.validCredentials.password) {
        localStorage.setItem('userName', this.validCredentials.username)
        localStorage.setItem('userToken', this.validCredentials.password) //TODO change to token sent back by backend
        this.$store.dispatch("setUser", this.validCredentials.username);
        this.$store.dispatch("setToken", this.validCredentials.password); //TODO change to token sent back by backend
        console.log(this.$store.state.isLogin);
        this.$message.success("Login successful");
        if (this.isOwner) {
          await router.push('ownerHome');
        } else {
          await router.push('customerHome');
        }
      } else {
        this.$message.error("Username or password is invalid");
      }
    },
    goSignUp() {
      this.$router.push('signup')
    }
  }
}
</script>

<style scoped>

.signIn {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}

.el-card {
  width: 400px;
  display: flex;
  justify-content: center;
}

.signin-form {
  width: 260px;
}

.signin-button {
  width: 100%;
  margin-top: 20px;
}
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.logo {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
}
</style>
