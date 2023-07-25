import { signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../Firebase';
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';

const Nav = () => {
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();
  const colRef = collection(db, 'posts');
  const [post, setPosts] = useState([{}]);
  const [search, setSearch] = useState("");

  const optionMenu = () => {
    const options = document.getElementById("profileList");
    if(options.classList.contains("hidden")){
      options.classList.remove("hidden");
    } else {
      options.classList.add("hidden");
    };
  };

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let post = [];
      snapshot.docs.map((doc) => {
          post.push({...doc.data()});
          setPosts(post);
      });
  });
  },[]);

  return (
    <div className='head'>
        <div className="logo">Lin Share</div>

        <div className="search">
            <input onChange={(e) => setSearch(e.target.value)} className='textSearch' type="text" autoComplete='off' placeholder='Search'/>

            <div className="searchContainer">
              {post.filter((val) => {
                if(search === ""){
                  return;
                } else if(val.displayName.toLowerCase().includes(search.toLowerCase()) 
                || val.title.toLowerCase().includes(search.toLowerCase()) 
                || val.postDesc.toLowerCase().includes(search.toLowerCase())){
                  return val;
                }
              }).map((obj) => {
                return(
                  <div className="searchBox" onClick={() => navigate(`/${obj.idPost}`)}>
                      <div className="searchTitle">
                        {obj.title}
                      </div>
                      <div className="searchBody">
                        {obj.postDesc}
                      </div>
                  </div>
                )
              })}
            </div>            
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