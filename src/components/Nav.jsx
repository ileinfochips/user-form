import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = React.memo(() => {
    console.log('Nav render again')
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/users" className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
})

export { Nav }