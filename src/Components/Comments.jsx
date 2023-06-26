import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext';
import { v4 as uuid } from 'uuid';
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const Comments = (collection) => {
const {currentUser} = useContext(UserContext);
const [comment, setComment] = useState("");

const sendComment = async (id) => {
  const newId = currentUser.uid + uuid();
    try{
      await updateDoc(doc(db, 'comments', id), {
        comments: arrayUnion({
            commentId:newId,
            commenter: currentUser.uid,
            displayName: currentUser.displayName,
            replyTo: id,
            comment: comment,
            replies: [],
            date: serverTimestamp()
        })
    });
    } catch(err){

    };
    setComment("");
};

  return (
    <div className='commentSection'>
        <div className="commenter">Comment as {currentUser.displayName}</div>

        <div className="commentBox">
            <textarea value={comment} onChange={(e) => {setComment(e.target.value)}} className='postTextarea' name="" id="commentBox" cols="30" rows="5"></textarea>
        </div>
        <div className="postSubmit">
            <button onClick={()=> {sendComment(collection)}} className='registerBtn'>Post</button>
        </div>
    </div>
  )
}

export default Comments