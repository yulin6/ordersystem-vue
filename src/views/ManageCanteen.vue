<template>

  <el-container>
    <el-header>
      <home-menu></home-menu>
    </el-header>
    <el-container>
      <el-aside style="width: 200px;">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item v-for="(dish, index) in dishes" :index="dish.type" :key="index"
            v-on:click="jumpToCategory(dish.type)">
            <input style="width: 100px" type="text" v-model="type" v-show="isCatEditor" />
            <span v-show="!isCatEditor">{{ dish.type }}</span>
            <el-button style="margin-left: 6px" type="danger" @click="deleteRow(index, Object.keys(dishes))"
              v-show="isCatEditor" size="small"> delete
            </el-button>
          </el-menu-item>
        </el-menu>
        <el-button style="margin-top: 10px" @click="editCategory" v-show="!isCatEditor">edit category
        </el-button>
        <input style="width: 100px; margin-left: 6px; margin-top: 10px" type="text" v-model="type"
          v-show="isCatEditor" />
        <el-button style="margin-top: 10px; margin-left: 6px" @click="addCategory" v-show="isCatEditor" size="small">add
        </el-button>
        <el-button style="margin-top: 10px" type="warning" @click="saveCategory" v-show="isCatEditor">save
        </el-button>
      </el-aside>

      <el-main>
        <div v-for="(dish, index) in dishes" :key="index" class="dishGroup">
          {{ dish.type }}
          <el-table :data="dish.dishes" style="width: 100%; margin-top: 6px;">
            <el-table-column label="Dish Name" width="260">
              <template v-slot:default="scope">
                <input type="text" v-model="scope.row.name" v-show="scope.row.isEditor" />
                <span v-show="!scope.row.isEditor">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Dish Price ($)" width="160">
              <template v-slot:default="scope">
                <el-input-number v-model="scope.row.price" :min="0" :max="100" v-show="scope.row.isEditor">
                </el-input-number>
                <span v-show="!scope.row.isEditor">{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Quantity in Stock" width="160">
              <template v-slot:default="scope">
                <el-input-number v-model="scope.row.stock" :min="0" :max="10" v-show="scope.row.isEditor">
                </el-input-number>
                <span v-show="!scope.row.isEditor">{{scope.row.stock}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Availability" width="160">
              <template v-slot:default="scope">
                <!-- TODO: fix availability display issue -->
                <!-- {{scope.row.availability}} -->
                <el-checkbox style="margin-left: 26px" v-show="scope.row.isEditor" v-model="scope.row.availability"
                  :checked="scope.row.isChecked" disabled>
                </el-checkbox>
                <el-checkbox style="margin-left: 26px" v-show="!scope.row.isEditor" v-model="scope.row.availability"
                  :checked="scope.row.isChecked" enabled>
                </el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="Operation" width="200">
              <template v-slot:default="scope">
                <el-button @click="edit(scope.row)" size="small">edit</el-button>
                <el-button type="warning" @click="updateDish(scope.row)" size="small">save</el-button>
                <el-button type="danger" @click="deleteDish(scope.row.id)" size="small"> delete
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button style="margin-top: 6px" type="primary" @click="addDish()" size="small">Add a new dish!
          </el-button>
          <add-dish v-on:refreshData="refreshData"></add-dish>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import HomeMenu from "@/components/HomeMenu";
import DishService from "@/services/DishService";
import Utils from "@/utils/utils";
import AddDish from "@/components/AddDish";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ManageCanteen',
  components: { HomeMenu, AddDish },
  data() {
    return {
      id: this.$route.params.id,
      canteenName: history.state.canteenName,
      dishes: [],
      dishService: DishService.getInstance(),
      isCatEditor: false,
      isChecked: false,
      type_id: null,
      type: ''
    }
  },
  created() {
    Utils.storeUserFromLocal()
    this.getDishes()
  },
  methods: {
    refreshData: function () {
      this.getDishes()
    },
    async getDishes() {
      await this.dishService.getDishes(this.id).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.dishes = res.data
          console.log(res.data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    jumpToCategory(id) {
      document.getElementById(id).scrollIntoView();
    },
    edit(row) {
      row.isEditor = true;
    },
    async updateDish(dish) {
      let dishDetail = this.formattedDishDetail(dish)
      await this.dishService.updateDish(dishDetail, dish.id).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success(res.msg)
          this.getDishes()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    formattedDishDetail(dish) {
      let dishDetail = {
        name: dish.name,
        price: dish.price,
        description: dish.description,
        type_id: dish.type_id,
        stock: dish.stock,
        availability: dish.availability
      }
      // console.log("***1", dishDetail.availability)
      return dishDetail
    },
    async deleteDish(dishId) {
      // delete one dish
      await this.dishService.deleteDish(dishId).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success(res.msg)
          this.getDishes()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addDish() {
      this.$store.dispatch("openCloseAddDish", this.id);
    },
    async updateDishType() {
      await this.dishService.updateDishType(this.type, this.type_id).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success(res.msg)
          this.getDishes()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    editCategory() {
      this.isCatEditor = true;
    },
    saveCategory() {
      if (this.type != '' && this.type_id != null) {
        this.updateDishType()
      }
      this.isCatEditor = false;
    },
    async addDishType() {
      let typeDetail = this.formattedTypeDetail()
      await this.dishService.addDishType(typeDetail).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success(res.msg)
          this.getDishes()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    formattedTypeDetail() {
      let typeDetail = {
        type: this.type,
        canteenID: this.$route.params.id
      }
      return typeDetail
    },
    addCategory() {
      if (this.type != '') {
        this.addDishType()
      }
    }
  }

}
</script>

<style scoped>
.el-header {
  position: relative;
  width: 100%;
  height: 60px;
}

.el-aside {
  display: block;
  position: absolute;
  left: 30px;
  top: 120px;
  bottom: 0;
}

.el-main {
  position: absolute;
  left: 220px;
  right: 0;
  top: 110px;
  bottom: 0;
  overflow-y: scroll;
}

.dishGroup {
  margin-bottom: 20px;
}
</style>