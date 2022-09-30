export const setUser = ({commit}, user) => {
    commit("setUser", user)
}

export const setToken = ({commit}, token) => {
    commit("setToken", token)
}

export const openCloseCart = ({commit}) => {
    commit("openCloseCart")
}

export const openCloseOrder = ({commit}) => {
    commit("openCloseOrder")
}

export const openCloseAddCanteen = ({commit}) => {
    commit("openCloseAddCanteen")
}

export const closeOpenAddCanteen = ({commit}) => {
    commit("openCloseAddCanteen")
}