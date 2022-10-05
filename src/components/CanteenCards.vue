<template>

  <el-row>
    <el-col v-for="i in cardNum" :key="i" :span="3" class="card">
      <canteen-card></canteen-card>
      <el-row>
        <el-button v-show="isOwner" style="margin-top: 8px; margin-left: 16px;" v-on:click="editCanteen" size="small">
          edit info</el-button>
        <el-button v-show="isOwner" style="margin-top: 8px;" type="danger" v-on:click="deleteCanteen" size="small">
          delete
        </el-button>
      </el-row>
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
  computed: {
    isOwner() {
      return this.$store.state.isOwner
    }
  },
  components: { CanteenCard, AddCanteenCard },
  data() {
    return {
      cardNum: 13
    }
  },
  methods: {
    editCanteen() {
      this.$store.dispatch("openCloseEditCanteen", false);
    },
    deleteCanteen() {
      // Since there is no actual data, use cardNum to mock the deletion here.
      this.cardNum -= 1;
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