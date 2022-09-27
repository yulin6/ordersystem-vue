<template>
  <el-dialog title="Order">
    <el-table :data="gridData">
      <el-table-column property="name"  width="150" />
      <el-table-column property="price"  width="200" />
      <el-table-column >
        <template v-slot:default="scope">
          <el-input-number v-model="scope.row.selected" :min="0" :max="10" ></el-input-number>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Order',
  data() {
    return {
      gridData: [
        {
          name: 'Chicken Sandwich',
          price: '$12',
          selected: 1
        },
        {
          name: 'Beef Burger',
          price: '$14',
          selected: 1
        },
      ],
    }
  }

}
</script>

<style>

</style>