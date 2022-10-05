<template>
  <el-dialog v-model="this.$store.state.isEditCanteenOpen">
    <p v-show="!isAddCanteen">EditCanteen</p>
    <p v-show="isAddCanteen">AddCanteen</p>
    <el-col>
      <p>Restaurant Name:</p>
      <el-input v-model="input" placeholder="text" clearable class="input"></el-input>
      <p>Restaurant Type:</p>
      <el-select v-model="value" clearable placeholder="Select one type" class="input">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
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
  computed: {
    isAddCanteen() {
      return this.$store.state.isAddCanteen
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