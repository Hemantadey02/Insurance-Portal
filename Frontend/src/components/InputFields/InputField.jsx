import React from 'react';
import { Field } from 'formik';

const InputField = ({ name, type = 'text', placeholder }) => {
    return (
        <div className="mb-4">
            <Field
                name={name}
                type={type}
                placeholder={placeholder}
                className="w-full p-3 border border-cool-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-cobalt-blue placeholder-cool-gray"
            />
        </div>
    );
};

export default InputField;
