<template>
  <el-container>
    <el-header>
      <home-menu @openCart="openCart" :isOwner="isOwner"></home-menu>
    </el-header>
    <el-main>
      <canteen-cards></canteen-cards>
      <Order v-model="isCartOpen"></Order>
    </el-main>
  </el-container>


</template>

<script>
import HomeMenu from "@/components/HomeMenu";
import CanteenCards from "@/components/CanteenCards";
import Order from "@/components/Order";

export default {
  components: { HomeMenu, CanteenCards: CanteenCards, Order},
  data() {
    return {
      cardNum: 1,
      isCartOpen: false,
      isOwner: true
    }
  },
  methods: {
    addCard() {
      this.cardNum+=1;
    },
    openCart() {
      console.log("testsetOwner")
      this.isCartOpen = true
    }
  }

}
</script>

<style scoped>
.main-layout {
  /*position: relative;*/
}

.menu-layout {
  /*position: fixed;*/
  /*background-color: white;*/
  /*!*height: 12%;*!*/
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
}

.el-header {
  position: relative;
  width: 100%;
  height: 60px;
}



.el-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 110px;
  bottom: 0;
  overflow-y: scroll;
}
</style>
