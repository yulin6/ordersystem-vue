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

export const setEditingCanteen = ({commit}, editingCanteen) => {
    commit("setEditingCanteen", editingCanteen)
}

export const openCloseProfile = ({commit}) => {
    commit("openCloseProfile")
}

export const setCartOpenStatus = ({commit}, isOpenOrClose) => {
    commit("setCartOpenStatus", isOpenOrClose)
}

export const openCloseOrder = ({commit}) => {
    commit("openCloseOrder")
}

export const openCloseEditCanteen = ({commit}, canteenID) => {
    commit("openCloseEditCanteen", canteenID)
}

export const closeOpenEditCanteen = ({commit}) => {
    commit("closeOpenEditCanteen")
}

export const openCloseAddDish = ({commit}, canteenID) => {
    commit("openCloseAddDish", canteenID)
}

export const closeOpenAddDish = ({commit}) => {
    commit("closeOpenAddDish")
}