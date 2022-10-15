<template>
  <el-dialog v-model="this.$store.state.isEditCanteenOpen">
    <h3 v-show="!isAddCanteen">EditCanteen</h3>
    <h3 v-show="isAddCanteen">AddCanteen</h3>
    <el-form :model="canteenInfo" :rules="rules" ref="form" @submit.prevent="login">
      <el-form-item prop="name">
        <p>Restaurant Name:</p>
        <el-input style="margin-left: 10px" v-model="input" v-show="isAddCanteen" placeholder="text" clearable
          class="input"></el-input>
        <el-input style="margin-left: 10px" v-model="input" v-show="!isAddCanteen" placeholder="text" clearable
          class="input"></el-input>
      </el-form-item>
      <el-form-item prop="canteenTypes">
        <p>Restaurant Type:</p>
        <el-select v-show="isAddCanteen" style="margin-left: 10px" v-model="canteenTypes" multiple clearable
          class="input">
          <el-option v-for="option in options" :key="option.id" :label="option.type" :value="option.id">
          </el-option>
        </el-select>
        <el-select v-show="!isAddCanteen" style="margin-left: 10px" v-model="canteenTypes" multiple clearable
          class="input">
          <el-option v-for="option in options" :key="option.id" :label="option.type" :value="option.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="description">
        <p>Restaurant Description:</p>
        <el-input style="margin-left: 10px" v-model="description" placeholder="text" clearable class="input">
        </el-input>
      </el-form-item>
    </el-form>
    <el-upload class="upload-demo" action="https://upload.qiniup.com" :data="postPicData" :before-remove="beforeRemove"
      :before-upload="beforeUpload" :on-success="handleSuccess" :on-exceed="handleExceed" :on-error="handleError"
      :file-list="picfileList" :limit="1" list-type="picture" accept=".png, .jpg, .jpeg">
      <el-button style="margin-top: 18px;">upload cover image</el-button>
      <template #tip>
        <div class="el-upload__tip">Only one picture can be uploaded as the cover image.</div>
        <div class="el-upload__tip">The format should be jpg/jpeg/png and the size should not exceed 10MB.</div>
      </template>
    </el-upload>
    <el-button type="primary" class="button" v-on:click="confirmed">Confirm</el-button>
    <el-button plain class="button" v-on:click="cancel">Cancel</el-button>
  </el-dialog>
</template>

<script>
import CanteenService from "@/services/CanteenService";
import Utils from "@/utils/utils";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'EditCanteen',
  data() {
    return {
      canteenService: CanteenService.getInstance(),
      picfileList: [],
      options: [],
      canteenInfo: {
        name: '',
        description: '',
        userID: this.$store.state.user.id,
        canteenTypes: [],
      },
    }
  },
  updated() {
    this.loadFormData()
  },
  computed: {
    isAddCanteen() {
      return this.$store.state.isAddCanteen
    }
  },
  props: {
    diaFormData: {
      type: Object,
      default: () => ({
        gcover: null
      })
    }
  },
  created() {
    this.getAllCanteenTypes()
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
      this.loading = false
    },
    confirmed() {
      this.$message({
        message: 'A new restaurant has created successfully!',
        type: 'success'
      });
      this.$store.dispatch("closeOpenEditCanteen");
    },
    cancel() {
      this.$store.dispatch("closeOpenEditCanteen");
    },
    loadFormData() {
      let imgurl = {}
      imgurl.url = this.diaFormData.gcover
      if (this.diaFormData.gcover != null) {
        this.picfileList.push(imgurl)
      }
    },
    dialogclose() {
      this.picfileList = []
    }
  }
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