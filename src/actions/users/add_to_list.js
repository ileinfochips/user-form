export const createUser = (state, user) => {
    user.id = state[state.length - 1] ? state[state.length - 1].id + 1 : 0;
    return [...state, user]
}

export default createUser;