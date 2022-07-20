import React from 'react';
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { userActions } from '../reducers';

import styles from './AddUser.module.scss';

const AddUser = (props) =>  {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CustomInputComponent = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => (
    <div>
      <input type="text" {...field} {...props} className={ touched[field.name] &&
        errors[field.name] ? `form-control ${styles.invalid}` : "form-control" }/>
      {touched[field.name] &&
        errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  );

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  
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
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <Field type="text" name="firstName">
              { ({ 
                  field, 
                  meta: { touched, error } 
                }) => <input className={ touched && error ? `form-control ${styles.invalid}` : "form-control" } { ...field } />
              }
            </Field>

            <ErrorMessage name="firstName" >
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" className="form-control" />
            <ErrorMessage name="lastName" >
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" className="form-control" />
			      <ErrorMessage name="email" >
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone No</label>
            <Field name="phone" type="text" className="form-control" />
			      <ErrorMessage name="phone" >
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>

        <button className="btn btn-primary" type="submit">Add User</button>
        <button className={`btn btn-secondary ${styles.rightButton}`} onClick={() => navigate(`/users`, {replace: true})}>
          Cancel
        </button>
      
      </Form>
    </Formik>
  );
}

export { AddUser };

// Agregar border rojo a inputs no validos
// Crear smart-dumb components
// Desahabilitar el boton de Guardar cuando el form sea invalido
