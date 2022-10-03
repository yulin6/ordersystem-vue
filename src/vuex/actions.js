export const setUser = ({commit}, user) => {
    commit("setUser", user)
}

export const setToken = ({commit}, token) => {
    commit("setToken", token)
}

export const setCart = ({commit}, cart) => {
    commit("setCart", cart)
}

export const setCartCanteen = ({commit}, cartCanteen) => {
    commit("setCartCanteen", cartCanteen)
}

export const openCloseCart = ({commit}) => {
    commit("openCloseCart")
}

export const openCloseOrder = ({commit}) => {
    commit("openCloseOrder")
}

export const openCloseEditCanteen = ({commit}) => {
    commit("openCloseEditCanteen")
}

export const closeOpenEditCanteen = ({commit}) => {
    commit("openCloseEditCanteen")
}