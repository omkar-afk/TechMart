import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import validator from "validator";

function Signup() {
    const [formData, setFormData] = useState({
        firstName: { value: '', isValid: true, message: '' },
        lastName: { value: '', isValid: true, message: '' },
        email: { value: '', isValid: true, message: '' },
        password: { value: '', isValid: true, message: '' }
    });
    const { setJwt } = useUser();
    const navigate = useNavigate();

    const passwordRequirements = `1. Min 1 UpperCase
2. Min 2 lowercase
3. Min 1 Digit
4. Min 1 symbol
5. Min 8 characters`;

    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                return value.length >= 1 ? { isValid: true, message: 'Valid' } : { isValid: false, message: 'Required' };
            case 'email':
                return validator.isEmail(value) ? { isValid: true, message: 'Valid' } : { isValid: false, message: 'Invalid email' };
            case 'password':
                return validator.isStrongPassword(value) ? { isValid: true, message: 'Valid' } : { isValid: false, message: 'Weak password' };
            default:
                return { isValid: true, message: '' };
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const validation = validateField(name, value);
        setFormData(prev => ({
            ...prev,
            [name]: { value, ...validation }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = Object.values(formData).every(field => field.isValid);
        if (isFormValid) {
            try {
                const data = {
                    firstName: formData.firstName.value,
                    lastName: formData.lastName.value,
                    email: formData.email.value,
                    password: formData.password.value
                };
                const res = await axios.post('http://localhost:3000/api/customer/signup', data);
                cookie.set('token', res.data.body.jwt);
                setJwt(res.data.body.jwt);
                navigate('/');
            } catch (e) {
                alert(e.response?.status === 403 ? "Signup failed" : "Something went wrong");
            }
        } else {
            alert("Please correct the form errors before submitting.");
        }
    };

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center p-7 shadow-lg'>
                <h2 className='text-xl font-bold mb-4'>SIGN UP</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {['firstName', 'lastName', 'email', 'password'].map((field) => (
                        <label key={field} className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-black font-semibold text-lg">
                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                    {field === 'password' && (
                                        <span className="tooltip tooltip-right" data-tip={passwordRequirements}>
                                            <i className="fa-solid fa-circle-info ml-2"></i>
                                        </span>
                                    )}
                                </span>
                                <span className={`text-sm ${formData[field].isValid ? 'text-green-500' : 'text-red-500'}`}>
                                    {formData[field].message}
                                </span>
                            </div>
                            <input
                                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                                name={field}
                                value={formData[field].value}
                                onChange={handleChange}
                                placeholder={field === 'email' ? 'johndoe@example.com' : field === 'password' ? '********' : `Enter your ${field.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                                className="input input-bordered w-full max-w-xs text-bg no-outline font-semibold bg-gray-50"
                            />
                        </label>
                    ))}
                </div>

                <button type="submit" className="btn my-3 min-h-2 h-10 w-80 btn-primary border-0 bg-black text-white hover:bg-gray-800">
                    Sign Up
                </button>
                
                <div className="flex flex-col gap-2 w-full">
                    <button type="button" className="btn min-h-2 h-10 w-full btn-primary border-0 bg-black text-white hover:bg-gray-800">
                        Sign Up With Google
                    </button>
                    <button type="button" onClick={() => navigate("/signin")} className="btn min-h-2 h-10 w-full btn-primary border-0 bg-black text-white hover:bg-gray-800">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Signup;