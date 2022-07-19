import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PreventDeleteModal } from '../components/PopUp';
import { userActions } from '../reducers';

const List = () => {

  const dispatch = useDispatch()

  const userList = useSelector(({ users }) =>{
    return users
  })

  const [users, setUsers] = useState(userList);
  const [modalShow, setModalShow] = useState(false);
  const [deleteUser, setDeleteUser] = useState({
    user: {},
    isDeleting: false,
  });

  const handleDeleteUser = (id) => {
    if(deleteUser.isDeleting) {
      const payload = {
        id: deleteUser.user.id,
        action: 'DELETE_USER'
      }
      dispatch(userActions(payload));
      setUsers(users.filter(user => user.id != deleteUser.user.id));
      setDeleteUser({
        user: {},
        isDeleting: false,
      });
      setModalShow(false);
      return;
    }
    let user = { 
      user: users.filter(user => user.id == id)[0],
      isDeleting: true
    };
    setDeleteUser(user)
  }


  return (
    <div>
        <PreventDeleteModal
          show={modalShow}
          onHide={() => 
            {            
              setModalShow(false)
              setDeleteUser({
                user: {},
                isDeleting: false
              })
            }
          }
          user={deleteUser}
          handleDeleteUser={handleDeleteUser}
        />
      	<h1>Users</h1>
      	<Link to={`add`} className="btn btn-sm btn-success mb-2">
        	Add User
      	</Link>
      	<table className="table table-striped">
        	<thead>
				<tr>
					<th style={{ width: '30%' }}>Name</th>
					<th style={{ width: '30%' }}>Email</th>
					<th style={{ width: '30%' }}>Phone No</th>
					<th style={{ width: '10%' }}></th>
				</tr>
			</thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.title} {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Link
                    to={`edit/${user.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </Link>
                  <button type="button" class="btn btn-sm btn-danger" onClick={() => {
                    setModalShow(true);
                    handleDeleteUser(user.id);
                    }}>
                    {deleteUser.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!users && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {users && !users.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No Users To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { List };
