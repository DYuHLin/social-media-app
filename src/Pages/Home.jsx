import React, { useContext } from 'react'
import Nav from '../Components/Nav'
import Feed from '../Components/Feed'
import UserContext from '../Context/UserContext';

const Home = () => {
  const {currentUser} = useContext(UserContext);
  
  return (
    <div className='home'>
      
      <div className="homeContent">
      <Nav />
      <div className="homeComponent">
        <div className="createPost">
          <img className='userImg' src={currentUser.photoURL} alt="profile" />
          <button className='postBtn'>Create Post</button>
          </div>

          <div className="sortPost">
            <div className="sortIcon">
              <i className='bx bx-signal-3' ></i>
              <span>Top</span>
            </div>
            <div className="sortIcon">
            <i className='bx bxs-certification'></i>
              <span>New</span>
            </div>
            <div className="sortIcon">
              <i className='bx bx-time' ></i>
              <span>Old</span>
            </div>
          </div>

          <div className="feed">
            <Feed />
            <Feed />
          </div>
      </div>
        
      </div>
    </div>
  )
}

export default Home