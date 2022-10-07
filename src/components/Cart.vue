<template>
  <el-dialog title="Cart" v-model="this.$store.state.isCartOpen">
    <h4>{{ canteen }}</h4>
    <el-table :data="cart">
      <el-table-column property="name"  width="150" />
      <el-table-column property="price"  width="200" />
      <el-table-column >
        <template v-slot:default="scope">
          <el-input-number v-model="scope.row.selected" :min="0" :max="10" @change="changeDishNum"></el-input-number>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>

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
    changeDishNum() {
      //TODO remove dish when selected == 0, remove canteen when no dish selected
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