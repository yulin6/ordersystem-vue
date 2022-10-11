<template>
  <el-dialog v-model="this.$store.state.isAddDishOpen">
    <h3>AddDish</h3>
    <el-col>
      <p>Dish Name:</p>
      <el-input v-model="input" placeholder="text" clearable class="input"></el-input>
      <p>Dish Type:</p>
      <el-select v-model="value" clearable placeholder="select one type" class="input">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <p>Dish Price:</p>
      <el-input-number :min="0" :max="100">
      </el-input-number>
      <p>Quantity in stock</p>
      <el-input-number :min="0" :max="100">
      </el-input-number>
      <p>Dish Description:</p>
      <el-input v-model="input" placeholder="text" clearable class="input"></el-input>
    </el-col>
    <el-button type="primary" class="button" v-on:click="confirmed">Confirm</el-button>
    <el-button plain class="button" v-on:click="cancel">Cancel</el-button>
  </el-dialog>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'AddDish',
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
  methods: {
    confirmed() {
      this.$message({
        message: 'A new dish has created successfully!',
        type: 'success'
      });
      this.$store.dispatch("closeOpenAddDish");
    },
    cancel() {
      this.$store.dispatch("closeOpenAddDish");
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