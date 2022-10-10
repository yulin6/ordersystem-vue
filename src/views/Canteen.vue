<template>

  <el-container>
    <el-header>
      <home-menu></home-menu>
      <cart @refreshDishes="refreshDishes"></cart>
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
                <el-input-number v-model="scope.row.selected" :min="0" :max="10" @change="changeDishNum(scope.row)"></el-input-number>
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
import removeData from "@/utils/utils";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Canteen',
  components: {HomeMenu, Cart},
  data() {
    return {
      id: this.$route.params.id,
      canteenName: history.state.canteenName,
      dishes: [],
      dishService: DishService.getInstance(),
    }
  },
  created() {
    this.$store.dispatch('setUser', JSON.parse(localStorage.getItem('user')))
    this.$store.dispatch('setUserType', JSON.parse(localStorage.getItem('userType')))

    this.dishService.getDishes(this.id).then(res => {
      if(res.code === 401) {
        this.$message.error('Invalid login credential')
        this.$router.push('/signin')
        removeData()
      } else if(res.code === 200)  {
        this.dishes = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    jumpToCategory(id) {
      document.getElementById(id).scrollIntoView();
    },
    refreshDishes() {
      let localCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
      let previousSelected = {}
      localCart.forEach(item => {
        if(item.selected !== 0) previousSelected[item.id] = item.selected
      })
      Object.entries(this.dishes).forEach(item => {
        item[1].forEach(dish => {
          if(dish.id in previousSelected) dish.selected = previousSelected[dish.id]
          else dish.selected = 0
        })
      })
    },
    changeDishNum(row){
      //TODO ask to clear cart when selecting a new canteen
      this.setCartItems(row)
      this.setCartCanteenName()
    },
    setCartCanteenName() {
      let localCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
      let name = this.canteenName
      if (localCart.length === 0) name = ''
      localStorage.setItem('cartCanteen', name)
      this.$store.dispatch('setCartCanteen', name)
    },
    setCartItems(row) {
      let localCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
      if (localCart.length === 0) {
        localCart.push(row)
        localStorage.setItem('cart', JSON.stringify(localCart))
      } else {
        let foundInCart = false
        let id = row.id
        localCart.forEach(item => {
          if (item.id === id) {
            item.selected = row.selected
            foundInCart = true
          }
        })
        localCart = localCart.filter(item => item.selected !== 0)
        if(!foundInCart) localCart.push(row)
        localStorage.setItem('cart', JSON.stringify(localCart))
      }
      this.$store.dispatch('setCart', localCart)
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