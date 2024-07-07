import React from 'react'

function Signup() {
  return (
    <div className=''>
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Fname</span>
            </div>
            <input type="text" className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Lname</span>
            </div>
            <input type="text" className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Email</span>
            </div>
            <input type="Email" className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="form-control w-full max-w-xs mt-2">
            <div className="label">
                <span className="label-text">Password</span>
            </div>
            <input type="Password"  className="input input-bordered w-full max-w-xs" />
        </label>
        <button className="btn">Submit</button>
        <button className="btn">Signin</button>
    </div>
  )
}

export default Signup