<template>
  <homeMenu></homeMenu>
    <el-button v-on:click="addCard">
      add
    </el-button>
    <el-row >
      <el-col
          v-for="o in cardNum"
          :key="o"
          :span="3"
          style="margin: 60px"
      >
        <CanteenCard></CanteenCard>
      </el-col>
    </el-row>


</template>

<script>
import HomeMenu from "@/components/HomeMenu";
import CanteenCard from "@/components/CanteenCard";
import { ref } from 'vue'

export default {
  name: 'customerHome',
  components: {HomeMenu, CanteenCard},
  data() {
    return {
      currentDate : ref(new Date()),
      cardNum: 1
    }
  },
  methods: {
    addCard() {
      this.cardNum+=1;
    }
  }

}
</script>

<style>

</style>