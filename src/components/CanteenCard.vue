<template>

  <el-card style="cursor: pointer" shadow="hover" :body-style="{ padding: '0px' }" v-on:click="enterCanteen">
    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      class="image" />
    <div style="padding: 14px">
      <span style="font-weight: bold;">{{ name }}</span>
      <div class="bottom">
        <span class="category">{{ category }}</span>
        <el-row class="ratingDisplay">
          <el-col span="2">
            <el-icon size="large">
              <StarFilled />
            </el-icon>
          </el-col>
          <el-col span="2" style="margin-top: 4px">
            <span class="ratingPoint">{{ ratingPoint }}</span>
          </el-col>
          <el-col span="2" style="margin-top: 4px">
            <span class="ratingNum"> ({{ ratingNum }})</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>

</template>

<script>
import router from "@/router";

export default {
  name: 'CanteenCard',
  props: {
    isOwner: {
      type: Boolean,
      default: false
    },
  },
  components: {},
  data() {
    return {
      id: "testID",
      name: "Yummy hamburger",
      category: "Western",
      ratingPoint: 4.5,
      ratingNum: 14
    }
  },
  methods: {
    enterCanteen() {
      console.log(this.name)
      if (this.isOwner) {
        router.push({ name: 'manage-canteen', params: { id: this.id } })
      } else {
        router.push({ name: 'canteen', params: { id: this.id } })
      }
    }
  }

}
</script>

<style>
.category {
  margin-top: 8px;
  font-size: 14px;
  color: #999;
}

.ratingDisplay {
  margin-top: 8px;
  font-size: 14px;
}

.ratingPoint {
  font-weight: bold;
}

.ratingNum {
  margin-left: 4px;
}

.bottom {
  /*margin-top: 6px;*/
  line-height: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>