export const setUser = ({commit}, user) => {
    commit("setUser", user)
}

export const setToken = ({commit}, token) => {
    commit("setToken", token)
}

export const setCart = ({commit}, cart) => {
    commit("setCart", cart)
}

export const setUserType = ({commit}, isOwner) => {
    commit("setUserType", isOwner)
}

export const setCartCanteen = ({commit}, cartCanteen) => {
    commit("setCartCanteen", cartCanteen)
}

export const openCloseProfile = ({commit}) => {
    commit("openCloseProfile")
}

export const openCloseCart = ({commit}) => {
    commit("openCloseCart")
}

export const openCloseOrder = ({commit}) => {
    commit("openCloseOrder")
}

export const openCloseEditCanteen = ({commit}, isAddCanteen) => {
    commit("openCloseEditCanteen", isAddCanteen)
}

export const closeOpenEditCanteen = ({commit}) => {
    commit("closeOpenEditCanteen")
}

export const openCloseAddDish = ({commit}) => {
    commit("openCloseAddDish")
}

export const closeOpenAddDish = ({commit}) => {
    commit("openCloseAddDish")
}