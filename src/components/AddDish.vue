<template>
  <el-dialog v-model="this.$store.state.isAddDishOpen">
    <h3>AddDish</h3>
    <el-col>
      <el-form :model="dishInfo" :rules="rules" ref="form" @submit.prevent="login">
        <el-form-item prop="name">
          <p>Dish Name:</p>
          <el-input style="margin-left: 10px" v-model="name" placeholder="text" clearable class="input"></el-input>
        </el-form-item>
        <el-form-item prop="type_id">
          <p>Dish Type:</p>
          <el-select style="margin-left: 10px" clearable placeholder="select one type" class="input">
            <!-- TODO: The value should be type_id rather than index. -->
            <el-option v-for="(type, index) in Object.keys(dishes)" :key="index" :label="type" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="price">
          <p>Dish Price:</p>
          <el-input-number style="margin-left: 10px" v-model="price" :min="0" :max="100" default="0">
          </el-input-number>
        </el-form-item>
        <el-form-item prop="stock">
          <p>Quantity in stock:</p>
          <el-input-number style="margin-left: 10px" v-model="stock" :min="0" :max="100" default="0">
          </el-input-number>
        </el-form-item>
        <el-form-item prop="description">
          <p>Dish Description:</p>
          <el-input style="margin-left: 10px" v-model="description" placeholder="text" clearable class="input">
          </el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-button type="primary" class="button" v-on:click="addDish">Confirm</el-button>
    <el-button plain class="button" v-on:click="closeDialog">Cancel</el-button>
  </el-dialog>
</template>

<script>
import DishService from "@/services/DishService";
import Utils from "@/utils/utils";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  data() {
    return {
      id: this.$store.state.canteenID,
      dishService: DishService.getInstance(),
      dishes: [],
      dishInfo: {
        name: '',
        price: null,
        type_id: 0,
        description: '',
        stock: 0
      },
      options: [],
      rules: {
        name: [
          {
            required: true,
            message: "Dish name is required",
            trigger: "blur"
          }
        ],
        description: [
          { required: true, message: "Dish description is required", trigger: "blur" },
        ]
      }
    }
  },
  created() {
    Utils.storeUserFromLocal()
    this.getDishTypes();
  },
  methods: {
    confirmed() {
      this.$message({
        message: 'A new dish has created successfully!',
        type: 'success'
      });
      this.$store.dispatch("closeOpenAddDish");
    },
    closeDialog() {
      this.$store.dispatch("closeOpenAddDish");
    },
    async getDishTypes() {
      await this.dishService.getDishes(this.id).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.dishes = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    async addDish() {
      let dishDetail = this.formattedDishDetail()
      await this.dishService.addDish(dishDetail).then(res => {
        if (res.code === 1) {
          this.$message.success(res.msg);
          this.confirmed()
        } else {
          this.$message.error(res.msg);
          this.closeDialog()
        }
      })
    },
    formattedDishDetail() {
      let dishDetail = {
        name: this.name,
        price: this.price,
        description: this.description,
        stock: this.stock,
        type_id: this.dishType,
        canteenID: this.$route.params.id
      }
      return dishDetail
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