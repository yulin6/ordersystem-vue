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
               :model="signUpInfo"
               :rules="rules"
               ref="form"
               @submit.prevent="signUp"
      >
        <el-form-item prop="userName">
          <el-input v-model="signUpInfo.userName" placeholder="Username (required)" prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="signUpInfo.password" placeholder="Password (required)" type="password" prefix-icon="Lock"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="signUpInfo.name" placeholder="Nickname (required)" prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="signUpInfo.phone" placeholder="Phone Number" type="number" prefix-icon="Iphone"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="signUpInfo.email" placeholder="Email" type="email" prefix-icon="Message"></el-input>
        </el-form-item>
        <el-form-item prop="NRIC">
          <el-input v-model="signUpInfo.NRIC" placeholder="NRIC (required)" prefix-icon="Postcard"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" class="signup-button" type="primary" native-type="submit" block>
            Sign Up
          </el-button>
        </el-form-item>
      </el-form>

        <el-button v-on:click="goSignIn" type="primary" link>
          Already has an account?
        </el-button>
      <el-col style="margin-top: 5px">
        <el-button v-show="!isOwner" v-on:click="switchUserType" type="primary" link>
          I'm a restaurant owner
        </el-button>
        <el-button v-show="isOwner" v-on:click="switchUserType" type="primary" link>
          I'm a customer
        </el-button>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: 'SignUp',
  components: {},
  data() {
    return {
      userService: UserService.getInstance(),
      signUpInfo: {
        userName: '',
        password: '',
        nickname: '',
        phone: null,
        email: '',
        NRIC: '',
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
        ],
        phone: [
          {
            min: 8,
            max: 8,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "Nickname is required",
            trigger: "blur"
          }
        ],
        NRIC: [
          {
            required: true,
            message: "NRIC is required",
            trigger: "blur"
          }
        ],
      }
    }
  },
  methods: {
    switchUserType() {
      this.isOwner = !this.isOwner
      if(this.signUpInfo.type === 1){
        this.signUpInfo.type = 2
      } else if (this.signUpInfo.type === 2){
        this.signUpInfo.type = 1
      } else {
        this.$message.error("admin pages have not been built yet")
      }
    },
    async signUp() {
      let valid = await this.$refs.form.validate()
      if (!valid) return

      this.loading = true;
      await this.userService.signUp(this.signUpInfo)
          .then(async res => {
            if (res.resultCode === 1) {
              // console.log(res.content)
              this.$message.success("Sign up successful!")
              await this.$router.push('/signin')
            } else {
              this.$message.error(res.content);
            }
          })
      this.loading = false;

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
