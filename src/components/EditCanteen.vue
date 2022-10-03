<template>
  <el-dialog title="EditCanteen" v-model="this.$store.state.isEditCanteenOpen">
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
  props: {
    isAddCanteen: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    handleAddOrEdit() {
      if (this.isAddCanteen) {
        this.name = 'AddCanteen'
      } else {
        this.name = 'EditCanteen'
      }
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
  },
  beforeMount() {
    this.handleAddOrEdit()
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