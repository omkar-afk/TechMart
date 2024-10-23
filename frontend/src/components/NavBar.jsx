import React from 'react';
import { useUser } from '../context/UserContext'; // Ensure the path is correct
import InputSearchBox from './InputSearchBox';
import InputAddressBox from './InputAddressBox';
import { useNavigate } from 'react-router-dom';

function NavBar({search}) {
  const { user, loading, logout } = useUser();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  return (
    <div>
      <div className="navbar bg-white text-black my-px">
        <div className="flex-1">
          <a className="btn btn-ghost font-bold text-2xl mr-3" onClick={() => navigate('/')}>TechMart</a>
          <InputAddressBox />
          <InputSearchBox suggest={search}/>
        </div>
        {user ? <RightSideNavbar logout={logout} /> : <a href="/signin" className="btn btn-ghost text-xl">Login</a>}
      </div>
    </div>
  );
}

const RightSideNavbar = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex-0">
      <div className="tooltip tooltip-bottom mr-4" data-tip="chat">
        <button className='btn btn-ghost pt-1'><i className="fa-regular fa-comment fa-2xl"></i></button>
      </div>
      <div className="tooltip tooltip-bottom mr-4" data-tip="Sell">
        <button className='btn btn-ghost pt-1 font-bold text-xl' onClick={()=> navigate('/postadd')}>Sell</button>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-24 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-gray-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a className="justify-between no-bg-change" onClick={() => navigate('/myad')}>My Ads</a></li>
          <li><a className='no-bg-change' onClick={() => navigate('/setting')}>Settings</a></li>
          <li><button className='no-bg-change' onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;