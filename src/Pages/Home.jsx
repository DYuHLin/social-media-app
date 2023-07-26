import React, { useContext, useState } from 'react'
import Nav from '../Components/Nav'
import Feed from '../Components/Feed'
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [news, setNews] = useState(true);
  const [old, setOld] = useState(false);
  const [best, setBest] = useState(false);

  const switchFilter = (choice) => {
    const postTop = document.getElementById("top");
    const postNew = document.getElementById("new");
    const postOld = document.getElementById("old");

    if(choice === "top"){
        postTop.classList.add("selected");
        postNew.classList.remove("selected");
        postOld.classList.remove("selected");

        setBest(true);
        setNews(false);
        setOld(false);
    } else if(choice === "new"){
      postTop.classList.remove("selected");
      postNew.classList.add("selected");
      postOld.classList.remove("selected");

      setBest(false);
      setNews(true);
      setOld(false);
    } else if(choice === "old"){
      postTop.classList.remove("selected");
      postNew.classList.remove("selected");
      postOld.classList.add("selected");

      setBest(false);
      setNews(false);
      setOld(true);
    }
  };
  
  return (
    <div className='home'>
      
      <div className="homeContent">
      <Nav />
      <div className="homeComponent">
        <div className="createPost">
          <img className='userImg' src={currentUser.photoURL} alt="profile" />
          <button onClick={() => navigate("/post")} className='postBtn'>Create Post</button>
          </div>

          <div className="sortPost">
            <div className="sortIcon" onClick={() => {switchFilter("top")}}>
              <i id='top' className='bx bx-signal-3' ></i>
              <span>Top</span>
            </div>
            <div className="sortIcon" onClick={() => {switchFilter("new")}}>
            <i id='new' className='bx bxs-certification selected'></i>
              <span>New</span>
            </div>
            <div className="sortIcon" onClick={() => {switchFilter("old")}}>
              <i id='old' className='bx bx-time' ></i>
              <span>Old</span>
            </div>
          </div>

          <div className="feed">
            <Feed new = {news} old = {old} best = {best}/>
          </div>
      </div>
        
      </div>
    </div>
  )
}

export default Home