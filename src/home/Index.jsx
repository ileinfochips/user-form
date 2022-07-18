import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>React - CRUD Example with Redux & Formik</h1>
            <p><Link to="users">&gt;&gt; Manage Users</Link></p>
        </div>
    );
}

export { Home };