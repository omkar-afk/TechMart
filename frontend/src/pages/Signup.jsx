import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import cookie from 'js-cookie'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import validator from "validator"

function Signup() {
    const [fname, setFname] = useState('')
    const [sname, setSname] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [fnameMssg, setFnameMssg] = useState('')
    const [snameMssg, setSnameMssg] = useState('')
    const [emailMssg, setEmailMssg] = useState('')
    const [passMssg, setPassMssg] = useState('')
    const [isBlurredFname, setIsBlurredFname] = useState(false)
    const [isBlurredSname, setIsBlurredSname] = useState(false)
    const [isBlurredEmail, setIsBlurredEmail] = useState(false)
    const [isBlurredPass, setIsBlurredPass] = useState(false)
    const { setUser } = useUser()
    const navigate = useNavigate()

    const multilineStringWithLineBreaks = `1. Min 1 UpperCase \n 2. Min 2 lowercase \n 3. Min 1 Digit \n 4. Min 1 symbol \n 5. Min 8 characters`;

    const blurrCheckerFname = () => {
        setIsBlurredFname(true);
        if (fname.length >= 1) {
            setFnameMssg('Valid');
        } else {
            setFnameMssg('Invalid');
        }
    }

    const onchangeFname = (e) => {
        const newFname = e.target.value;
        setFname(newFname);
        if (isBlurredFname) {
            if (newFname.length >= 1) {
                setFnameMssg('Valid');
            } else {
                setFnameMssg('Invalid');
            }
        }
    }

    const blurrCheckerSname = () => {
        setIsBlurredSname(true);
        if (sname.length >= 1) {
            setSnameMssg('Valid');
        } else {
            setSnameMssg('Invalid');
        }
    }

    const onchangeSname = (e) => {
        const newSname = e.target.value;
        setSname(newSname);
        if (isBlurredSname) {
            if (newSname.length >= 1) {
                setSnameMssg('Valid');
            } else {
                setSnameMssg('Invalid');
            }
        }
    }

    const blurrCheckerEmail = () => {
        setIsBlurredEmail(true);
        if (validator.isEmail(email)) {
            setEmailMssg('Valid');
        } else {
            setEmailMssg('Invalid');
        }
    }

    const onchangeEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (isBlurredEmail) {
            if (validator.isEmail(newEmail)) {
                setEmailMssg('Valid');
            } else {
                setEmailMssg('Invalid');
            }
        }
    }

    const blurrCheckerPass = () => {
        setIsBlurredPass(true);
        if (validator.isStrongPassword(pass)) {
            setPassMssg('Valid');
        } else {
            setPassMssg('Invalid');
        }
    }

    const onchangePass = (e) => {
        const newPass = e.target.value;
        setPass(newPass);
        if (isBlurredPass) {
            if (validator.isStrongPassword(newPass)) {
                setPassMssg('Valid');
            } else {
                setPassMssg('Invalid');
            }
        }
    }

    const handleSubmit = async () => {
        const data = {
            firstName: fname,
            lastName: sname,
            email,
            password: pass
        }
        try {
            const res = await axios.post('http://localhost:3000/api/customer/signup', data);
            cookie.set('token',res.data.body.jwt)
            setJwt(res.data.body.jwt)
            navigate('/')
        } catch (e) {
            if (e.response.status === 403) {
                alert("Signup failed")
            } else {
                alert("Something went wrong")
            }
        }
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='flex flex-col items-center p-7 shadow-lg'>
                <div className='text-xl font-bold'>
                    SIGN UP
                </div>
                <div className="flex items-center">
                    <label className="form-control w-full min-w-80 mx-3">
                        <div className="label">
                            <span className="label-text text-black font-semibold text-lg">First Name <span className={`ml-2 ${fnameMssg === 'Valid' ? 'text-green-500' : fnameMssg === 'Invalid' ? 'text-red-500' : ''}`}>
                                {fnameMssg}
                            </span></span>
                        </div>
                        <input type="text" onChange={onchangeFname} onBlur={blurrCheckerFname} placeholder='John' className="input input-bordered w-full max-w-xs text-bg no-outline font-semibold bg-gray-50" />
                    </label>
                    <label className="form-control w-full min-w-80 mx-3">
                        <div className="label">
                            <span className="label-text text-black font-semibold text-lg">Last Name <span className={`ml-2 ${snameMssg === 'Valid' ? 'text-green-500' : snameMssg === 'Invalid' ? 'text-red-500' : ''}`}>
                                {snameMssg}
                            </span></span>
                        </div>
                        <input type="text" onChange={onchangeSname} onBlur={blurrCheckerSname} placeholder='Doe' className="input input-bordered w-full max-w-xs text-bg no-outline font-semibold bg-gray-50" />
                    </label>
                </div>
                <div className="flex items-center">
                    <label className="form-control w-full min-w-80 mx-3">
                        <div className="label">
                            <span className="label-text text-black font-semibold text-lg">Email <span className={`ml-2 ${emailMssg === 'Valid' ? 'text-green-500' : emailMssg === 'Invalid' ? 'text-red-500' : ''}`}>
                                {emailMssg}
                            </span></span>
                        </div>
                        <input type="Email" onChange={onchangeEmail} onBlur={blurrCheckerEmail} placeholder='johndoe@gmail.com' className="input input-bordered w-full max-w-xs text-bg no-outline font-semibold bg-gray-50" />
                    </label>
                    <label className="form-control w-full min-w-80 mx-3">
                        <div className="label">
                            <span className="label-text text-black font-semibold text-lg">Password <span className={`ml-2 ${passMssg === 'Valid' ? 'text-green-500' : passMssg === 'Invalid' ? 'text-red-500' : ''}`}>
                                {passMssg}
                            </span></span>
                            <div className="tooltip tooltip-right" data-tip={multilineStringWithLineBreaks}>
                                <i className="fa-solid fa-circle-info mr-1 mb-1"></i>
                            </div>
                        </div>
                        <input type="password" onChange={onchangePass} onBlur={blurrCheckerPass} placeholder='*********' className="input input-bordered w-full max-w-xs text-bg no-outline font-semibold bg-gray-50" />
                    </label>
                </div>
                <button className="btn my-3 min-h-2 h-10 w-80 btn-primary border-0 bg-black text-white hover:bg-gray-800" onClick={handleSubmit}>Submit</button>
                <div>
                    <button className="btn min-h-2 h-10 w-80 btn-primary border-0 bg-black text-white hover:bg-gray-800 mx-3">SIGN UP With Google</button>
                    <button className="btn min-h-2 h-10 w-80 btn-primary border-0 bg-black text-white hover:bg-gray-800 mx-3" onClick={() => navigate('/signin')}>SIGN IN</button>
                </div>
            </div>
        </div>
    )
}

export default Signup