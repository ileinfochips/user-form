export const deleteUser = (state, id) => {
    return state.filter(user => user.id != id)
}

export default deleteUser;