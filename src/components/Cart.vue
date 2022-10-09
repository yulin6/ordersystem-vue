<template>
  <el-dialog title="Cart" v-model="this.$store.state.isCartOpen" @close="action">
    <h4>{{ canteen }}</h4>
    <el-table :data="cart">
      <el-table-column property="name"  width="150" />
      <el-table-column property="price"  width="200" />
      <el-table-column >
        <template v-slot:default="scope">
          <el-input-number v-model="scope.row.selected" :min="0" :max="10" @change="changeDishNum(scope.row)"></el-input-number>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup>
const emit = defineEmits(['refreshDishes'])
const action = () => emit('refreshDishes');
</script>

<script >

// import {mapGetters} from "vuex";

export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Cart',
  data() {
    return {
      //canteenName: localStorage.getItem('canteen'),
      // cartDishes: ,//JSON.parse(localStorage.getItem('cart')),
    }
  },
  created() {
    this.$store.dispatch('setCart', JSON.parse(localStorage.getItem('cart')))
    this.$store.dispatch('setCartCanteen', localStorage.getItem('cartCanteen'))
  },
  methods: {
    // refreshDishes() {
    //   console.log('closed in child')
    //   this.$emit('refreshDishes')
    // },
    changeDishNum(row){
      console.log(row)
      this.setCartItems(row)
      this.setCartCanteenName()
    },
    setCartCanteenName() {
      let localCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
      let name = this.canteen
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
      // console.log(localCart)
    }
  },
  computed: {
    // ...mapGetters(['cart'])
    canteen: {
      get() { return this.$store.getters.cartCanteen },
      set(value) { return this.$store.dispatch('setCartCanteen', value) }
    },
    cart:{
      get() { return this.$store.getters.cart },
      set(value) { return this.$store.dispatch('setCart', value) }
    }
  },

}
</script>

<style>

</style>