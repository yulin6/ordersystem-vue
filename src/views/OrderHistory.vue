<template>
  <el-container>
    <el-header>
      <home-menu></home-menu>
      <cart></cart>
    </el-header>
    <el-main>
      <h3 style="margin-left: 38px" v-show="!isOwner">Order History</h3>
      <h3 style="margin-left: 38px" v-show="isOwner">Customer Order</h3>
      <cart></cart>
      <el-timeline>
        <el-timeline-item
            v-for="(order, index) in orderHistory"
            :key="index"
            :timestamp="order.create_time"
            placement="top">
          <el-card>
            <h4>{{ order.canteen.name }}</h4>
            <el-table :data="order.orderItems" >
                <el-table-column label="Dish Name" property="name" />
              <el-table-column label="Quantity" property="number"  />
              <el-table-column label="Price" property="fee"   />
            </el-table>
            <p>Order Time: {{ order.order_time }}</p>
            <p>Status: {{ order.status }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-main>
  </el-container>


</template>

<script>
import HomeMenu from "@/components/HomeMenu";
import Cart from "@/components/Cart";
import OrderService from "@/services/OrderService";
import removeLocalData from "@/utils/utils";

export default {
  components: { HomeMenu, Cart },
  created() {
    this.$store.dispatch('setUser', JSON.parse(localStorage.getItem('user')))
    this.$store.dispatch('setUserType', JSON.parse(localStorage.getItem('userType')))

    this.orderService.getOrdersByUserId(this.$store.state.user.id).then(res => {
      if(res.code === 401) {
        this.$message.error('Invalid login credential')
        this.$router.push('/signin')
        removeLocalData()
      } else if(res.code === 200)  {
        this.orderHistory = res.data
        console.log(this.orderHistory)
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  data() {
    return {
      orderService: OrderService.getInstance(),
      orderHistory: [],
    }
  },
  methods: {
  },
  computed: {
    isOwner() {
      return this.$store.state.isOwner
    }
  },
}
</script>

<style scoped>

.el-header {
  position: relative;
  width: 100%;
  height: 60px;
}



.el-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 110px;
  bottom: 0;
  overflow-y: scroll;
}
</style>