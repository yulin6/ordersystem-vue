<template>
  <el-container>
    <el-header>
      <home-menu></home-menu>
      <cart></cart>
      <profile></profile>
    </el-header>
    <el-skeleton :rows="15" style="width: 1000px; margin: 80px" :loading="loading" animated>
      <template #default>
        <el-main>
          <h3 style="margin-left: 38px" v-show="!isOwner">Order History</h3>
          <h3 style="margin-left: 38px" v-show="isOwner">Customer Order</h3>

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
                  <h4 v-if="!order.rated && order.status === 1">
                    Rate your experience:
                    <div>
                      <el-rate v-model="order.stars" :colors="colors"/>
                      <el-input
                          v-model="order.comment"
                          maxlength="1000"
                          placeholder="Leave comment"
                          show-word-limit
                          type="textarea"/>
                      <el-button v-on:click="rateOrder(order)" type="primary" style="margin-top: 15px">
                        Rate
                      </el-button>
                    </div>
                  </h4>
                  <div v-if="order.rated">
                        <el-rate v-model="order.stars" :colors="colors" size="large" style="margin-top: 5px" disabled/>
                        <p style="font-style: italic;">"{{ order.comment }}"</p>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-main>
      </template>
    </el-skeleton>
  </el-container>


</template>

<script setup>
import {ref} from 'vue'
import Profile from "@/components/Profile";
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
</script>

<script>
import HomeMenu from "@/components/HomeMenu";
import Cart from "@/components/Cart";
import OrderService from "@/services/OrderService";
import CommentService from "@/services/CommentService";
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
      commentService: CommentService.getInstance(),
      orderHistory: [],
    }
  },
  methods: {
    async getOrderHistory() {
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
      if(this.orderHistory.length === 0) this.loading = false
      this.orderHistory.forEach(order => {
        this.getOrderRatings(order)
      })

    },
    async getOrderRatings(order) {
      await new Promise(r => setTimeout(r, 100));//TODO DELETE, just for demonstration
      await this.commentService.getRatingByOrderId(order.id).then(res => {
            if (res.code === 401) {
              this.$message.error('Invalid login credential')
              this.$router.push('/signin')
              Utils.removeLocalData()
            } else if (res.code === 200) {
              if(res.data.length === 1){
                order.rated = true
                order.stars = res.data[0].star
                order.comment = res.data[0].comment
              } else if(res.data.length === 0) {
                order.rated = false
              } else {
                this.$message.error('Internal Error: more than one comment found under on order')
              }
            } else {
              this.$message.error(res.msg)
            }
          }
      )
      this.loading = false
    },
    rateOrder(order) {
      console.log(order)
      let rating = {
        orderID: order.id,
        canteenID: order.canteen.id,
        userID: order.user_id,
        star: order.stars,
        comment: order.comment
      }
      order.rated = true
      console.log(rating)
      //TODO integrate api
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
    },
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