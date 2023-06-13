import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { auth } from '../Firebase';
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const optionMenu = () => {
    const options = document.getElementById("profileList");
    if(options.classList.contains("hidden")){
      options.classList.remove("hidden");
    } else {
      options.classList.add("hidden");
    };
  };

  return (
    <div className='head'>
        <div className="logo">Lin Share</div>

        <div className="search">
            <input className='textSearch' type="text" autoComplete='off' placeholder='Search'/>
        </div>

        <div className="profile" onClick={optionMenu}>
        <img className='userImg' src={currentUser.photoURL} alt="profile" />
        <div id='profileList' className="profileList hidden">
          <ul className='options'>
            <li><div className="optionUser">{currentUser.displayName}</div></li>
            <li onClick={() => navigate("/post")}><i className='bx bxs-edit'></i><div className="optionText">Create Post</div></li>
            <li onClick={() => {signOut(auth)}}><i className='bx bx-log-in'></i><div className="optionText">Logout</div></li>
          </ul>
        </div>
        </div>
    </div>
  )
}

export default Nav