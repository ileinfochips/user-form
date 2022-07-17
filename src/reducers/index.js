import { userSliceReducer as users } from './user.reducer';
import { combineReducers } from 'redux';

export * from './alert.reducer';
export * from './user.reducer';


const rootReducer = combineReducers({
    users: users.reducer
});

export default rootReducer;