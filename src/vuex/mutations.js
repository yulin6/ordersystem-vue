export const setUser = (state, user) => {
    if (user) {
        state.user = user
        state.isLogin = true
    } else if (user == null) {
        state.user = null
        state.isLogin = false
    }
}

export const setToken = (state,token) =>{
    if (token!=null){
        state.token = token
    } else {
        state.token = ''
    }
}

export const setUserType = (state,isOwner) =>{
    state.isOwner = isOwner
}

export const setCartOpenStatus = function(state, isOpenOrClose){
    state.isCartOpen = isOpenOrClose
}

export const openCloseOrder = (state) =>{
    state.isOrderOpen = !state.isOrderOpen
}

export const openCloseProfile = (state) =>{
    state.isProfileOpen = !state.isProfileOpen
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