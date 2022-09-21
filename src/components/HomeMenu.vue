<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0">
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
      <el-menu-item index="2-2">Log out</el-menu-item>
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

      this.$emit('openCart')
    }
  }


}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
