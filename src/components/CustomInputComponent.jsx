
import styles from './CustomInputComponent.module.scss';

export const CustomInputComponent = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => (
    <>
        <input {...field} {...props} className={ touched[field.name] &&
        errors[field.name] ? `form-control ${styles.invalid}` : "form-control" }/>
        {touched[field.name] &&
        errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </>

);

export default CustomInputComponent;