import React from 'react';
import { useUser } from '../context/UserContext'; // Ensure the path is correct
import InputSearchBox from './InputSearchBox';
import InputAddressBox from './InputAddressBox';
import cookie from 'js-cookie';

function NavBar({search}) {
    const { user} = useUser(); // Ensure this matches the context

    return (
        <div>
            <div className="navbar bg-white text-black my-px">
                <div className="flex-1">
                    <a className="btn btn-ghost font-bold text-2xl mr-3">TechMart</a>
                    <InputAddressBox />
                    <InputSearchBox suggest={search}/>
                </div>
                {user ? <RightSideNavbar /> : <a href="/signin" className="btn btn-ghost text-xl">Login</a>}
            </div>
        </div>
    );
}

const RightSideNavbar = () => {
    const { setJwt } = useUser(); // Ensure this is correct and available

    const handleLogout = () => {
        cookie.remove('token');
        setJwt(null); // This should be defined in context
    };

    return (
        <div className="flex-0">
            <div className="tooltip tooltip-bottom mr-4" data-tip="chat">
                <button className='btn btn-ghost pt-1'><i className="fa-regular fa-comment fa-2xl"></i></button>
            </div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-gray-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <a className="justify-between no-bg-change">
                            Profile
                        </a>
                    </li>
                    <li><a className='no-bg-change'>Settings</a></li>
                    <li><button className='no-bg-change' onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
