<template>
  <el-dialog v-model="this.$store.state.isEditCanteenOpen">
    <div v-show="!isAddCanteen">
      <h3>Edit Restaurant</h3>
      <el-form :model="editingCanteen" :rules="rules" ref="form">
        <el-form-item prop="name">
          <p>Restaurant Name:</p>
          <el-input style="margin-left: 10px" v-model="editingCanteen.name"
                    placeholder="Restaurant Name"
                    clearable class="input"></el-input>
        </el-form-item>
        <el-form-item prop="canteenTypes">
          <p>Restaurant Type:</p>
          <el-select style="margin-left: 10px" v-model="editingCanteen.canteenTypes" multiple
                     clearable class="input">
            <el-option v-for="option in options" :key="option.id" :label="option.type" :value="option.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="description">
          <p>Restaurant Description:</p>
          <el-input v-model="editingCanteen.description"
                    class="input"
                    placeholder="text"
                    style="margin-left: 10px"
                    clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="button" v-on:click="updateCanteen">Update</el-button>
    </div>

    <div v-show="isAddCanteen">
      <h3>Add Restaurant</h3>
      <el-form :model="addingCanteen" :rules="rules" ref="form">
        <el-form-item prop="name">
          <p>Restaurant Name:</p>
          <el-input style="margin-left: 10px" v-model="addingCanteen.name"
                    placeholder="Restaurant Name"
                    clearable class="input"></el-input>
        </el-form-item>
        <el-form-item prop="canteenTypes">
          <p>Restaurant Type:</p>
          <el-select style="margin-left: 10px" v-model="addingCanteen.canteenTypes" multiple
                     clearable
                     class="input">
            <el-option v-for="option in options" :key="option.id" :label="option.type" :value="option.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="description">
          <p>Restaurant Description:</p>
          <el-input style="margin-left: 10px" v-model="addingCanteen.description" placeholder="text"
                    clearable class="input">
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="button" v-on:click="addCanteen">Create</el-button>
    </div>
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
      canteenService: CanteenService.getInstance(),
      // picfileList: [],
      options: [],
      addingCanteen: {
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
          this.$message.success('Restaurant Info Updated')
          this.$emit('refreshData')
          this.closeDialog()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    async addCanteen() {
      await this.canteenService.addCanteen(this.addingCanteen).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success('Restaurant Created')
          this.$emit('refreshData')
          this.closeDialog()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    closeDialog() {
      this.addingCanteen = []
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