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