<template>

  <el-card style="cursor: pointer" shadow="hover" :body-style="{ padding: '0px' }" align="middle" v-on:click="enterCanteen" class="box-card">
    <div class="mid">
      <el-icon color="#3F9EFF" size="large" border-radius="20px">
        <Plus />
      </el-icon>
      <p  style="margin-left: 0;color: #3F9EFF;font-weight: bold">Add a new restaurant!</p>
    </div>
  </el-card>

</template>

<script>
import router from "@/router";

export default {
  name: 'AddCanteenCard',
  components: {},
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
.mid {
  margin-top: 50%;
  height: 50%;
}

.box-card {
  width: 164px;
  height: 282px;
  background-color: #ECF5FF;
}
</style>