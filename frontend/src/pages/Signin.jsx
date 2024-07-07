import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import cookie from 'js-cookie'
import {useUser} from '../context/UserContext'
import {useNavigate} from 'react-router-dom'
function Signin() {
    const [email , setEmail] = useState('')
    const [pass , setPass] = useState('')
    const {setUser} = useUser()
    const navigate = useNavigate()
    const handleSubmit = async () => {
        const data = {
            email,
            password: pass
        }
        try{
            const res = await axios.post('http://localhost:3000/api/customer/signin', data);
            cookie.set('token', res.data.data.jwt);
            const user = jwtDecode(res.data.data.jwt);
            setUser(user);
            navigate('/')
        }catch(e){
            if(e.response.status === 403){
                alert("login failed")
            }else{
                alert("something went wrong")
            }
            
        }
    }
  return (
    <div className=''>
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Email</span>
            </div>
            <input type="Email" onChange={(e)=>{setEmail(e.target.value)}} className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="form-control w-full max-w-xs mt-2">
            <div className="label">
                <span className="label-text">Password</span>
            </div>
            <input type="Password" onChange={(e)=>{setPass(e.target.value)}} className="input input-bordered w-full max-w-xs" />
        </label>
        <button className="btn" onClick={handleSubmit}>Submit</button>
        <button className="btn">Signup</button>
    </div>
  )
}

export default Signin