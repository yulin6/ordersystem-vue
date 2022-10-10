import store from "@/vuex/store";

const removeData = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userToken")
    localStorage.removeItem("cart")
    localStorage.removeItem("cartCanteen")
    localStorage.removeItem("userType")
    store.dispatch("setToken", null)
    // console.log(this.user.userName)
}

export default removeData;