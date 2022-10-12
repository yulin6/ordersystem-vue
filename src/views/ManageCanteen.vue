<template>

  <el-container>
    <el-header>
      <home-menu></home-menu>
    </el-header>
    <el-container>
      <el-aside style="width: 200px;">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item v-for="(dishType, index) in Object.keys(dishes)" :index="dishType" :key="index"
            v-on:click="jumpToCategory(dishType)">
            <input style="width: 100px" type="text" v-show="isCatEditor" />
            <span v-show="!isCatEditor">{{ dishType }}</span>
            <el-button style="margin-left: 6px" type="danger" @click="deleteRow(index, Object.keys(dishes))"
              v-show="isCatEditor" size="small"> delete
            </el-button>
          </el-menu-item>
        </el-menu>
        <el-button style="margin-top: 10px" @click="editCategory()" v-show="!isCatEditor">edit category
        </el-button>
        <el-button style="margin-top: 10px" @click="addCategory(category)" v-show="isCatEditor">add category
        </el-button>
        <el-button style="margin-top: 10px" type="warning" @click="saveCategory(category)" v-show="isCatEditor">save
        </el-button>
      </el-aside>

      <el-main>
        <div v-for="(value, name, index) in dishes" :key="index" :id="name" class="dishGroup">
          {{ name }}
          <el-table :data="value" style="width: 100%; margin-top: 6px;">
            <el-table-column label="Dish Name" width="260">
              <template v-slot:default="scope">
                <input type="text" v-model="scope.row.name" v-show="scope.row.isEditor" />
                <span v-show="!scope.row.isEditor">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Dish Price ($)" width="200">
              <template v-slot:default="scope">
                <el-input-number v-model="scope.row.price" :min="0" :max="100" v-show="scope.row.isEditor">
                </el-input-number>
                <span v-show="!scope.row.isEditor">{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Quantity in Stock" width="200">
              <template v-slot:default="scope">
                <el-input-number v-model="scope.row.stock" :min="0" :max="10" v-show="scope.row.isEditor">
                </el-input-number>
                <span v-show="!scope.row.isEditor">{{scope.row.stock}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Operation" width="300">
              <template v-slot:default="scope">
                <el-button @click="edit(scope.row)" size="small">edit</el-button>
                <el-button type="warning" @click="updateDish(scope.row, index)" size="small">save</el-button>
                <el-button type="danger" @click="deleteDish(scope.$index, value, index)" size="small"> delete
                </el-button>
                <el-checkbox style="margin-left: 10px" v-model="scope.row.availability" :checked="scope.row.availability">available
                </el-checkbox>
              </template>
            </el-table-column>
          </el-table>
          <el-button style="margin-top: 6px" type="primary" @click="addDish()">Add a new dish!
          </el-button>
          <AddDish></AddDish>
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
    }
  },
  created() {
    Utils.storeUserFromLocal()
    this.getDishes()
  },
  methods: {
    async getDishes() {
      await new Promise(r => setTimeout(r, 200)); //TODO DELETE, just for demonstration
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
    jumpToCategory(id) {
      document.getElementById(id).scrollIntoView();
    },
    edit(row) {
      row.isEditor = true;
    },
    async updateDish(row, index) {
      let dishDetail = this.formattedDishDetail(index)
      await this.dishService.updateDish(dishDetail).then(res => {
        if (res.code === 1) {
          this.save(row);
          this.$message.success('Dish detail updated!')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    formattedDishDetail(index) {
      let dishDetail = {}
      dishDetail.name = this.dishes[index].name;
      dishDetail.price = this.dishes[index].price;
      dishDetail.stock = this.dishes[index].stock;
      dishDetail.type = this.dishes[index].dishType;
      return dishDetail
    },
    save(row) {
      row.isEditor = false;
    },
    async deleteDish(index, rows, dishIndex) {
      await this.dishService.deleteDish(dishIndex).then(res => {
        if (res.code === 1) {
          this.deleteRow(index, rows);
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addDish() {
      this.$store.dispatch("openCloseAddDish");
    },
    addRow(tableData) {
      tableData.push({
        name: 'A new dish added. Please edit it!', price: 0, quantity: 0, isEditor: false
      })
    },
    editCategory() {
      this.isCatEditor = true;
    },
    saveCategory() {
      this.isCatEditor = false;
    },
    addCategory(tableData) {
      tableData.push(
        'New category'
      )
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