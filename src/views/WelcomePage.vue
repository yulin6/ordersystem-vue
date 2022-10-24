<template>

  <img src="../assets/welcome.png"
       alt="../assets/welcome.png"
       class="background"
  >

  <h1 class="foodies" style="font-size: 90px">
    Foodies
  </h1>

  <p class="caption">
    Enjoy food, Enjoy life
  </p>

  <el-button type="primary"
             class="getStarted"
             @click="goToSignIn"
             size="large"
             round
  >
    Get Started
  </el-button>

</template>

<script>
export default {
  name: 'WelcomePage',
  components: {},
  methods: {
    goToSignIn() {
      this.$router.push('/signIn')
    }
  }

}

</script>

<style>

.background {
  width: 100%;
  height: 100%;
  position: relative;
}
.foodies {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.caption {
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.getStarted{
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>