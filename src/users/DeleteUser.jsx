import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '../services';

function Delete({ history, match }) {
  const [users, setUsers] = useState(null);
  console.log('hola')

  const { id } = match.params;
  console.log(match)
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone is required'),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, setValue, errors, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
    });

  function onSubmit(data) {
    return updateUser(id, data);
  }

  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
    });
  }

  function updateUser(id, data) {
    return userService
      .update(id, data)
      .then(() => {
        alertService.success('User updated', { keepAfterRouteChange: true });
        history.push('..');
      })
      .catch(alertService.error);
  }

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
   
      // get user and set form fields
      userService.getById(id).then((user) => {
        const fields = ['firstName', 'lastName', 'email', 'phone'];
        fields.forEach((field) => setValue(field, user[field]));
      });
    
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <h1>Delete User</h1>
      <div className="form-row">
        <div className="form-group col-5">
          <label>First Name</label>
          <input
            name="firstName"
            type="text"
            ref={register}
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>
        <div className="form-group col-5">
          <label>Last Name</label>
          <input
            name="lastName"
            type="text"
            ref={register}
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.lastName?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-7">
          <label>Email</label>
          <input
            name="email"
            type="text"
            ref={register}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="form-group col">
          <label>Phone Number</label>
          <input
            name="phone"
            type="text"
            ref={register}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.phone?.message}</div>
        </div>
      </div>

      <div className="form-group">
        <button
          onClick={() => deleteUser(id)}
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Delete
        </button>
        <Link to={ '..'} className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}

export { Delete };