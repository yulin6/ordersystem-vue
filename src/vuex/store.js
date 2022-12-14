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
        isAddDishOpen: false,
        isOwner: false,
        user: null,
        isLogin: false,
        cartCanteen: '',
        cart: [],
        editingCanteen: {},
        addingDishTypeId: null,
        token: '',
        canteenID: null
    },
    getters,
    mutations,
    actions
})

export default store