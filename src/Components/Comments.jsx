import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext';
import { v4 as uuid } from 'uuid';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const Comments = () => {
const {currentUser} = useContext(UserContext);
const [comment, setComment] = useState("");

const sendComment = async () => {
    try{

    } catch(err){

    };
};

  return (
    <div className='commentSection'>
        <div className="commenter">Comment as {currentUser.displayName}</div>

        <div className="commentBox">
            <textarea onChange={(e) => {setComment(e.target.value)}} className='postTextarea' name="" id="commentBox" cols="30" rows="5"></textarea>
        </div>
        <div className="postSubmit">
            <button className='registerBtn'>Post</button>
        </div>
    </div>
  )
}

export default Comments