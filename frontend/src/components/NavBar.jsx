import React from 'react'
import { useUser } from '../context/UserContext'
import InputSearchBox from './InputSearchBox'
import InputAddressBox from './InputAddressBox';
function NavBar() {
      const user = useUser();
  return (
    <div>
        <div className="navbar bg-white text-black my-px">
  <div className="flex-1">
    <a className="btn btn-ghost font-bold text-2xl mr-3">TechMart</a>
    <InputAddressBox />
    <InputSearchBox />
  </div>
    {user.user ? <RightSideNavbar /> : <a href="/signin" className="btn btn-ghost text-xl">Login</a>}
</div>
    </div>
  )
}


const RightSideNavbar = () => {
  return (
    <div className="flex-0">
    <div className="tooltip tooltip-bottom" data-tip="chat">
      <button className='btn btn-ghost pt-1'><i class="fa-regular fa-comment fa-2xl" ></i></button>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-xl">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-gray-200  rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between no-bg-change">
            Profile
          </a>
        </li>
        <li><a className='no-bg-change'>Settings</a></li>
        <li><a className='no-bg-change'>Logout</a></li>
      </ul>
    </div>
    </div>
  )
}

export default NavBar