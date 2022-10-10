<template>
  <el-skeleton style="width: 240px" :loading="loading" animated>
    <template #template>
      <div style="margin: 50px">
        <el-skeleton-item variant="image" style="width: 240px; height: 240px"/>
        <div style="padding: 14px">
          <el-skeleton-item variant="h3" style="width: 50%"/>
          <div style="display: flex; align-items: center; margin-top: 16px; height: 16px;">
            <el-skeleton-item variant="text" style="margin-right: 16px"/>
            <el-skeleton-item variant="text" style="width: 30%"/>
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <el-row>
        <el-col v-for="(canteen, index) in canteens" :key="index" :span="3" class="card">
          <canteen-card :canteen="canteen"></canteen-card>
          <el-row>
            <el-button v-show="isOwner" style="margin-top: 8px; margin-left: 16px;" v-on:click="editCanteen"
                       size="small">
              edit info
            </el-button>
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
  </el-skeleton>
</template>


<script>
import CanteenCard from "@/components/CanteenCard";
import AddCanteenCard from "@/components/AddCanteenCard";
import CanteenService from "@/services/CanteenService";
import Utils from "@/utils/utils";

export default {
  name: 'CanteenCards',
  components: {CanteenCard, AddCanteenCard},
  data() {
    return {
      canteenService: CanteenService.getInstance(),
      cardNum: 13,
      loading: true,
      canteens: [],
    }
  },
  created() {
    this.getAllCanteens()
  },
  methods: {
    async getAllCanteens() {
      await new Promise(r => setTimeout(r, 200)); //TODO DELETE, just for demonstration
      await this.canteenService.getAllCanteens().then(res => {
        if (res.code === 401) {
          this.$message.error('Login credential expired')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.canteens = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      this.loading = false
    },
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