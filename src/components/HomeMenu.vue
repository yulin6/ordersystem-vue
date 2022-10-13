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
      <template #title>
        {{ this.user.username }}
        <el-tag v-if="user.isMember" type="" class="mx-1" size="small" effect="light" style="margin-left: 10px" round>
          Pro
        </el-tag>
      </template>
      <el-menu-item index="2-1" v-on:click="showProfile" v-show="!isOwner">Profile</el-menu-item>
      <el-menu-item index="2-2" v-on:click="showOrderHistory" v-show="!isOwner">Order History</el-menu-item>
      <el-menu-item index="2-3" v-on:click="logOut" v-show="!isOwner">Log out</el-menu-item>
      <el-menu-item index="2-1" v-on:click="logOut" v-show="isOwner">Log out</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script >
import { ref } from 'vue'
import Utils from "@/utils/utils";

export default {
  name: 'HomeMenu',
  components: {},
  data() {
    return {
      activeIndex: ref('0'),
    }
  },
  created() {
    Utils.storeUserFromLocal()
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
    showProfile() {
      this.$store.dispatch("openCloseProfile");
    },
    logOut() {
      this.$confirm('Logging out the current account, are you sure?', 'Logging out', {
        confirmButtonText: 'Log Out',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: "See you next time, " + this.user.username
        })
        this.$router.push("/signin");
        Utils.removeLocalData()
      })
    },
    backHome() {
      this.$router.push('/home')
    },
    showOrderHistory() {
      this.$router.push('/orderHistory')
    },
  },

}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
