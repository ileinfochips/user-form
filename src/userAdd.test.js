import reducers from './reducers';

test('reducers', () => {
    let state;
    state = reducers(
        {
            users:[]
        },
        {
            type:'users/userActions',
            payload:{
                action:'ADD_USER',
                user:{
                    firstName:'test',
                    lastName:'test',
                    email:'test@test.com',
                    phone:'1234567890',
                    id:0
                }
            }
        }
    );
    expect(state).toEqual({users:[{firstName:'test',lastName:'test',email:'test@test.com',phone:'1234567890',id:0}]});
});
