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

    <el-menu-item index="1" style="margin-top: 10px" v-on:click="openCart">
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
      <template #title>username</template>
      <el-menu-item index="2-1">Order History</el-menu-item>
      <el-menu-item index="2-2" v-on:click="logOut">Log out</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script >
import { ref } from 'vue'

export default {
  name: 'HomeMenu',
  props: {
    isOwner: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      activeIndex: ref('0')
    }
  },
  components: {},
  methods: {
    openCart() {
      this.$store.dispatch("openCloseCart");
    },
    logOut(){
      this.$confirm('Logging out the current account, are you sure?', 'Logging out', {
        confirmButtonText: 'Log Out',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userToken');
        this.$router.push("/login");
        this.$message({
          type: 'success',
          message: 'Logged out!'
        });
      })
      //     .catch(() => {
      //   this.exits = false;
      //   this.$message({
      //     type: 'info',
      //     message: '已取消退出'
      //   });
      // });

    },
    backHome(){
      if (this.isOwner) {
        this.$router.push('/ownerHome')
      } else {
        this.$router.push('/customerHome')
      }
    }
  }


}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
