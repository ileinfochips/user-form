import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userActions } from '../reducers';
import styles from './EditUser.module.scss';

const EditUser = ({match}) => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const user = useSelector(({ users }) =>{
    return users.filter((user) => user.id == id)[0];
  })
  
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return (
    <Formik
      initialValues={{ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone }}
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
        const payload = {
          id,
          user: values,
          action: 'UPDATE_USER'
        }
        dispatch(userActions(payload))
        // Go back to users/
        navigate(-1);
      }}
    >
      <Form>
        <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text"  className="form-control" />
            <ErrorMessage name="firstName" >
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label> 
          <Field name="lastName" type="text" className="form-control" />
          <ErrorMessage name="lastName" />        
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" className="form-control" />
          <ErrorMessage name="email" />        
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone No</label>
          <Field name="phone" type="text" className="form-control" />
          <ErrorMessage name="phone" />        
        </div>
        
        <button className="btn btn-primary" type="submit">
          Save
        </button>
        <button className={`btn btn-secondary ${styles.rightButton}`} onClick={() => navigate(`/users`)}>
          Cancel
        </button>
      
      </Form>
    </Formik>
  );
}

export { EditUser };
