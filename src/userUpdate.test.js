import reducers from './reducers';

test('reducers update user', () => {
    let state;
    state = reducers(
        {
            users:[
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
            payload:
            {
                id:'0',
                user:{
                    firstName:'test2',
                    lastName:'test2',
                    email:'test2@test.com',
                    phone:'1234567890'
                },
                    action:'UPDATE_USER'
                }
            }
    );

    expect(state).toEqual(
        {
            users:[
                {
                    id:0,
                    firstName:'test2',
                    lastName:'test2',
                    email:'test2@test.com',
                    phone:'1234567890'
                }
            ]
        }
    );
});
