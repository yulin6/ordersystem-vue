<template>

  <el-container>
    <el-header>
      <home-menu></home-menu>
    </el-header>
    <el-skeleton :rows="15" style="width: 1000px; margin: 80px" :loading="loading" animated>
      <template #default>
        <el-container>
          <el-aside style="width: 200px;">
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <el-menu-item v-for="(dish, index) in dishes" :index="dish.type" :key="index"
                            v-on:click="jumpToCategory(dish.type)">
            <span v-if="!isCatEditor">
              {{ dish.type }}
            </span>
                <el-input v-if="isCatEditor" v-model="dish.type" type="text" style="width: 100px"/>
                <el-button v-if="isCatEditor" @click="deleteDishType(dish.id)" type="danger" size="small"
                           style="margin-left: 6px">
                  delete
                </el-button>
              </el-menu-item>
              <el-button v-if="!isCatEditor" @click="editCategory" style="margin-top: 10px; ">
                Edit Category
              </el-button>
              <el-menu-item v-if="isCatEditor">
                <el-input v-model="type" type="text" style="width: 100px;"/>
                <el-button @click="addDishType" style="margin-left: 6px">
                  add
                </el-button>
              </el-menu-item>
              <el-button v-if="isCatEditor" @click="saveCategory" style="margin-top: 10px; margin-left: 20px"
                         type="warning">
                Save
              </el-button>
            </el-menu>
          </el-aside>

          <el-main>
            <el-empty v-if="dishes.length === 0" description="No dishes yet. Create a dish type on left panel" style="margin-top: 100px"/>
            <add-dish v-on:refreshData="getDishes"></add-dish>
            <div v-for="(dish, index) in dishes"
                 :key="index"
                 :id="dish.type"
                 class="dishGroup">
              <h4>
                {{ dish.type }}
                <el-button @click="addDish(dish.id)"
                           type="primary"
                           style="margin-left: 10px">
                  Add Dish
                </el-button>
              </h4>

              <el-table :data="dish.dishes" style="width: 100%; margin-top: 6px;">
                <el-table-column label="Dish Name" width="260">
                  <template v-slot:default="scope">
                    <el-input type="text" v-model="scope.row.name" v-if="scope.row.isEditor"/>
                    <span v-if="!scope.row.isEditor">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="Dish Price ($)" width="200">
                  <template v-slot:default="scope">
                    <el-input-number v-model="scope.row.price" :min="0" :max="9999" v-if="scope.row.isEditor">
                    </el-input-number>
                    <span v-if="!scope.row.isEditor">{{ scope.row.price }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="Quantity in Stock" width="200">
                  <template v-slot:default="scope">
                    <el-input-number v-model="scope.row.stock" :min="0" :max="9999" v-if="scope.row.isEditor">
                    </el-input-number>
                    <span v-if="!scope.row.isEditor">{{ scope.row.stock }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="Availability" width="200">
                  <template v-slot:default="scope">
                    <el-checkbox v-if="scope.row.isEditor"
                                 v-model="scope.row.availability"
                                 :label="scope.row.availability ? 'available' : 'unavailable'"
                                 size="large"
                                 enabled>
                    </el-checkbox>
                    <el-checkbox v-if="!scope.row.isEditor"
                                 v-model="scope.row.availability"
                                 :label="scope.row.availability ? 'available' : 'unavailable'"
                                 size="large"
                                 disabled>
                    </el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="Operations">
                  <template v-slot:default="scope">
                    <el-button v-if="scope.row.isEditor" @click="editDish(scope.row)" size="small">Cancel</el-button>
                    <el-button v-if="!scope.row.isEditor" @click="editDish(scope.row)" size="small">Edit</el-button>
                    <el-button v-if="scope.row.isEditor"
                               @click="updateDish(scope.row)"
                               type="warning"
                               size="small">save
                    </el-button>
                    <el-button type="danger" @click="deleteDish(scope.row.id)" size="small"> Delete
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-main>
        </el-container>
      </template>
    </el-skeleton>
  </el-container>

</template>

<script>
import HomeMenu from "@/components/HomeMenu";
import DishService from "@/services/DishService";
import Utils from "@/utils/utils";
import AddDish from "@/components/AddDish";

export default {
  name: 'ManageCanteen',
  components: {HomeMenu, AddDish},
  data() {
    return {
      loading: true,
      id: this.$route.params.id,
      canteenName: history.state.canteenName,
      dishes: [],
      dishService: DishService.getInstance(),
      isCatEditor: false,
      type_id: null,
      type: ''
    }
  },
  created() {
    Utils.storeUserFromLocal()
    this.getDishes()
  },
  methods: {
    async getDishes() {
      await this.dishService.getDishes(this.id).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.dishes = res.data
          this.convertAvailabilityToBoolean()
        } else {
          this.$message.error(res.msg)
        }
      })
      this.loading = false
    },
    convertAvailabilityToBoolean() {
      this.dishes.forEach(dishGroup => {
        dishGroup.dishes.forEach(dish => {
          if (dish.availability === 1) dish.availability = true
          else if (dish.availability === 0) dish.availability = false
        })
      })
    },
    jumpToCategory(id) {
      document.getElementById(id).scrollIntoView();
    },
    editDish(row) {
      row.isEditor = !row.isEditor;
    },
    async updateDish(dish) {
      let dishDetail = this.formattedDishDetail(dish)
      await this.dishService.updateDish(dishDetail, dish.id).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success('Dish Updated')
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
      return dishDetail
    },
    async deleteDish(dishID) {
      this.$confirm('Deleting the Dish, are you sure?', 'Delete Dish', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Maybe Later',
        type: 'error'
      }).then(async () => {
        await this.dishService.deleteDish(dishID).then(res => {
          if (res.code === 401) {
            this.$message.error('Invalid login credential')
            this.$router.push('/signin')
            Utils.removeLocalData()
          } else if (res.code === 200) {
            this.$message.success('Dish Deleted')
            this.getDishes()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    addDish(typeId) {
      this.$store.dispatch("openCloseAddDish", this.id);
      this.$store.dispatch("setAddingDishTypeId", typeId);
    },
    async updateDishType(typeName, typeId) {
      await this.dishService.updateDishType(typeName, typeId).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
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
      this.isCatEditor = false;
      this.dishes.forEach(dishGroup => { //TODO update if future back-end supports group update
        this.updateDishType(dishGroup.type, dishGroup.id)
      })
      this.$message.success('Dish Category Updated')
    },
    async addDishType() {
      if (this.type !== '') {
        let typeDetail = this.formattedTypeDetail()
        await this.dishService.addDishType(typeDetail).then(res => {
          if (res.code === 401) {
            this.$message.error('Invalid login credential')
            this.$router.push('/signin')
            Utils.removeLocalData()
          } else if (res.code === 200) {
            this.$message.success('Dish Category Added')
            this.getDishes()
            this.type = ''
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    formattedTypeDetail() {
      let typeDetail = {
        type: this.type,
        canteenID: this.$route.params.id
      }
      return typeDetail
    },
    async deleteDishType(typeID) {
      this.$confirm('Deleting the Dish Type, are you sure?', 'Delete Dish Type', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Maybe Later',
        type: 'error'
      }).then(async () => {
        await this.dishService.deleteDishType(typeID).then(res => {
          if (res.code === 401) {
            this.$message.error('Invalid login credential')
            this.$router.push('/signin')
            Utils.removeLocalData()
          } else if (res.code === 200) {
            this.$message.success('Dish Type Deleted')
            this.getDishes()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
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