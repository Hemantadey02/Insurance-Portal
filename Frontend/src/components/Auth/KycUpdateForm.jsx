import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../InputFields/InputField';
import { useNavigate } from 'react-router-dom';
import { updateUserDetails } from '../../api/Auth/authApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const KycUpdateForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [kycType, setKycType] = useState('');

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        fullname: Yup.string()
            .min(3, 'Full name must be at least 3 characters')
            .required('Full name is required'),

        address: Yup.string()
            .min(6, 'Address must be at least 6 characters')
            .required('Address is required'),

        kycType: Yup.string().required('Please select a KYC type'),

        kycId: Yup.string()
            .required('KYC ID is required')
            .test('is-valid-kycId', 'Invalid KYC ID', function (value) {
                const { kycType } = this.parent;
                if (kycType === 'Aadhaar') {
                    return /^\d{12}$/.test(value);
                }
                if (kycType === 'PAN') {
                    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
                }
                if (kycType === 'Passport') {
                    return /^[A-PR-WY][1-9]\d{7}$/.test(value);
                }
                return true;
            }),
    });

    const authData = useSelector((state) => state.auth);

    // Form submission handler
    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            await updateUserDetails(authData.user?.userId, values);
            toast.success("Kyc and address update Successfully!")
            navigate('/dashboard');

        } catch (error) {
            console.error(`User Details Update Error : ${error}`)
            toast.error("Update Failed!!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-lavender-mist flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-3xl font-bold text-cobalt-blue mb-6">Fill your details</h2>

                <Formik
                    initialValues={{
                        fullname: '',
                        address: '',
                        kycId: '',
                        kycType: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors, setFieldValue }) => (
                        <Form>
                            {/* FullName */}
                            <InputField name="fullname" placeholder="Full Name" />
                            {touched.fullname && errors.fullname && (
                                <div className="text-red-500 text-sm">{errors.fullname}</div>
                            )}

                            {/* Address */}
                            <InputField name="address" placeholder="Address" />
                            {touched.address && errors.address && (
                                <div className="text-red-500 text-sm">{errors.address}</div>
                            )}

                            {/* KYC Type Dropdown */}
                            <div className="mb-4">
                                <select
                                    id="kycType"
                                    value={kycType}
                                    onChange={(e) => {
                                        setKycType(e.target.value);
                                        setFieldValue('kycType', e.target.value);
                                    }}
                                    className="w-full p-3 border border-cool-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-cobalt-blue placeholder-cool-gray"
                                >
                                    <option disabled value="">Select KYC Type</option>
                                    <option value="Aadhaar">Aadhaar Card</option>
                                    <option value="PAN">PAN Card</option>
                                    <option value="Passport">Passport</option>
                                </select>
                            </div>

                            {/* KYC ID */}
                            <InputField name="kycId" placeholder="KYC ID" />
                            {touched.kycId && errors.kycId && (
                                <div className="text-red-500 text-sm mb-2">{errors.kycId}</div>
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
                                    : <p>Submit</p>
                                }
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default KycUpdateForm;
