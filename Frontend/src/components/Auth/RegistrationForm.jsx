import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../InputFields/InputField';
import PasswordInputField from '../InputFields/PasswordInputField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { registerUser } from '../../api/Auth/authApi';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const RegistrationForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    // Form validation schema with Yup
    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .test(
                'no-spaces',
                'The field must not contain spaces',
                (value) => !/\s/.test(value)
            )
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),

        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Form submission handler
    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const res = await registerUser(values);
            // console.log('Form submitted', res);
            dispatch(login(res))
            navigate('/kyc-update');
            toast.success("Registration Successful!")
        } catch (error) {
            console.log(`Registration Error : ${error}`);
            toast.error("Registration failed!!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-lavender-mist flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-3xl font-bold text-cobalt-blue mb-6">Create Account</h2>

                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors }) => (
                        <Form>
                            {/* Username */}
                            <InputField name="username" placeholder="Username" />
                            {touched.username && errors.username && (
                                <div className="text-red-500 text-sm">{errors.username}</div>
                            )}

                            {/* Email */}
                            <InputField name="email" type="email" placeholder="Email" />
                            {touched.email && errors.email && (
                                <div className="text-red-500 text-sm">{errors.email}</div>
                            )}

                            {/* Password */}
                            <PasswordInputField name="password" placeholder="Password" />
                            {touched.password && errors.password && (
                                <div className="text-red-500 text-sm">{errors.password}</div>
                            )}

                            {/* Confirm Password */}
                            <PasswordInputField name="confirmPassword" placeholder="Confirm Password" />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-deep-magenta text-white rounded-lg font-bold hover:bg-cobalt-blue focus:outline-none focus:ring-2 focus:ring-cobalt-blue"
                            >
                                {isLoading ?
                                    <div className='w-full flex  justify-center'>
                                        <Loader2 className='animate-spin' />
                                    </div>
                                    : <p>Register</p>
                                }
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className='w-full mt-2 flex items-center justify-center'>
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-cobalt-blue hover:underline">
                            <span>Login</span>
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default RegistrationForm;
