export const setUser = (state, user) => {
    if (user) {
        state.user = user
        state.isLogin = true
    } else if (user == null) {
        localStorage.removeItem("user")
        localStorage.removeItem("cart")
        localStorage.removeItem("cartCanteen")
        localStorage.removeItem("userType")
        state.user = null
        state.isLogin = false
    }
}

export const setToken = (state,token) =>{
    if (token!=null){
        state.token = token
    } else {
        state.token = ''
        localStorage.setItem("userToken", '')
    }
}

export const setUserType = (state,isOwner) =>{
    state.isOwner = isOwner
}

export const openCloseCart = (state) =>{
    state.isCartOpen = !state.isCartOpen
}

export const openCloseOrder = (state) =>{
    state.isOrderOpen = !state.isOrderOpen
}

export const openCloseEditCanteen = (state, isAddCanteen) =>{
    state.isEditCanteenOpen = !state.isEditCanteenOpen
    state.isAddCanteen = isAddCanteen
}

export const closeOpenEditCanteen = (state) => {
    state.isEditCanteenOpen = !state.isEditCanteenOpen
}

export const setCart = (state, cart) => {
    state.cart = cart
}

export const setCartCanteen = (state, cartCanteen) => {
    state.cartCanteen = cartCanteen
}