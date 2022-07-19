import React from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>user-form App with Redux & Formik</h1>
            <button className="btn btn-primary" onClick={() => navigate(`/users`)}>
                Manage Users
            </button>
        </div>
    );
}

export { Home };