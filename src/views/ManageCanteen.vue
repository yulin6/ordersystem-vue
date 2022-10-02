<template>

  <el-container>
    <el-header>
      <home-menu :isOwner="isOwner"></home-menu>
    </el-header>
    <el-container>
      <el-aside style="width: 200px;">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item v-for="(cat, index) in category" :index="cat" :key="index" v-on:click="jumpToCategory(cat)">
            <span>{{ cat }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <div v-for="cat in category" :key="cat" :id="cat" class="dishGroup">
          {{ cat }}
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="Dish Name" width="200">
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
                <el-input-number v-model="scope.row.quantity" :min="0" :max="10" v-show="scope.row.isEditor">
                </el-input-number>
                <span v-show="!scope.row.isEditor">{{scope.row.quantity}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Operation" width="260">
              <template v-slot:default="scope">
                <el-button @click="edit(scope.row)">edit</el-button>
                <el-button type="warning" @click="save(scope.row)">save</el-button>
                <el-button type="danger" @click="deleteRow(scope.$index, tableData)"> delete
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button style="margin-top: 6px" type="primary" @click="addRow(tableData, false)">Add a new dish!
          </el-button>
        </div>
      </el-main>
    </el-container>
  </el-container>·

</template>

<script>
import HomeMenu from "@/components/HomeMenu";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ManageCanteen',
  components: { HomeMenu },
  props: ['id'],
  data() {
    return {
      category: ['Rice', 'Noodle', 'Dessert', 'Drink'],
      tableData: [{
        name: 'Chicken Sandwich',
        price: 12,
        quantity: 0,
        isEditor: false
      },
      {
        name: 'Cheese Burger',
        price: 12,
        quantity: 0,
        isEditor: false
      }],
      isOwner: true
    }
  },
  created() {
    // console.log(this.props.test)
    for (let i = 0; i < 10; ++i) {
      this.tableData.push({
        name: 'Chicken Sandwich',
        price: 12,
        quantity: 0,
        isEditor: false
      })
    }
  },
  methods: {
    jumpToCategory(id) {
      document.getElementById(id).scrollIntoView();
    },
    edit(row) {
      row.isEditor = true;
    },
    save(row) {
      row.isEditor = false;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addRow(tableData, isEditor) {
      tableData.push({
        name: 'A new dish added. Please edit it!', price: 0, quantity: 0, isEditor: isEditor
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