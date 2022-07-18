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
