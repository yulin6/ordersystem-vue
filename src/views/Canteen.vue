<template>

  <el-container>
    <el-header>
      <home-menu></home-menu>
      <cart></cart>
    </el-header>
    <el-container>
      <el-aside style="width: 200px;">
        <el-menu
            default-active="1"
            class="categoryMenu">
          <el-menu-item
              v-for="(dishType, index) in Object.keys(dishes)"
              :index="dishType"
              :key="index"
              v-on:click="jumpToCategory(dishType)">
            <span>{{ dishType }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <div v-for="(value, name, index) in dishes"
             :key="index"
             :id="name"
             class="dishGroup">
          {{ name }}
          <el-table :data="value" style="width: 100%">
            <el-table-column prop="name" width="200"/>
            <el-table-column prop="price" width="120"/>
            <el-table-column>
              <template v-slot:default="scope">
                <el-input-number v-model="scope.row.selected" :min="0" :max="10" @change="changeDishNum"></el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>

    </el-container>
  </el-container>

</template>

<script>
import HomeMenu from "@/components/HomeMenu";
import Cart from "@/components/Cart";
import DishService from "@/services/DishService";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Canteen',
  components: {HomeMenu, Cart},
  data() {
    return {
      category: ['Rice', 'Noodle', 'Dessert', 'Drink'],
      id: this.$route.params.id,
      dishes: [],

      dishService: DishService.getInstance(),
      dishList: [{
        id: 1,
        name: 'Chicken Sandwich',
        price: '$12',
        selected: 0
      },
        {
          id: 2,
          name: 'Cheese Burger',
          price: '$12',
          selected: 0
        }],

    }
  },
  created() {
    this.$store.dispatch('setUser', JSON.parse(localStorage.getItem('user')))
    this.$store.dispatch('setUserType', JSON.parse(localStorage.getItem('userType')))

    // console.log(this.id)
    this.dishService.getDishes(this.id).then(res => {
      if(res.code === 401) {
        this.$message.error('Invalid login credential')
        this.$router.push('/signin')
      } else {
        // console.log(res.data)
        this.dishes = res.data
        // for(dish in this.dishes) {

        // }
        // this.dishes.forEach(dish => this.$set(dish, 'selected', 0))
        // console.log(this.dishes)
      }
    })

    // console.log(this.dishes)
    // this.dishes.forEach(dish => this.$set(dish, 'selected', 0))

  },
  methods: {
    jumpToCategory(id) {
      document.getElementById(id).scrollIntoView();
    },
    changeDishNum(){
      //TODO ask to clear cart when selecting a new canteen

      localStorage.setItem('cartCanteen', 'Test Canteen')
      this.$store.dispatch('setCartCanteen', 'Test Canteen')
      let cart = this.dishList.filter(d => d.selected > 0)
      localStorage.setItem('cart', JSON.stringify(cart))
      this.$store.dispatch('setCart', cart)
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