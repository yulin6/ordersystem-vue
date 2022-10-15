<template>

  <el-card style="cursor: pointer" shadow="hover" :body-style="{ padding: '0px' }" align="middle"
    v-on:click="addCanteen" class="box-card">
    <div class="mid">
      <el-icon color="#3F9EFF" size="large" border-radius="20px">
        <Plus />
      </el-icon>
      <p style="margin-left: 0;color: #3F9EFF;font-weight: bold">Add a new restaurant!</p>
      <EditCanteen></EditCanteen>
    </div>
  </el-card>

</template>

<script>
import EditCanteen from "@/components/EditCanteen";

export default {
  name: 'EditCanteenCard',
  components: { EditCanteen },
  methods: {
    addCanteen() {
      // -1: isAddCanteen is true
      this.$store.dispatch("openCloseEditCanteen", -1);
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