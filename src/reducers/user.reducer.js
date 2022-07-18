import { createSlice } from '@reduxjs/toolkit';
import { userReducer } from '../actions/users'

let id = 1;
let usersList = [
  {
    id: 0,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phone: '1234567890',
  },
];

export const userService = {
  update,
};

function getAll() {
  return new Promise((resolve, reject) => resolve(usersList));
}

function getById(id) {
  let user = usersList.filter((user) => user.id == id)[0];
  console.log(user);
  return new Promise((resolve, reject) => resolve(user));
}

function update(id, params) {
  let user = usersList.find((user) => user.id == id);
  let updatedUser = { ...user, ...params };
  // Remove user with id
  let users = usersList.filter((user) => user.id != id);
  usersList = [...users, updatedUser];
  return new Promise((resolve, reject) => resolve(usersList));
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  // let users = usersList.filter((user) => user.id !== id);
  return new Promise((resolve, reject) => resolve(usersList));
}

export const userSliceReducer = createSlice({
	name: 'users',
	initialState: usersList,
	reducers: {
		userActions: (state, { payload: {action, user, id} }) => {
			switch( action ){
				case 'ADD_USER':
					return userReducer.createUser(state, user);
				case 'UPDATE_USER':
					return userReducer.updateUser(state, id, user);
				case 'DELETE_USER':
					return userReducer.deleteUser(state, id);
				default:
					return state
			}
		}
	}
});

export const { userActions } = userSliceReducer.actions
