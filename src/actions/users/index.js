import { create as createUser} from './add_to_list';
import {_delete as deleteUser} from './delete_from_list';
import { update as updateUser } from './update_from_list';

export const userReducer = {
    createUser,
    updateUser,
    deleteUser
}