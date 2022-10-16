<template>
  <el-dialog v-model="this.$store.state.isAddDishOpen">
    <h3>AddDish</h3>
    <el-col>
      <el-form :model="dishInfo"
               :rules="rules"
               ref="form"
               @submit.prevent="addDish">
        <el-form-item prop="name">
          <p>Dish Name:</p>
          <el-input style="margin-left: 10px" v-model="dishInfo.name" placeholder="Dish Name" clearable class="input">
          </el-input>
        </el-form-item>
        <el-form-item prop="type_id">
          <p>Dish Type:</p>
          <el-select style="margin-left: 10px" v-model="dishInfo.type_id" clearable class="input">
            <el-option v-for="type in dishTypes" :key="type.id" :label="type.type" :value="type.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="price">
          <p>Dish Price:</p>
          <el-input-number style="margin-left: 10px" v-model="dishInfo.price" :min="0" :max="100" default="0">
          </el-input-number>
        </el-form-item>
        <el-form-item prop="stock">
          <p>Quantity in Stock:</p>
          <el-input-number style="margin-left: 10px" v-model="dishInfo.stock" :min="0" :max="100" default="0">
          </el-input-number>
        </el-form-item>
      </el-form>
    </el-col>
    <el-button type="primary" class="button" native-type="submit" v-on:click="addDish">Confirm</el-button>
    <el-button plain class="button" v-on:click="closeDialog">Cancel</el-button>
  </el-dialog>
</template>

<script>
import DishService from "@/services/DishService";
import Utils from "@/utils/utils";

export default {
  data() {
    return {
      id: this.$route.params.id,
      dishService: DishService.getInstance(),
      dishes: [],
      dishInfo: {
        name: '',
        price: 0,
        type_id: 0,
        stock: 0,
        canteenID: this.$route.params.id
      },
      dishTypes: [],
      rules: {
        name: [
          {
            required: true,
            message: "Dish name is required",
            trigger: "blur"
          }
        ]
      }
    }
  },
  created() {
    Utils.storeUserFromLocal()
    this.getDishTypes();
  },
  methods: {
    closeDialog() {
      this.dishInfo = []
      this.$store.dispatch("closeOpenAddDish");
    },
    async getDishTypes() {
      await this.dishService.getDishTypes(this.id).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.dishTypes = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    async addDish() {
      let valid = await this.$refs.form.validate()
      if (!valid) return

      await this.dishService.addDish(this.dishInfo).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success('New Dish Added')
          this.$emit('refreshData')
          this.closeDialog()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
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