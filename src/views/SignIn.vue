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
          <el-input v-model="credentials.userName" placeholder="Username" prefix-icon="User"></el-input>
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
// import router from "@/router";
import UserService from "@/services/UserService";

export default {
  name: 'SignIn',
  components: {},
  data() {
    return {
      userService: UserService.getInstance(),
      validCredentials: {
        username: "testu",
        password: "testp"
      },
      credentials: {
        userName: "",
        password: "",
        type: 1,
      },
      isOwner: false,
      loading: false,
      rules: {
        userName: [
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
      if(this.credentials.type === 1){
        this.credentials.type = 2

      } else if (this.credentials.type === 2){
        this.credentials.type = 1
      } else {
        console.log("admin login should not be here")
      }
    },
    async login() {
      let valid = await this.$refs.form.validate();

      if (!valid) {
        return;
      }
      this.loading = true;
      await this.userService.signIn(this.credentials)
          .then(async res => {
            if (res.resultCode === 1) {
              // console.log(res.content)
              localStorage.setItem('user', JSON.stringify(res.content))
              localStorage.setItem('userToken', res.token)
              this.$store.dispatch("setUser", res.content)
              this.$store.dispatch("setToken", res.token)
              this.$message.success("Welcome back, " + res.content.name)
              if (this.isOwner) {
                await this.$router.push('ownerHome')
              } else {
                await this.$router.push('customerHome')
              }
            } else {
              this.$message.error("Username or password is invalid");
            }
          })
      this.loading = false;
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
