<template>

  <el-container>
    <el-header>
      <home-menu></home-menu>
      <cart @refreshDishes="refreshDishes"></cart>
      <profile></profile>
    </el-header>
    <el-skeleton :rows="15" style="width: 1000px; margin: 80px" :loading="loading" animated>
      <template #default>
        <el-empty v-if="dishes.length === 0" description="No Dishes Available" style="margin-top: 150px"/>
        <el-container v-if="dishes.length !== 0">
          <el-aside style="width: 200px;">
            <el-button
                @click="openRatings"
                style="margin: 5px">
              <el-icon class="el-icon--left"><ChatLineRound /></el-icon>
              Restaurant Ratings
            </el-button>
            <el-menu
                default-active="1"
                class="categoryMenu">
              <el-menu-item
                  v-for="(dish, index) in dishes"
                  :index="dish.type"
                  :key="index"
                  v-on:click="jumpToCategory(dish.type)">
                <span>{{ dish.type }}</span>
              </el-menu-item>
            </el-menu>

          </el-aside>

          <el-main>
            <el-dialog title="Ratings"  v-model="isRatingsOpen" @close="closeRatings">
              <el-empty v-if="ratings.length === 0" description="No Ratings" />
              <el-card  v-for="(rating, index) in ratings"
                        :key="index"
                        shadow="always"
                        style="margin-bottom: 20px">
                <el-rate v-model="rating.star" :colors="colors" size="large" style="margin-top: 5px" disabled/>
                <h4 style="font-style: italic;">"{{ rating.comment }}"</h4>
              </el-card>
            </el-dialog>
            <div v-for="(dish, index) in dishes"
                 :key="index"
                 :id="dish.type"
                 class="dishGroup">
              <h4>
                {{ dish.type }}
              </h4>
              <el-table :data="dish.dishes" style="width: 100%">
                <el-table-column label="Dish Name" prop="name" width="200"/>
                <el-table-column label="Dish Price ($)" prop="price" width="150"/>
                <el-table-column >
                  <template v-slot:default="scope">
                    <el-input-number v-model="scope.row.selected"
                                     :min="0"
                                     :max="scope.row.stock"
                                     @change="changeDishNum(scope.row)"
                                     :disabled="scope.row.availability === 0 || scope.row.stock === 0">
                    </el-input-number>
                    <span v-if="scope.row.availability === 0 || scope.row.stock === 0" style="margin-left: 20px">Out of Stock</span>
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

<script setup>
import {ref} from 'vue'

const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
</script>

<script>
import HomeMenu from "@/components/HomeMenu";
import Cart from "@/components/Cart";
import Profile from "@/components/Profile";
import DishService from "@/services/DishService";
import CommentService from "@/services/CommentService";
import Utils from "@/utils/utils";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Canteen',
  components: {HomeMenu, Cart, Profile},
  data() {
    return {
      loading: true,
      id: this.$route.params.id,
      canteenName: history.state.canteenName,
      dishes: [],
      ratings: [],
      dishService: DishService.getInstance(),
      commentService: CommentService.getInstance(),
      isRatingsOpen: false,
    }
  },
  created() {
    Utils.storeUserFromLocal()
    this.getDishes()
    this.getRatings()
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
          this.refreshDishes()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    async getRatings() {
      await this.commentService.getRatingByCanteenId(this.id).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.ratings = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      this.loading = false
    },
    openRatings() {
      this.isRatingsOpen = true
    },
    closeRatings() {
      this.isRatingsOpen = false
    },
    jumpToCategory(id) {
      document.getElementById(id).scrollIntoView();
    },
    getLocalCart() {
      return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    },
    refreshDishes() {
      let localCart = this.getLocalCart()
      let previousSelected = {}
      localCart.forEach(item => {
        if (item.selected !== 0) previousSelected[item.id] = item.selected
      })
      this.dishes.forEach(item => {
        item.dishes.forEach(dish => {
          if (dish.id in previousSelected) dish.selected = previousSelected[dish.id]
          else dish.selected = 0
        })
      })
    },
    changeDishNum(row) {
      let localCart = this.getLocalCart()
      if(localCart.length !== 0 && this.id != localCart[0].canteen_id){
        this.$confirm('Choosing a different restaurant will clear the current cart, are you sure?', {
          confirmButtonText: 'Yes, clear',
          cancelButtonText: 'Maybe Later',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: "Cart Updated"
          })
          localStorage.removeItem('cart')
          this.setCartItems(row)
          this.setCartCanteenName()
        }).catch(() => {
          this.refreshDishes()
        })
      } else {
        this.setCartItems(row)
        this.setCartCanteenName()
      }
    },
    setCartCanteenName() {
      let localCart = this.getLocalCart()
      let name = this.canteenName
      if (localCart.length === 0) name = ''
      localStorage.setItem('cartCanteen', name)
      this.$store.dispatch('setCartCanteen', name)
    },
    setCartItems(row) {
      let localCart = this.getLocalCart()
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
        if (!foundInCart) localCart.push(row)
        localStorage.setItem('cart', JSON.stringify(localCart))
      }
      this.$store.dispatch('setCart', localCart)
    }
  },
  computed: {
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