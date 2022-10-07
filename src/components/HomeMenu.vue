<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0" v-on:click="backHome">
      <div class="logo">
        <h1>Foodies</h1>
        <p v-show="isOwner" style="margin-left: 3px">Owner</p>
        <p v-show="!isOwner" style="margin-left: 3px">Customer</p>
      </div>
    </el-menu-item>
    <div class="flex-grow" />

    <el-menu-item index="1" style="margin-top: 10px" v-on:click="openCartOrOrder">
      <el-icon v-show="isOwner">
        <Bell />
      </el-icon>
      <p v-show="isOwner">Customer Order</p>
      <el-icon v-show="!isOwner">
        <ShoppingCart />
      </el-icon>
      <p v-show="!isOwner">Cart</p>
    </el-menu-item>
    <el-sub-menu index="2" style="margin-top: 11px">
      <template #title>{{ this.user.username }}</template>
      <el-menu-item index="2-1" v-on:click="showOrderHistory" v-show="!isOwner">Order History</el-menu-item>
      <el-menu-item index="2-2" v-on:click="logOut" v-show="!isOwner">Log out</el-menu-item>
      <el-menu-item index="2-1" v-on:click="logOut" v-show="isOwner">Log out</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script >
import { ref } from 'vue'

export default {
  name: 'HomeMenu',
  components: {},
  data() {
    return {
      activeIndex: ref('0'),
    }
  },
  computed: {
    user() { return this.$store.getters.user },
    isOwner() { return this.$store.getters.isOwner }
  },
  methods: {
    openCartOrOrder() {
      if (this.isOwner) {
        this.$router.push('/orderHistory');
      } else {
        this.$store.dispatch("openCloseCart");
      }
    },
    logOut() {
      this.$confirm('Logging out the current account, are you sure?', 'Logging out', {
        confirmButtonText: 'Log Out',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch("setUser", null)
        this.$store.dispatch("setToken", null)
        this.$router.push("/signin");
        this.$message({
          type: 'success',
          message: "See you next time, " + this.user.username
        });
      })
    },
    backHome() {
      this.$router.push('/home')
    },
    showOrderHistory() {
      this.$router.push('/orderHistory')
    }
  },

}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
