export const setUser = (state, user) => {
    if (user) {
        state.userName = user
        // state.roleName = JSON.parse(user).roleName
        state.isLogin = true
    } else if (user == null) {
        localStorage.setItem("userName", null)
        localStorage.setItem("userToken", '')
        state.userName = null
        state.isLogin = false
        state.token = ''
    }
}

export const setToken = (state,token) =>{
    if (token!=null){
        state.token = token
    }else {
        state.token = ''
    }
}

export const openCloseCart = (state) =>{
    state.isCartOpen = !state.isCartOpen
}

export const openCloseOrder = (state) =>{
    state.isOrderOpen = !state.isOrderOpen
}

export const openCloseAddCanteen = (state) =>{
    state.isAddCanteenOpen = !state.isAddCanteenOpen
}

export const closeOpenAddCanteen = (state) =>{
    state.isAddCanteenOpen = !state.isAddCanteenOpen
}