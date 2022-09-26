<template>
  <!--    <el-button v-on:click="addCard" >-->
  <!--      add-->
  <!--    </el-button>-->

  <el-row>
    <el-col v-for="i in cardNum" :key="i" :span="3" class="card">
      <canteen-card :isOwner="isOwner"></canteen-card>
    </el-col>
    <el-col :span="3" class="add-card" v-show="isOwner">
      <add-canteen-card></add-canteen-card>
    </el-col>
  </el-row>


</template>

<script>
import CanteenCard from "@/components/CanteenCard";
import AddCanteenCard from "@/components/AddCanteenCard";

export default {
  name: 'CanteenCards',
  props: {
    isOwner: {
      type: Boolean,
      default: false
    },
  },
  components: { CanteenCard, AddCanteenCard },
  data() {
    return {
      cardNum: 13
    }
  },
  methods: {
    addCard() {
      this.cardNum += 1;
    }
  }

}
</script>

<style>
.card {
  margin-top: 60px;
  margin-left: 60px
}

.add-card {
  margin-top: 60px;
  margin-left: 60px
}
</style>