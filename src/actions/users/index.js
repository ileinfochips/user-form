import { createUser} from './add_to_list';
import { deleteUser} from './delete_from_list';
import { updateUser } from './update_from_list';

export const userReducer = {
    createUser,
    updateUser,
    deleteUser,
}