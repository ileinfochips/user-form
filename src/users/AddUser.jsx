import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { userActions } from '../reducers';

const AddUser = (props) =>  {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone is required'),
  });
 

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
  //     <h1>Add User</h1>
  //     <div className="form-row">
  //       <div className="form-group col-5">
  //         <label>First Name</label>
  //         <input            
  //           {...register('firstName', {required: true})}
  //           type="text"
  //           className={`form-control ${formState.errors.firstName ? 'is-invalid' : ''}`}
  //         />
  //         <div className="invalid-feedback">{formState.errors.firstName?.message}</div>
  //       </div>
  //       <div className="form-group col-5">
  //         <label>Last Name</label>
  //         <input
  //           {...register('lastName', {required: true})}
  //           type="text"
  //           className={`form-control ${formState.errors.lastName ? 'is-invalid' : ''}`}
  //         />
  //         <div className="invalid-feedback">{formState.errors.lastName?.message}</div>
  //       </div>
  //     </div>
  //     <div className="form-row">
  //       <div className="form-group col-7">
  //         <label>Email</label>
  //         <input
  //           {...register('email', {required: true})}
  //           type="text"
  //           className={`form-control ${formState.errors.email ? 'is-invalid' : ''}`}
  //         />
  //         <div className="invalid-feedback">{formState.errors.email?.message}</div>
  //       </div>
  //       <div className="form-group col">
  //         <label>Phone Number</label>
  //         <input
  //           {...register('phone', {required: true})}
  //           type="text"
  //           className={`form-control ${formState.errors.phone ? 'is-invalid' : ''}`}
  //         />
  //         <div className="invalid-feedback">{formState.errors.phone?.message}</div>
  //       </div>
  //     </div>

  //     <div className="form-group">
  //       <button
  //         type="submit"
  //         disabled={formState.isSubmitting}
  //         className="btn btn-primary"
  //       >
  //         {formState.isSubmitting && (
  //           <span className="spinner-border spinner-border-sm mr-1"></span>
  //         )}
  //         Save
  //       </button>
  //       <Link to={'/users'} className="btn btn-link">
  //         Cancel
  //       </Link>
  //     </div>
  //   </form>
  // );


  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', phone: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        const payload = {
          action: 'ADD_USER',
          user: values
        }
        dispatch(userActions(payload));
        // Go back to users/
        navigate(-1);
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" type="text"  className="form-control" />
        <ErrorMessage name="firstName" />

        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" className="form-control" />
        <ErrorMessage name="lastName" />

        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" className="form-control" />
        <ErrorMessage name="email" />

        <label htmlFor="phone">Phone No</label>
        <Field name="phone" type="text" className="form-control" />
        <ErrorMessage name="phone" />

        <button type="submit">Submit</button>
        <Link to={'/users'} className="btn btn-link">
           Cancel
         </Link>
      </Form>
    </Formik>
  );
}

export { AddUser };
