import React, { useContext, useState } from 'react'
import Nav from '../Components/Nav'
import { useNavigate } from 'react-router-dom';
import { arrayUnion, doc, getDoc, getDocs, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import UserContext from '../Context/UserContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

const Post = () => {
  const [err, setErr] = useState(false);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const switchTabs = (choice) => {
    const postText = document.getElementById("texts");
    const postImg = document.getElementById("img");
    const postLink = document.getElementById("links");

    const tabText = document.getElementById("textTab");
    const tabImg = document.getElementById("imgTab");
    const tabLink = document.getElementById("linkTab");

    if(choice === "text"){
        postText.classList.remove("hidden");
        postImg.classList.add("hidden");
        postLink.classList.add("hidden");

        tabText.classList.add("active");
        tabImg.classList.remove("active");
        tabLink.classList.remove("active");
    } else if(choice === "img"){
        postText.classList.add("hidden");
        postImg.classList.remove("hidden");
        postLink.classList.add("hidden");

        tabText.classList.remove("active");
        tabImg.classList.add("active");
        tabLink.classList.remove("active");
    } else if(choice === "link"){
        postText.classList.add("hidden");
        postImg.classList.add("hidden");
        postLink.classList.remove("hidden");

        tabText.classList.remove("active");
        tabImg.classList.remove("active");
        tabLink.classList.add("active");
    };
  };

  const createPost = async () => {
    const id = currentUser.uid + uuid();
    try{
      await setDoc(doc(db, "comments", id), {comments: []});
      await setDoc(doc(db, "likes", id), {likes: []});

      await setDoc(doc(db, "posts", id), {
        postUid: currentUser.uid,
        displayName: currentUser.displayName,
        title: heading,
        postDesc: description,
        postImg: image,
        links: link
      });

      await updateDoc(doc(db, "userPosts", currentUser.uid), {
          [id + ".userInfo"]: {
            postUid: currentUser.uid,
            displayName: currentUser.displayName,
            title: heading,
            postDesc: description,
            postImg: image,
            links: link
          },
          [id + ".date"]: serverTimestamp(),
        });
    } catch(err){
      setErr(err);
    };
  };

  return (
    <div className='postPage'>
        <Nav />

        <div className="posterContainer">
          <div className="postComponent">
            <div className="Posttitle">Create Post</div>
            <div className="createPosts">
              <div className="switchTypes">
                <div id='textTab' onClick={() => switchTabs("text")} className="postLink active">Post</div>
                <div id='imgTab' onClick={() => switchTabs("img")} className="postLink">Image or Video</div>
                <div id='linkTab' onClick={() => switchTabs("link")} className="postLink">Link</div>
              </div>

              <div className="postInputs">
                <input id='titlePost' onChange={(e) => {setHeading(e.target.value)}} value={heading} className='posterText' type="text" autoComplete='off' placeholder='Title'/>  
                <textarea onChange={(e) => {setDescription(e.target.value)}} value={description} className='postTextarea' name="" id="texts" cols="30" rows="10" placeholder='Text'></textarea>   
                <textarea onChange={(e) => {setImage(e.target.value)}} value={image} className='postTextarea hidden' name="" id="img" cols="30" rows="10" placeholder='Link'></textarea>   
                <textarea onChange={(e) => {setLink(e.target.value)}} value={link} className='postTextarea hidden' name="" id="links" cols="30" rows="10" placeholder='Link'></textarea>   
              </div>
              
              <div className="postSubmit">
                <button onClick={() => navigate("/")} className='loginBtn'>Cancel</button>
                <button onClick={createPost} className='registerBtn'>Post</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Post