<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->

  <div class="signUp">
    <div class="logo">
      <h1>Foodies</h1>
      <p v-show="isOwner" style="margin-left: 3px">Owner</p>
      <p v-show="!isOwner" style="margin-left: 3px">Customer</p>
    </div>


    <el-card style="text-align: center">
      <el-form class="signup-form"
               :model="credentials"
               :rules="rules"
               ref="form"
               @submit.prevent="signUp"
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
              class="signup-button"
              type="primary"
              native-type="submit"
              block>
            Sign Up
          </el-button>
        </el-form-item>
      </el-form>

        <el-button
            v-on:click="goSignIn"
            type="primary"
            link>
          Already has an account?
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
export default {
  name: 'SignUp',
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
    async signUp() {

    },
    goSignIn() {
      this.$router.push('signin')
    }
  }
}
</script>

<style scoped>

.signUp {
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

.signup-form {
  width: 260px;
}

.signup-button {
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
