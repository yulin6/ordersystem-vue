<template>
  <el-skeleton style="width: 240px" :loading="loading" animated>
    <template #template>
      <div style="margin: 50px">
        <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <el-skeleton-item variant="h3" style="width: 50%" />
          <div style="display: flex; align-items: center; margin-top: 16px; height: 16px;">
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <edit-canteen v-on:refreshData="refreshData"></edit-canteen>
      <el-row>
        <el-col v-for="(canteen, index) in canteens" :key="index" :span="3" class="card">
          <canteen-card :canteen="canteen"></canteen-card>
          <el-row v-show="isOwner">
            <el-button v-on:click="editCanteen(canteen)"
                       size="small"
                       style="margin-top: 8px;" >
              edit info
            </el-button>
            <el-button v-on:click="deleteCanteen(canteen.id)"
                       size="small"
                       type="danger"
                       style="margin-top: 8px; margin-left: 8px;">
              delete
            </el-button>
          </el-row>
        </el-col>
        <el-col :span="3" class="add-card" v-show="isOwner">
          <el-card style="cursor: pointer" shadow="hover" :body-style="{ padding: '0px' }" align="middle"
            v-on:click="addCanteen" class="box-card">
            <div class="mid">
              <el-icon color="#3F9EFF" size="large" border-radius="20px">
                <Plus />
              </el-icon>
              <p style="margin-left: 0;color: #3F9EFF;font-weight: bold">Add a new restaurant!</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </el-skeleton>
</template>


<script>
import CanteenCard from "@/components/CanteenCard";
// import AddCanteenCard from "@/components/AddCanteenCard";
import EditCanteen from "@/components/EditCanteen";
import CanteenService from "@/services/CanteenService";
import Utils from "@/utils/utils";

export default {
  name: 'CanteenCards',
  components: { CanteenCard, EditCanteen },
  data() {
    return {
      canteenService: CanteenService.getInstance(),
      cardNum: 13,
      loading: true,
      canteens: [],
    }
  },
  created() {
    this.getCanteens()
  },
  methods: {
    refreshData() {
      this.getCanteens()
    },
    async getCanteens() {
      let id = undefined
      if (this.isOwner) id = this.user.id
      await this.canteenService.getCanteensByUserId(id).then(res => {
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
    editCanteen(canteen) {
      this.$store.dispatch("openCloseEditCanteen", canteen.id);
      let types = []
      canteen.canteenTypes.forEach(type => {types.push(type.id)})
      let canteenTmp = {
        id: canteen.id,
        name: canteen.name,
        canteenTypes: types,
        description: canteen.description
      }
      this.$store.dispatch('setEditingCanteen', canteenTmp)
    },
    async deleteCanteen(canteenId) {
      await this.canteenService.deleteCanteen(canteenId).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success(res.msg)
          this.getCanteens()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addCanteen() {
      // -1: isAddCanteen is true
      this.$store.dispatch("openCloseEditCanteen", -1);
    },
  },
  computed: {
    isOwner() {
      return this.$store.state.isOwner
    },
    user() {
      return this.$store.state.user
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

.mid {
  margin-top: 50%;
  height: 50%;
}

.box-card {
  width: 164px;
  height: 282px;
  background-color: #ECF5FF;
}
</style>