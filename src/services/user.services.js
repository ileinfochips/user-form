// const baseUrl = '/users';
let id = 1;
let usersList = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phone: '1234567890',
  },
];

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return new Promise((resolve, reject) => resolve(usersList));
  // return fetchWrapper.get(baseUrl);
}

function getById(id) {
  let user = usersList.filter((user) => user.id === id)[0];
  console.log(user);
  return new Promise((resolve, reject) => resolve(user));
  // return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  let newUser = { ...params, id: ++id };
  usersList.push(newUser);
  return new Promise((resolve, reject) => resolve(usersList));
  // return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  let user = usersList.find((user) => user.id === id);
  let updatedUser = { ...user, ...params };
  // Remove user with id
  let users = usersList.filter((user) => user.id !== id);
  usersList = [...users, updatedUser];
  return new Promise((resolve, reject) => resolve(usersList));

  // return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  // let users = usersList.filter((user) => user.id !== id);
  return new Promise((resolve, reject) => resolve(usersList));

  // return fetchWrapper.delete(`${baseUrl}/${id}`);
}
