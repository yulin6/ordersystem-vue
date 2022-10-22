<template>
  <el-card style="cursor: pointer" shadow="hover" :body-style="{ padding: '0px' }" v-on:click="enterCanteen">
    <img v-if="imageUrl"
        :src="imageUrl"
         class="image"/>
    <div style="padding: 14px">
      <span style="font-weight: bold;">{{ canteen.name }}</span>
      <div class="bottom">
        <span v-for="(canteenType, index) in canteen.canteenTypes" :key="index" class="category">
          {{canteenType.type}}
        </span>
        <el-row class="ratingDisplay">
          <el-col :span="3">
            <el-icon size="large">
              <StarFilled/>
            </el-icon>
          </el-col>
          <el-col :span="15" style="margin-top: 4px">
            <span class="ratingPoint">{{ ratingPoint }}</span>
            <span class="ratingNum"> {{ orderNums }} </span>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script>
import router from "@/router";
import CanteenService from "@/services/CanteenService";

export default {
  name: 'CanteenCard',
  props: ['canteen'],
  components: {},
  data() {
    return {
      canteenService: CanteenService.getInstance(),
      imageUrl: require('../assets/foodiesRestaurant.png')
    }
  },
  created() {
    this.getImage()
  },
  methods: {
    enterCanteen() {
      // console.log(this.name)
      if (this.isOwner) {
        router.push({name: 'manage-canteen', params: {id: this.canteen.id}})
      } else {
        router.push({name: 'canteen', params: {id: this.canteen.id}, state: {canteenName: this.canteen.name}})
      }
    },
    getImage() {
      this.canteenService.getImage(this.canteen.id).then(res => {
        this.imageUrl = res
      })
    },
  },
  computed: {
    isOwner() {
      return this.$store.state.isOwner
    },
    ratingPoint() {
      if (this.canteen.star === 0.0) return 'No Rating'
      else return this.canteen.star
    },
    orderNums() {
      if (this.canteen.orderNums === 0) return ''
      else return '(' + this.canteen.orderNums + ')'
    },
    isEditCanteenOpen() {
      return this.$store.getters.isEditCanteenOpen
    },
  },
  watch: {
    isEditCanteenOpen: function () {
      this.getImage()
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
  width: 100%
}

.ratingPoint {
  font-weight: bold;
}

.ratingNum {
  margin-left: 2px;
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

/*.image {*/
/*  width: 100%;*/
/*  display: block;*/
/*}*/

.image {
  width: 100%;
  height: 200px;
  display: block;
}
</style>