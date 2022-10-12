// import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'



const store = new Vuex.Store({

    state: {
        apiURL: '/api',
        isCartOpen: false,
        isProfileOpen: false,
        isOrderOpen: false,
        isEditCanteenOpen: false,
        isAddCanteen: false,
        isOwner: false,
        user: null,
        isLogin: false,
        cartCanteen: '',
        cart: [],
        token: ''
    },
    getters,
    mutations,
    actions
})

export default store