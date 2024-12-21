import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useUser } from "../context/UserContext";
import validator from "validator";
import { backendUrl } from "../assets/constants";
function Setting() {
  const [profile, setProfile] = useState(true);
  const { user, loading, login } = useUser();
  const [pFormData, setpFormData] = useState({
    firstName: { blur: false, val: user?.firstName || "", valid: true },
    lastName: { blur: false, val: user?.lastName || "", valid: true },
    email: { blur: false, val: user?.email || "", valid: true },
    phone: { blur: false, val: user?.phoneNumber || "", valid: true }
  });
  const [paFormData, setpaFormData] = useState({
    currentpassword: { blur: false, val: "", valid: true },
    newpassword: { blur: false, val: "", valid: false },
    confirmpassword: { blur: false, val: "", valid: false }
  });
  useEffect(() => {
    if (user) {
      setpFormData({
        firstName: { blur: false, val: user.firstName || "", valid: true },
        lastName: { blur: false, val: user.lastName || "", valid: true },
        email: { blur: false, val: user.email || "", valid: true },
        phone: { blur: false, val: user.phoneNumber || "", valid: true }
      });
    }
  }, [user]);
  console.log(user);
  const multilineStringWithLineBreaks = `1. Min 1 UpperCase \n2. Min 2 lowercase \n3. Min 1 Digit \n4. Min 1 symbol \n5. Min 8 characters`;
  const handleChangepr = (event) => {
    const { name, value } = event.target;
    setpFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name], val: value, valid: true }
    }));
  };
  const handleBlurpr = (event) => {
    const { name, value } = event.target;
    let valid = true;
    if (name === 'email') {
      valid = validator.isEmail(value);
    } else if (name === 'phone') {
      valid = validator.isMobilePhone(value);
    }
    setpFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name], blur: true, valid }
    }));
  };
  const handleChangepa = (event) => {
    const { name, value } = event.target;
    setpaFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name], val: value }
    }));
  };
  // const bay = true
  const handleBlurpa = (event) => {
    const { name, value } = event.target;
    let valid = false;
    if (name === 'newpassword') {
      valid = validator.isStrongPassword(value);
    } else if (name === 'confirmpassword') {
      valid = value === paFormData.newpassword.val;
    }else if (name === 'currentpassword') {
      valid = true;
    }
    console.log(valid);
    setpaFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name], val: value, valid, blur: true }
    }));
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.values(pFormData).every(field => field.valid);
    if (isValid) {
      console.log("Updating profile", pFormData);
      try {
        // Call API to update profile
        const response = await fetch(`${backendUrl}/api/customer/update`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.jwt}`
          },
          body: JSON.stringify({
            _id: user._id,
            firstName: pFormData.firstName.val,
            lastName: pFormData.lastName.val,
            email: pFormData.email.val,
            phoneNumber: pFormData.phone.val
          })
        });
        let newResponse = await response.json();

        console.log(newResponse);
        if (newResponse.StatusCode === 200) {
          const updatedUser = newResponse.body;
          //encode the jwt token
          alert('Profile updated successfully');
          login(updatedUser.jwt); // Update user context with new data
        } else {
          throw new Error('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    } else {
      alert('Please correct the errors in the form before submitting.');
    }
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.values(paFormData).every(field => field.valid);
    console.log(isValid);
    console.log(paFormData);
    if (isValid) {
      console.log("Changing password", paFormData);
      try {
        // Call API to change password
        const response = await fetch(`${backendUrl}/api/customer/update`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.jwt}`
          },
          body: JSON.stringify({
            _id: user._id,
            currentpassword: paFormData.currentpassword.val,
            password: paFormData.newpassword.val
          })
        });
        let newResponse = await response.json();
        console.log(newResponse);
        if (newResponse.status === 200 || newResponse.StatusCode === 200) {
          const updatedUser = newResponse.body;
          //encode the jwt token
          login(updatedUser.jwt); // Update user context with new data
          alert('password updated successfully');
        } else if (newResponse.status === 403) {
          alert('password incorrect');
        }else {
          throw new Error('Failed to change password');
        }

      } catch (error) {
        console.error('Error changing password:', error);
        alert('Failed to change password. Please try again.');
      }
      setpaFormData({
        currentpassword: { blur: false, val: "", valid: true },
        newpassword: { blur: false, val: "", valid: false },
        confirmpassword: { blur: false, val: "", valid: false }
      });
    } else {
      alert('Please correct the errors in the form before submitting.');
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Please log in to access settings.</div>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar search={""} />
      <div className="grid grid-cols-12 mt-[15vh]">
        <div className="col-start-3 col-span-8 bg-gray-100 h-fit p-[5vh] rounded-3xl">
          <div className="flex justify-around">
            <div className="w-3/12 h-[10vh]">
              <div className="flex flex-col text-lg py-2">
                <div
                  className={`${profile ? "font-semibold" : "font-light"} cursor-pointer`}
                  onClick={() => setProfile(true)}
                >
                  Update Profile
                </div>
                {!user.password ? (<div></div>):(
                <div
                  className={`${!profile ? "font-semibold" : "font-light"} cursor-pointer`}
                  onClick={() => setProfile(false)}
                >

                  Change Password
                </div>)}
              </div>
            </div>
            {profile ? (
              <form onSubmit={handleProfileSubmit} className="w-8/12 pb-2">
                <div>
                  {['firstName', 'lastName', 'email', 'phone'].map((field) => (
                    <label key={field} className="form-control pt-0 w-full min-w-80 mx-3">
                      <div className="label">
                        <span className="label-text text-black font-semibold text-lg">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </span>
                      </div>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        className={`input input-bordered max-w-sm text-bg no-outline font-semibold bg-gray-50 ${
                          pFormData[field].blur && !pFormData[field].valid ? 'border-2 border-rose-500' : ''
                        }`}
                        name={field}
                        value={pFormData[field].val}
                        onChange={handleChangepr}
                        onBlur={handleBlurpr}
                      />
                    </label>
                  ))}
                </div>
                <button type="submit" className="btn my-5  ml-3 min-h-2 h-10 w-80 btn-primary border-0 bg-black text-white hover:bg-gray-800">
                  Update Profile
                </button>
              </form>
            ) : 
              //if user.googleLogin is false then show this or allow user to create password
              !user.password  ? (<div></div>) : (
                <form onSubmit={handlePasswordSubmit} className="w-8/12 pb-2">
                <div>
                  {['currentpassword', 'newpassword', 'confirmpassword'].map((field) => (
                    <label key={field} className="form-control pt-0 w-full min-w-80 mx-3">
                      <div className="label flex max-w-sm">
                        <span className="label-text text-black font-semibold text-lg">
                          {field.charAt(0).toUpperCase() + field.slice(1).replace('password', ' Password')}
                        </span>
                        {field === 'newpassword' && (
                          <span className="tooltip tooltip-right" data-tip={multilineStringWithLineBreaks}>
                            <i className="fa-solid fa-circle-info mr-1 mb-1"></i>
                          </span>
                        )}
                      </div>
                      <input
                        type="password"
                        placeholder="*************"
                        className={`input input-bordered max-w-sm text-bg no-outline font-semibold bg-gray-50 ${
                          paFormData[field].blur && !paFormData[field].valid && field !== "currentpassword" ? 'border-2 border-rose-500' : ''
                        }`}
                        name={field}
                        value={paFormData[field].val}
                        onChange={handleChangepa}
                        onBlur={handleBlurpa}
                      />
                    </label>
                  ))}
                  
                </div>
                <button type="submit" className="btn my-5  ml-3 min-h-2 h-10 w-80 btn-primary border-0 bg-black text-white hover:bg-gray-800">
                  Change Password
                </button>
                </form>
              )}
          
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default Setting;