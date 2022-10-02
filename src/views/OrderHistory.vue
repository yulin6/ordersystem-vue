<template>
  <el-container>
    <el-header>
      <home-menu :isOwner="isOwner"></home-menu>
    </el-header>
    <el-main>
      <cart></cart>
      <el-timeline>
        <el-timeline-item
            v-for="(order, index) in orders"
            :key="index"
            :timestamp="order.create_time"
            placement="top">
          <el-card>
            <h4>{{ order.canteen_id }}</h4>
            <el-table :data="order.orderItems" show-summary>
              <el-table-column label="Dish Name" property="dish_id"  width="200" />
              <el-table-column label="Quantity" property="number"  width="150" />
              <el-table-column label="Price" property="fee"  width="150" />
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


export default {
  components: { HomeMenu, Cart },
  data() {
    return {
      isOwner: false,
      orders: [
        {
          create_time: "2022-09-21 10:03:43",
          canteen_id: 3,
          user_id: 7,
          total_fee: 16.16,
          id: 4,
          order_time: "2015-11-05 14:29:36",
          orderItems: [
            {
              number: 10,
              dish_id: 7,
              id: 1,
              order_id: 4,
              fee: 20.2
            },
            {
              number: 3,
              dish_id: 8,
              id: 2,
              order_id: 4,
              fee: 60.0
            }
          ],
          status: 0
        }

      ]
    }
  },
  methods: {

  }

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