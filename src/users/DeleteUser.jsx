import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '../services';

function Delete({ history, match }) {
  const [users, setUsers] = useState(null);
  const { id } = useParams();
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
  const { register, handleSubmit, reset, setValue, formState } =
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
            {...register('firstName', {required: true})}
            type="text"
            className={`form-control ${formState.errors.firstName ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{formState.errors.firstName?.message}</div>
        </div>
        <div className="form-group col-5">
          <label>Last Name</label>
          <input
            {...register('lastName', {required: true})}
            type="text"
            className={`form-control ${formState.errors.lastName ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{formState.errors.lastName?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-7">
          <label>Email</label>
          <input
            {...register('email', {required: true})}
            type="text"
            className={`form-control ${formState.errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{formState.errors.email?.message}</div>
        </div>
        <div className="form-group col">
          <label>Phone Number</label>
          <input
            {...register('phone', {required: true})}
            type="text"
            className={`form-control ${formState.errors.phone ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{formState.errors.phone?.message}</div>
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