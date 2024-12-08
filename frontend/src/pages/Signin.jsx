import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import validator from "validator";
import GoogleLogin from '../components/GoogleLoginbut';
function Signin() {
    const [formData, setFormData] = useState({
        email: { value: '', isValid: true, message: '' },
        password: { value: '', isValid: true, message: '' }
    });
    const { login } = useUser();
    const navigate = useNavigate();

    const passwordRequirements = `1. Min 1 UpperCase
2. Min 2 lowercase
3. Min 1 Digit
4. Min 1 symbol
5. Min 8 characters`;

    const validateField = (name, value) => {
        if (name === 'email') {
            return validator.isEmail(value) ? { isValid: true, message: 'Valid' } : { isValid: false, message: 'Invalid email' };
        } else if (name === 'password') {
            return validator.isStrongPassword(value) ? { isValid: true, message: 'Valid' } : { isValid: false, message: 'Weak password' };
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
        if (formData.email.isValid && formData.password.isValid) {
            try {
                const res = await axios.post('http://localhost:3000/api/customer/signin', {
                    email: formData.email.value,
                    password: formData.password.value,
                    googleLogin: false
                });
                cookie.set('token', res.data.body.jwt);
                login(res.data.body.jwt);
                navigate('/');
            } catch (e) {
                alert(e.response.data.message || "something went wrong");
            }
        } else {
            alert("Please correct the form errors before submitting.");
        }
    };

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center p-7 shadow-lg'>
                <h2 className='text-xl font-bold mb-4'>SIGN IN</h2>
                
                {['email', 'password'].map((field) => (
                    <label key={field} className="form-control w-full min-w-80 mx-3 mb-4">
                        <div className="label">
                            <span className="label-text text-black font-semibold text-lg">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
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
                            type={field === 'password' ? 'password' : 'text'}
                            name={field}
                            value={formData[field].value}
                            onChange={handleChange}
                            placeholder={field === 'email' ? 'johndoe@example.com' : '********'}
                            className="input input-bordered w-full max-w-xs text-bg no-outline font-semibold bg-gray-50"
                        />
                    </label>
                ))}

                <button type="submit" className="btn my-3 min-h-2 h-10 w-80 btn-primary border-0 bg-black text-white hover:bg-gray-800">
                    Sign In
                </button>
                
                <div className="flex flex-col gap-2 w-full">
                    <GoogleLogin />
                    <button type="button" onClick={() => navigate("/signup")} className="btn min-h-2 h-10 w-full btn-primary border-0 bg-black text-white hover:bg-gray-800">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Signin;