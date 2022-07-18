import reducers from './reducers';

test('reducers delete user', () => {
    let state;
    state = reducers(
        {
            users:
            [
                {
                    id:0,
                    firstName:'test',
                    lastName:'test',
                    email:'test@test.com',
                    phone:'1234567890'
                }
            ]
            }, 
            {
            type:'users/userActions',
            payload:{
                id: 0,
                action: 'DELETE_USER'
            }
        }
    );
  expect(state).toEqual({users:[]});
});