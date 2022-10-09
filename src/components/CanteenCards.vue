<template>

  <el-row>
    <el-col v-for="(canteen, index) in canteens" :key="index" :span="3" class="card">
      <canteen-card :canteen="canteen"></canteen-card>
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
import CanteenService from "@/services/CanteenService";

export default {
  name: 'CanteenCards',
  components: { CanteenCard, AddCanteenCard },
  data() {
    return {
      canteenService: CanteenService.getInstance(),
      cardNum: 13,
      canteens: [],
    }
  },
  created() {
    this.canteenService.getAllCanteens().then(res => {
      if(res.code === 401) {
        this.$message.error('Login credential expired')
        this.$router.push('/signin')
      } else {
        this.canteens = res.data
      }
    })
  },
  methods: {
    editCanteen() {
      this.$store.dispatch("openCloseEditCanteen", false);
    },
    deleteCanteen() {
      // TODO Since there is no actual data, use cardNum to mock the deletion here.
      this.cardNum -= 1;
    }
  },
  computed: {
    isOwner() {
      return this.$store.state.isOwner
    }
  },

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