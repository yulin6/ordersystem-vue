// import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'



const store = new Vuex.Store({

    state: {
        apiURL: 'https://43.134.172.49:30443/Foodies',
        isCartOpen: false,
        userName: null,
        roleName: null,
        isLogin: false,
        token: ''
    },
    getters,
    mutations,
    actions
})

export default store