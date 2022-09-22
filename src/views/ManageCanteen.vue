<template>

  <el-container>
    <el-header>
      <home-menu :isOwner="isOwner"></home-menu>
    </el-header>
    <el-container>
      <el-aside style="width: 200px;">
        <el-menu default-active="1" class="el-menu-vertical-demo" >
          <el-menu-item v-for="(cat, index) in category" :index="cat" :key="index">
            <span>{{ cat }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" width="200" />
          <el-table-column prop="price" width="120" />
          <el-table-column>
            <template v-slot:default="scope">
              <el-input-number v-model="scope.row.selected" :min="0" :max="10"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>

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
        price: '$12',
        selected: 0
      },
      {
        name: 'Cheese Burger',
        price: '$12',
        selected: 0
      }],
      isOwner: true
    }
  },
  created() {
    // console.log(this.props.test)
    for (let i = 0; i < 200; ++i) {
      this.tableData.push({
        name: 'Chicken Sandwich',
        price: '$12',
        selected: 0
      })
    }
  },
  methods: {}

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
</style>