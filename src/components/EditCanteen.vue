<template>
  <el-dialog v-model="this.$store.state.isEditCanteenOpen">
    <h3 v-show="!isAddCanteen">EditCanteen</h3>
    <h3 v-show="isAddCanteen">AddCanteen</h3>
    <el-col>
      <p>Restaurant Name:</p>
      <el-input v-model="input" placeholder="text" clearable class="input"></el-input>
      <p>Restaurant Type:</p>
      <el-select v-model="value" clearable placeholder="select one type" class="input">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'EditCanteen',
  data() {
    return {
      picfileList: [],
      options: [{
        value: 'option1',
        label: 'Western'
      }, {
        value: 'option2',
        label: 'Chinese'
      }],
      value: ''
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
  methods: {
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