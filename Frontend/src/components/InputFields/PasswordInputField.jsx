import React, { useState } from 'react';
import { Field } from 'formik';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInputField = ({ name, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="mb-4">
            <div className="relative">
                <Field
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className="w-full p-3 pr-10 border border-cool-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-deep-magenta placeholder-cool-gray"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cool-gray cursor-pointer hover:text-deep-magenta"
                    title={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};

export default PasswordInputField;
