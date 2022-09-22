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