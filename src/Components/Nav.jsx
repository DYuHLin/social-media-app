import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../Firebase';

const Nav = () => {

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

        <div className="profile">
        <i onClick={optionMenu} className='bx bxs-user'></i>
        <div id='profileList' className="profileList hidden">
          <ul className='options'>
            <li><div className="optionUser">User1</div></li>
            <li><i className='bx bxs-edit'></i><div className="optionText">Create Post</div></li>
            <li onClick={() => {signOut(auth)}}><i className='bx bx-log-in'></i><div className="optionText">Logout</div></li>
          </ul>
        </div>
        </div>
    </div>
  )
}

export default Nav