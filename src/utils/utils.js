import store from "@/vuex/store";


export default class Utils {
    static storeUserFromLocal() {
        store.dispatch('setUser', JSON.parse(localStorage.getItem('user')))
        store.dispatch('setUserType', JSON.parse(localStorage.getItem('userType')))
    }
    static removeLocalData() {
        localStorage.removeItem("user")
        localStorage.removeItem("userToken")
        localStorage.removeItem("cart")
        localStorage.removeItem("cartCanteen")
        localStorage.removeItem("userType")
        store.dispatch("setToken", null)
    }
}

