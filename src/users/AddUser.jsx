import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';

import { userService } from '../reducers';
import { useDispatch } from 'react-redux';
import { userActions } from '../reducers';

const AddUser = (props) =>  {
  const dispatch = useDispatch();
  const {id} = props.match;

  const isAddMode = !id;
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
    const payload = {
      action: 'ADD_USER',
      user: data
    }
    dispatch(userActions(payload))
  }

  useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      userService.getById(id).then((user) => {
        const fields = ['firstName', 'lastName', 'email', 'phone'];
        fields.forEach((field) => setValue(field, user[field]));
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <h1>Add User</h1>
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
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save
        </button>
        <Link to={'/users'} className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}

export { AddUser };
