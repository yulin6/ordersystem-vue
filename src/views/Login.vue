<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->

  <div class="login">
    <div class="logo">
      <h1>Foodies</h1>
      <p v-show="isOwner" style="margin-left: 3px">Owner</p>
      <p v-show="!isOwner" style="margin-left: 3px">Customer</p>
    </div>


    <el-card style="text-align: center">
      <el-form class="login-form"
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
        <el-form-item v-show="isOwner">
            <el-button
                :loading="loading"
                class="login-button"
                type="primary"
                native-type="submit"
                block>
              Get Started
            </el-button>
        </el-form-item>
        <el-form-item v-show="!isOwner">
            <el-button
                :loading="loading"
                class="login-button"
                type="primary"
                native-type="submit"
                block>
              Get Started
            </el-button>
        </el-form-item>
      </el-form>
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
    </el-card>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: 'App',
  components: {},
  data() {
    return {
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
    simulateLogin() {
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
      await this.simulateLogin();
      this.loading = false;
      if (
          this.credentials.username === this.validCredentials.username &&
          this.credentials.password === this.validCredentials.password
      ) {
        this.$message.success("Login successful");
        if (this.isOwner) {
          await router.push('OwnerHome');
        } else {
          await router.push('CustomerHome');
        }
      } else {
        this.$message.error("Username or password is invalid");
      }
    }
  }
}
</script>

<style scoped>

.login {
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

.login-form {
  width: 260px;
}

.login-button {
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
