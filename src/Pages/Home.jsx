import React, { useContext } from 'react'
import Nav from '../Components/Nav'
import Feed from '../Components/Feed'
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  return (
    <div className='home'>
      
      <div className="homeContent">
      <Nav />
      <div className="homeComponent">
        <div className="createPost">
          <img className='userImg' src={currentUser.photoURL} alt="profile" />
          <button onClick={() => navigate("/post")} className='postBtn'>Create Post</button>
          </div>

          <div className="feed">
            <Feed />
          </div>
      </div>
        
      </div>
    </div>
  )
}

export default Home