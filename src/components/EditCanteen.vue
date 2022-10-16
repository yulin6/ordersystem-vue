<template>
  <el-dialog v-model="this.$store.state.isEditCanteenOpen">
    <h3 v-show="!isAddCanteen">EditCanteen</h3>
    <h3 v-show="isAddCanteen">AddCanteen</h3>
    <el-form :model="editingCanteen" :rules="rules" ref="form">
      <el-form-item prop="name">
        <p>Restaurant Name:</p>
        <el-input style="margin-left: 10px" v-model="canteenInfo.name" v-show="isAddCanteen"
                  placeholder="Restaurant Name"
                  clearable class="input"></el-input>
        <el-input style="margin-left: 10px" v-model="editingCanteen.name" v-show="!isAddCanteen"
                  placeholder="Restaurant Name"
                  clearable class="input"></el-input>
      </el-form-item>
      <el-form-item prop="canteenTypes">
        <p>Restaurant Type:</p>
        <el-select v-show="isAddCanteen" style="margin-left: 10px" v-model="canteenInfo.canteenTypes" multiple clearable
                   class="input">
          <el-option v-for="option in options" :key="option.id" :label="option.type" :value="option.id">
          </el-option>
        </el-select>
        <el-select v-show="!isAddCanteen" style="margin-left: 10px" v-model="editingCanteen.canteenTypes" multiple
                   clearable class="input">
          <el-option v-for="option in options" :key="option.id" :label="option.type" :value="option.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="description">
        <p>Restaurant Description:</p>
        <el-input v-show="isAddCanteen" style="margin-left: 10px" v-model="canteenInfo.description" placeholder="text"
                  clearable class="input">
        </el-input>
        <el-input v-show="!isAddCanteen" style="margin-left: 10px" v-model="editingCanteen.description"
                  placeholder="text"
                  clearable class="input">
        </el-input>
      </el-form-item>
    </el-form>
    <el-button v-show="!isAddCanteen" type="primary" class="button" v-on:click="updateCanteen">Update</el-button>
    <el-button v-show="isAddCanteen" type="primary" class="button" v-on:click="addCanteen">Create</el-button>
  </el-dialog>
</template>

<script>
import CanteenService from "@/services/CanteenService";
import Utils from "@/utils/utils";

export default {
  name: 'EditCanteen',
  created() {
    Utils.storeUserFromLocal()
    this.getAllCanteenTypes()
  },
  data: function () {
    return {
      canteenID: this.$store.state.canteenID,
      canteenService: CanteenService.getInstance(),
      // picfileList: [],
      options: [],
      canteenInfo: {
        name: '',
        description: '',
        userID: this.$store.state.user.id,
        canteenTypes: [],
      },
      rules: {
        name: [
          {
            required: true,
            message: "Restaurant name is required",
            trigger: "blur"
          }
        ],
      }
    }
  },
  methods: {
    async getAllCanteenTypes() {
      await this.canteenService.getAllCanteenTypes().then(res => {
        if (res.code === 401) {
          this.$message.error('Login credential expired')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.options = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    async updateCanteen() {
      await this.canteenService.updateCanteen(this.editingCanteen, this.editingCanteen.id).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success(res.msg)
          this.$emit('refreshData')
          this.closeDialog()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    async addCanteen() {
      let canteenDetail = this.formattedDishDetail()
      await this.canteenService.addCanteen(canteenDetail).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success(res.msg)
          this.$emit('refreshData')
          this.closeDialog()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    formattedDishDetail() {
      return {
        name: this.canteenInfo.name,
        description: this.canteenInfo.description,
        userID: this.canteenInfo.userID,
        canteenTypes: this.canteenInfo.canteenTypes,
      }
    },
    closeDialog() {
      this.canteenInfo = []
      this.$store.dispatch("closeOpenEditCanteen");
    },
    // loadFormData() {
    //   let imgurl = {}
    //   imgurl.url = this.diaFormData.gcover
    //   if (this.diaFormData.gcover != null) {
    //     this.picfileList.push(imgurl)
    //   }
    // },
    // dialogclose() {
    //   this.picfileList = []
    // }
  },
  computed: {
    isAddCanteen() {
      return this.$store.state.isAddCanteen
    },
    editingCanteen() {
      return this.$store.getters.editingCanteen
    }
  },

}
</script>

<style>
.button {
  margin-top: 16px;
  width: 130px;
}

.input {
  width: 400px;
}
</style>