import React from 'react';
import { useFormik } from 'formik';
import '../components/styles/styles.css'
import '../components/styles/signup.css'
import { setUser } from '../services/axios';

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Field required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Field required';
    }else if(values.password !== 'react'){
        errors.password = 'Incorrect password'
    }

    return errors;
};

const SignupForm = ({ setter }) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            setUser(values.email, values.password);
            setter();
        },
    });
    return (
        <form className='SignUpForm' onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                placeholder='Email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email
                ? (<div className='errorDiv' >{formik.errors.email}</div>)
                : null}
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                placeholder='Password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password
                ? (<div className='errorDiv' >{formik.errors.password}</div>)
                : null}
            <button type="submit">Submit</button>
        </form>
    );
};

export default SignupForm;