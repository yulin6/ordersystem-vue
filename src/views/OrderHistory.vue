<template>
  <el-container>
    <el-header>
      <home-menu></home-menu>
    </el-header>
    <el-skeleton :rows="15" style="width: 1000px; margin: 80px" :loading="loading" animated>
      <template #default>
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
                <h3>{{ order.canteen.name }}</h3>
                <el-table :data="order.orderItems">
                  <el-table-column label="Dish Name" property="name"/>
                  <el-table-column label="Quantity" property="number"/>
                  <el-table-column label="Price ($)" property="fee"/>
                </el-table>
                <div style="margin-left: 12px">
                  <h4>Total Price: ${{ order.total_fee }}</h4>
                  <h4>Dinning Time: {{ order.order_time }}</h4>
                  <h4>Status:
                    <el-tag v-if="order.status === 0" size="large" type="warning">To be seated</el-tag>
                    <el-tag v-if="order.status === 1" size="large" type="success">Completed</el-tag>
                    <el-tag v-if="order.status === -1" size="large" type="info">Canceled</el-tag>
                    <el-button v-if="order.status === 0"
                               v-on:click="cancelOrder(order.id)"
                               type="danger"
                               style="margin-left: 10px" link>
                      Cancel
                    </el-button>
                  </h4>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-main>
      </template>
    </el-skeleton>
  </el-container>


</template>

<script>
import HomeMenu from "@/components/HomeMenu";
import Cart from "@/components/Cart";
import OrderService from "@/services/OrderService";
import Utils from "@/utils/utils";

export default {
  components: {HomeMenu, Cart},
  created() {
    Utils.storeUserFromLocal()
    this.getOrderHistory()
  },
  data() {
    return {
      loading: true,
      orderService: OrderService.getInstance(),
      orderHistory: [],
    }
  },
  methods: {
    async getOrderHistory() {
      await new Promise(r => setTimeout(r, 200)); //TODO DELETE, just for demonstration
      await this.orderService.getOrdersByUserId(this.$store.state.user.id).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.orderHistory = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      this.loading = false
    },
    cancelOrder(id) {
      this.$confirm('Canceling the order, are you sure?', 'Order Cancellation', {
        confirmButtonText: 'Yes, Cancel',
        cancelButtonText: 'Maybe Later',
        type: 'warning'
      }).then(() => {
        let status = {orderID: id, status: -1}
        this.orderService.updateOrderStatus(status).then(res => {
          if (res.code === 401) {
            this.$message.error('Invalid login credential')
            this.$router.push('/signin')
            Utils.removeLocalData()
          } else if (res.code === 200) {
            this.$message({
              type: 'success',
              message: "Order Canceled"
            })
            this.getOrderHistory()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    }
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