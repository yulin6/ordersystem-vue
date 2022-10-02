export const setUser = (state, user) => {
    if (user) {
        state.user = user
        // state.roleName = JSON.parse(user).roleName
        state.isLogin = true
    } else if (user == null) {
        localStorage.setItem("user", null)
        state.user = null
        state.isLogin = false
    }
}

export const setToken = (state,token) =>{
    if (token!=null){
        state.token = token
    }else {
        state.token = ''
        localStorage.setItem("userToken", '')
    }
}

export const openCloseCart = (state) =>{
    state.isCartOpen = !state.isCartOpen
}

export const openCloseOrder = (state) =>{
    state.isOrderOpen = !state.isOrderOpen
}

export const openCloseEditCanteen = (state) =>{
    state.isEditCanteenOpen = !state.isEditCanteenOpen
}

export const closeOpenEditCanteen = (state) =>{
    state.isEditCanteenOpen = !state.isEditCanteenOpen
}