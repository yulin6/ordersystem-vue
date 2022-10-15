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
          <div style="margin: 38px">

            <h3 v-show="!isOwner">Order History</h3>
            <h3 v-show="isOwner">Customer Orders</h3>
            <el-select v-show="isOwner" v-model="selectedCanteenId" v-on:change="getCanteenOrders" placeholder="Select Canteen">
              <el-option
                  v-for="canteen in canteens"
                  :key="canteen.id"
                  :label="canteen.name"
                  :value="canteen.id"/>
            </el-select>
          </div>

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
                  <h4>Customer Name: {{ order.user_id }} TODO update to customer name</h4>
                  <h4>Status:
                    <el-tag v-if="order.status === 0" size="large" type="warning">To be seated</el-tag>
                    <el-tag v-if="order.status === 1" size="large" type="success">Completed</el-tag>
                    <el-tag v-if="order.status === -1" size="large" type="info">Canceled</el-tag>
                    <el-button v-if="order.status === 0 && !isOwner"
                               v-on:click="updateOrderStatus(order.id, -1)"
                               type="danger"
                               style="margin-left: 10px" link>
                      Cancel
                    </el-button>
                  </h4>
                  <h4 v-if="order.status !== 1 && isOwner">Actions:
                    <el-button v-if="order.status === 0"
                               v-on:click="updateOrderStatus(order.id, -1)"
                               type="danger"
                               style="margin-left: 10px">
                      Cancel
                    </el-button>
                    <el-button v-if="order.status === 0"
                               v-on:click="updateOrderStatus(order.id, 1)"
                               type="success"
                               style="margin-left: 10px">
                      Complete
                    </el-button>
                    <el-button v-if="order.status === -1"
                               v-on:click="updateOrderStatus(order.id, 0)"
                               type="success"
                               style="margin-left: 10px">
                      Reactive
                    </el-button>
                  </h4>
                  <h4 v-if="!order.rated && order.status === 1 && !isOwner">
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
                    <h4>Customer Review: </h4>
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
import CanteenService from "@/services/CanteenService";
import Utils from "@/utils/utils";

export default {
  components: {HomeMenu, Cart},
  data() {
    return {
      loading: true,
      canteenService: CanteenService.getInstance(),
      orderService: OrderService.getInstance(),
      commentService: CommentService.getInstance(),
      orderHistory: [],
      canteens: [],
      selectedCanteenId: ''
    }
  },
  created() {
    Utils.storeUserFromLocal()
    this.getOrderHistory()
    if (this.isOwner) this.getCanteens()
  },
  methods: {
    async getCanteens() {
      this.loading = true
      await this.canteenService.getCanteensByUserId(this.user.id).then(res => {
        if (res.code === 401) {
          this.$message.error('Login credential expired')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.canteens = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      this.loading = false
    },
    async getCanteenOrders() {
      this.loading = true
      await this.orderService.getOrdersByCanteenId(this.selectedCanteenId).then(res => {
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
      let rating = {
        orderID: order.id,
        canteenID: order.canteen.id,
        userID: order.user_id,
        star: order.stars,
        comment: order.comment
      }

      this.commentService.rateOrder(rating).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          this.$message.success('Thank you for your rating!')
          order.rated = true
        } else {
          this.$message.error(res.msg)
        }
      })

    },
    updateOrderStatus(id, orderStatus) {
      this.$confirm('Updating the order status, are you sure?', 'Order Status Update', {
        confirmButtonText: 'Yes, Update',
        cancelButtonText: 'Maybe Later',
        type: 'warning'
      }).then(() => {
        let status = {orderID: id, status: orderStatus}
        this.orderService.updateOrderStatus(status).then(res => {
          if (res.code === 401) {
            this.$message.error('Invalid login credential')
            this.$router.push('/signin')
            Utils.removeLocalData()
          } else if (res.code === 200) {
            this.$message({
              type: 'success',
              message: "Order Status Updated"
            })
            if(this.isOwner) this.getCanteenOrders()
            else this.getOrderHistory()
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
    },
    user() {
      return this.$store.state.user
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