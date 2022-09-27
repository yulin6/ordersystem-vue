export const setUser = ({commit}, user) => {
    commit("setUser", user)
}

export const setToken = ({commit}, token) => {
    commit("setToken", token)
}

export const openCloseCart = ({commit}) => {
    commit("openCloseCart")
}