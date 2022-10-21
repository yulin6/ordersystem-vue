<template>
  <el-dialog v-model="this.$store.state.isEditCanteenOpen" @open="getImage">
    <div v-show="!isAddCanteen">
      <h3>Edit Restaurant</h3>
      <el-form :model="editingCanteen" :rules="rules" ref="editForm">
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
        <el-form-item class="upload-container">
          <p>Restaurant Image: </p>
          <el-upload
              ref="uploadForm"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :http-request="uploadFile"
              :limit=1
              accept="image/png,image/jpg,image/jpeg"
              style="margin-left: 10px"
              class="upload-demo">
            <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>

      </el-form>
      <el-button
          type="primary"
          class="button"
          native-type="submit"
          v-on:click="updateCanteen">
        Update
      </el-button>
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
      <el-button
          type="primary"
          class="button"
          native-type="submit"
          v-on:click="addCanteen">Create
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import CanteenService from "@/services/CanteenService";
import Utils from "@/utils/utils";
// import ImageUpload from "@/components/ImageUpload";

export default {
  name: 'EditCanteen',
  // components: {ImageUpload},
  created() {
    Utils.storeUserFromLocal()
    this.getAllCanteenTypes()
  },
  data: function () {
    return {
      canteenService: CanteenService.getInstance(),
      imageUrl: require('../assets/foodiesRestaurant.png'),
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
      let valid = await this.$refs.editForm.validate()
      if (!valid) return
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
      let valid = await this.$refs.form.validate()
      if (!valid) return
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
      this.addingCanteen = {
        name: '',
        description: '',
        userID: this.$store.state.user.id,
        canteenTypes: [],
      },
      this.$store.dispatch("closeOpenEditCanteen");
    },
    getImage() {
      this.canteenService.getImage(this.editingCanteen.id).then(res => {
        // console.log(res)
        this.imageUrl = res
      })

    },
    uploadFile(item) {
      console.log("uploading")
      console.log(item.file)
      console.log(this.editingCanteen.id)
      // 开始上传文件 新建一个formData
      const formData = new FormData();
      // 通过append向form对象添加数据
      formData.append("image", item.file);
      // console.log(formData)
      this.canteenService.uploadImage(this.editingCanteen.id, formData).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.getImage()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 移除上传图片列表
    clearFlies() {
      this.$refs.uploadForm.clearFiles();
    },
    // 上传文件之前
    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension1 = fileSuffix === "png";
      const extension2 = fileSuffix === "jpg";
      const extension3 = fileSuffix === "jpeg";
      const isLt2M = file.size / 1024 / 1024 < 0.5;

      if (!extension1 && !extension2 && !extension3) {
        this.$message.error("上传文件只能是 png、jpg、jpeg格式", "error");
        return false;
      }

      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB", "error");
        return false;
      }
    },
  },
  computed: {
    isAddCanteen() {
      return this.$store.state.isAddCanteen
    },
    editingCanteen() {
      return this.$store.getters.editingCanteen
    },
    // isEditCanteenOpen() {
    //   return this.$store.getters.isEditCanteenOpen
    // },
  },

}
</script>
<style scoped>
.avatar-uploader {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.button {
  margin-top: 16px;
  width: 130px;
}

.input {
  width: 400px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader {
  border-color: var(--el-color-primary);
}

.el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>