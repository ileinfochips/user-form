export const _delete = (state, id) => {
    console.log(id)
    state.filter(user => {
        return user.id != id
    })
}

export default _delete;