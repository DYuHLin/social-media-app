import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext';
import { v4 as uuid } from 'uuid';
import { Timestamp, arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { useParams } from 'react-router-dom';

const Comments = () => {
const {id} = useParams();
const stringId = id.toString();
const {currentUser} = useContext(UserContext);
const [comment, setComment] = useState("");

const sendComment = async (postId) => {
  const ids = currentUser.uid + uuid();

      await updateDoc(doc(db, 'comments', postId), {
            [ids]: {
            commentId: ids,
            commenter: currentUser.uid,
            displayName: currentUser.displayName,
            replyTo: postId,
            comment: comment,
            replies: [],
            likes: [],
            likeCount: 0,
            date: Timestamp.now()}
        },
      );

     setComment("");
};

  return (
    <div className='commentSection'>
        <div className="commenter">Comment as {currentUser.displayName}</div>

        <div className="commentBox">
            <textarea value={comment} onChange={(e) => {setComment(e.target.value)}} className='postTextarea' name="" id="commentBox" cols="30" rows="5"></textarea>
        </div>
        <div className="postSubmit">
            <button onClick={()=> sendComment(stringId)} className='registerBtn'>Post</button>
        </div>
    </div>
  )
}

export default Comments