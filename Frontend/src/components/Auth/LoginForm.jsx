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
import AuthIllustrationImg from '../../assets/Images/AuthIllustrationImg.jpg';

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

    const admins = ["admin098", "admin01"]

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
        <div className="min-h-screen bg-[var(--color-lavender-mist)] flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl overflow-hidden">
                <div className="grid md:grid-cols-2 bg-gradient-to-br from-[var(--color-azure-blue)] to-[var(--color-lavender-mist)] h-[580px]">

                    {/* LEFT IMAGE SECTION */}
                    <div className="hidden md:flex items-center justify-center py-8">
                        <img
                            src={AuthIllustrationImg}
                            alt="Login Illustration"
                            className="max-w-md rounded-2xl w-full h-full object-cover"
                        />
                    </div>

                    {/* RIGHT FORM SECTION */}
                    <div className="flex justify-center items-center py-8">
                        <div className="w-full max-w-md">

                            <h2 className="text-3xl font-bold text-deep-magenta mb-1">
                                Login
                            </h2>
                            <p className="text-licorice mb-6">
                                Access your Insureva account securely.
                            </p>

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
                                        <InputField
                                            name="username"
                                            placeholder="Username"
                                        />
                                        {touched.username && errors.username && (
                                            <div className="text-red-500 text-sm mb-2">
                                                {errors.username}
                                            </div>
                                        )}

                                        {/* Password */}
                                        <PasswordInputField
                                            name="password"
                                            placeholder="Password"
                                        />
                                        {touched.password && errors.password && (
                                            <div className="text-red-500 text-sm mb-4">
                                                {errors.password}
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-deep-magenta text-white rounded-lg font-bold hover:bg-cobalt-blue focus:outline-none focus:ring-2 focus:ring-cobalt-blue cursor-pointer transition ease-in-out duration-500"
                                        >
                                            {isLoading ? (
                                                <div className="flex justify-center">
                                                    <Loader2 className="animate-spin" />
                                                </div>
                                            ) : (
                                                "Login"
                                            )}
                                        </button>
                                    </Form>
                                )}
                            </Formik>

                            {/* Register Link */}
                            <div className="w-full mt-4 text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/registration"
                                        className="text-deep-magenta font-semobold hover:underline"
                                    >
                                        Register
                                    </Link>
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginForm;