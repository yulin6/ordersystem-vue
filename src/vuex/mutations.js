export const userStatus = (state, user) => {
    if (user) {
        state.userName = JSON.parse(user).userName;
        state.roleName = JSON.parse(user).roleName;
        state.isLogin = true
    } else if (user == null) {
        sessionStorage.setItem("userName", null)
        sessionStorage.setItem("userToken", '')
        state.userName = null
        state.isLogin = false
        state.token = ''
    }
}

//更改token
export const setToken = (state,token) =>{
    if (token!=null){
        state.token = token;
    }else {
        state.token = '';
    }
}