import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../InputFields/InputField';
import PasswordInputField from '../InputFields/PasswordInputField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { loginUser } from '../../api/Auth/authApi';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    // Form validation schema with Yup
    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .required('Password is required'),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const admins = ["admin098", "admin"]

    // Form submission handler
    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {

            const res = await loginUser(values);
            dispatch(login(res));
            // console.log('Form submitted', res);
            toast.success("Login Successful!")

            if (admins.includes(values.username)) {
                navigate('/admin/requests');
            } else {
                navigate('/dashboard/policies');
            }

        } catch (error) {
            console.log(`Login Error : ${error}`)
            toast.error("Invalaid username or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-lavender-mist flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-3xl font-bold text-cobalt-blue mb-6">Login </h2>

                <Formik
                    initialValues={{
                        username: '',
                        password: '',
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


                            {/* Password */}
                            <PasswordInputField name="password" placeholder="Password" />
                            {touched.password && errors.password && (
                                <div className="text-red-500 text-sm">{errors.password}</div>
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
                                    : <p>Login</p>
                                }
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className='w-full mt-2 flex items-center justify-center'>
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/registration" className="text-cobalt-blue hover:underline">
                            <span>Register</span>
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LoginForm;
