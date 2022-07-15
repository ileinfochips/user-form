import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { List } from './List';
import { AddUser } from './AddUser';
import { EditUser } from './EditUser';
import { Delete } from './DeleteUser';

const Users = (match) => {
  return (
    <div className="container pt-4 pb-4">
      <Routes>
        <Route index element={<List />} />
        <Route path='add' element={<AddUser match={match}/>} />
        <Route path='edit/:id' element={<EditUser match={match}/>} />
        <Route path='delete/:id' element={<Delete match={match}/>} />
      </Routes>
    </div>

  );
}

export { Users };
