<template>
  <el-dialog title="Profile" v-model="this.$store.state.isProfileOpen">
    <h4>Username: </h4> {{ user.username }}
    <h4>Reward Points: </h4> {{ user.rewardPoints }}
    <h4>Member Tier:
    </h4>
    <span v-if="!user.isMember">
      <el-tag type="info" class="mx-1" size="large" effect="dark" round>
        Foodie
      </el-tag>
      <el-button v-on:click="joinQuitFoodiesClub(1)" type="primary"
                 style="margin-left: 15px" round>Join Foodies Club</el-button>
    </span>
    <span v-if="user.isMember">
      <el-tag  type="" class="mx-1" size="large" effect="dark" round>
        Foodie Pro
      </el-tag>
      <el-button v-on:click="joinQuitFoodiesClub(0)" type="info" size="small"
                 style="margin-left: 15px" link>Quit Subscription</el-button>
    </span>

  </el-dialog>
</template>

<script>
import Utils from "@/utils/utils";
import UserService from "@/services/UserService";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Profile',
  data() {
    return {
      userService: UserService.getInstance()
    }
  },
  created() {
    Utils.storeUserFromLocal()
  },
  methods: {
    joinQuitFoodiesClub(joinOrQuit) {
      let member = this.$store.getters.user
      let memberStatus = {user_id: member.id, availability: joinOrQuit}
      this.userService.joinOrQuitMember(memberStatus).then(res => {
        if (res.code === 401) {
          this.$message.error('Invalid login credential')
          this.$router.push('/signin')
          Utils.removeLocalData()
        } else if (res.code === 200) {
          member.isMember = joinOrQuit
          this.user = member
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.getters.user
      },
      set(value) {
        localStorage.setItem('user', JSON.stringify(value))
        return this.$store.dispatch('setUser', value)
      }
    }
  },

}
</script>

<style>

</style>