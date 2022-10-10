import store from "@/vuex/store";

const removeLocalData = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userToken")
    localStorage.removeItem("cart")
    localStorage.removeItem("cartCanteen")
    localStorage.removeItem("userType")
    store.dispatch("setToken", null)
    // console.log(this.user.userName)
}

export default removeLocalData;