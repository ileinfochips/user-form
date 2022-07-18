
export const updateUser = (state, id, params) => {
    const user = state.find((user) => user.id == id);
    const updatedUser = { ...user, ...params };
    const users = state.filter((user) => user.id != id);
    return [...users, updatedUser];
}

export default updateUser;