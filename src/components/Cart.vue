<template>
  <el-dialog title="Cart" v-model="isCartOpen" @close="action">
    <h3>{{ canteen }}</h3>
    <el-table :data="cart">
      <el-table-column label="Dish Name" property="name" width="200"/>
      <el-table-column label="Price ($)" property="price" width="200"/>
      <el-table-column>
        <template v-slot:default="scope">
          <el-input-number v-model="scope.row.selected" :min="1" :max="scope.row.stock"
                           @change="changeDishNum(scope.row)"></el-input-number>
          <el-button v-on:click="removeDish(scope.row.id)" type="warning" style="margin-left: 50px">
            <el-icon class="el-icon--left">
              <Delete/>
            </el-icon>
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-left: 12px">
      <h4>{{ totalPrice() }}</h4>
      <h4 v-if="!isCartEmpty">
        Dinning Time:
        <el-date-picker
            v-model="dinningTime"
            type="datetime"
            placeholder="Select"
            format="YYYY/MM/DD hh:mm:ss"
            value-format="YYYY-MM-DD h:m:s a"
            style="margin-left: 15px"
        />
      </h4>
      <el-button
          v-if="!isCartEmpty && dinningTime"
          v-on:click="placeOrder"
          type="primary"
          :loading="loading">
        <el-icon class="el-icon--left">
          <DishDot/>
        </el-icon>
        Place Order
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['refreshDishes'])
const action = () => emit('refreshDishes');
const dinningTime = ref('')
defineExpose({
  dinningTime
})
</script>

<script>

// import {mapGetters} from "vuex";
import OrderService from "@/services/OrderService";
import Utils from "@/utils/utils";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Cart',
  data() {
    return {
      orderService: OrderService.getInstance(),
      totalFee: 0,
      isCartEmpty: true,
      loading: false
    }
  },
  created() {
    this.syncStoreAndLocalCart()

  },
  // mounted() {
  //   this.$store.dispatch('setCartOpenStatus', false)
  // },
  methods: {
    syncStoreAndLocalCart() {
      this.$store.dispatch('setCart', JSON.parse(localStorage.getItem('cart')))
      this.$store.dispatch('setCartCanteen', localStorage.getItem('cartCanteen'))
    },
    changeDishNum(row) {
      this.setCartItems(row)
      this.setCartCanteenName()
    },
    getLocalCart() {
      return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    },
    setCartCanteenName() {
      let localCart = this.getLocalCart()
      let name = this.canteen
      if (localCart.length === 0) name = ''
      localStorage.setItem('cartCanteen', name)
      this.$store.dispatch('setCartCanteen', name)
    },
    setCartItems(row) {
      let localCart = this.getLocalCart()
      localCart.forEach(item => {
        if (item.id === row.id) {
          item.selected = row.selected
        }
      })
      localStorage.setItem('cart', JSON.stringify(localCart))
      this.$store.dispatch('setCart', localCart)
    },
    removeDish(id) {
      let localCart = this.getLocalCart()
      localCart = localCart.filter(item => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(localCart))
      this.$store.dispatch('setCart', localCart)
      this.setCartCanteenName()
    },
    totalPrice() {
      let localCart = this.getLocalCart()
      let sum = 0
      localCart.forEach(item => sum += item.price * item.selected)
      if (sum === 0) {
        this.totalFee = 0
        this.isCartEmpty = true
        return ''
      } else {
        this.totalFee = sum
        this.isCartEmpty = false
        return `Total Price: $${sum}`
      }
    },
    async placeOrder() {
      let orderDetail = this.formattedOrderDetail()
      this.loading = true
      await this.orderService.placeOrder(orderDetail).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success('Order placed!')
          this.$store.dispatch('setCartOpenStatus', false)
          localStorage.setItem('cartCanteen', '')
          localStorage.setItem('cart', JSON.stringify([]))
          this.syncStoreAndLocalCart()
          this.dishes = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      this.loading = false
    },
    formattedOrderDetail() {
      let localCart = this.getLocalCart()
      console.log(this.dinningTime)
      let orderDetail = {
        orderTime: this.dinningTime.slice(0, -3),
        totalFee: this.totalFee,
        canteenID: localCart[0].canteen_id,
        userID: JSON.parse(localStorage.getItem('user')).id,
        orderItems: [],
        status: 0
      }
      localCart.forEach(item => {
        let orderItem = {
          name: item.name,
          number: item.selected,
          fee: item.price,
          dish_id: item.id
        }
        orderDetail.orderItems.push(orderItem)
      })
      return orderDetail
    }
  },
  computed: {
    // ...mapGetters(['cart'])
    isCartOpen: {
      get() {
        console.log("get")
        console.log(this.$store.state.isCartOpen)
        return this.$store.state.isCartOpen
      },
      async set(value) {
        console.log("set")
        console.log(value)
        await this.$store.commit('setCartOpenStatus', value)
      },
    },
    canteen: {
      get() {
        return this.$store.getters.cartCanteen
      },
      set(value) {
        return this.$store.dispatch('setCartCanteen', value)
      }
    },
    cart: {
      get() {
        return this.$store.getters.cart
      },
      set(value) {
        return this.$store.dispatch('setCart', value)
      }
    }
  },

}
</script>

<style>
.datePicker {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>