import { Timestamp, arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../Firebase';
import { useParams } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { v4 as uuid } from 'uuid';

const CommentFeed = () => {
    const {id} = useParams();
    const [comments, setComments] = useState([{}]);
    const {currentUser} = useContext(UserContext);
    const [replies, setReplies] = useState("");
    const [showReplies, setShowReplies] = useState();

    const showReply = (replyId) => (e) => {   
         onSnapshot(doc(db,"replies", replyId), (doc)=>{
             doc.exists() && setShowReplies(Object.keys(doc.data()).map((key) => doc.data()[key]));
             console.log(showReplies);
         });
    };

    const like = async (comId) => {
        let commentId = comId;
        try{
             const docu = await getDoc(doc(db, "comments", id));
             console.log(docu.data()[comId]);
             let obj = docu.data()[comId].likes.find((x) => x.useId === currentUser.uid);

             if(!obj){
                 await updateDoc(doc(db, "comments", id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayUnion({
                            useId: currentUser.uid,
                            displayName: currentUser.displayName,
                            likes: "yes"
                        }),
                        likeCount: docu.data()[comId].likeCount +1,
                        date: docu.data()[comId].date
                    }
                 });
             } else if(obj && obj.likes === "no"){
                await updateDoc(doc(db, 'comments', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayRemove(obj),
                        likeCount: docu.data()[comId].likeCount,
                        date: docu.data()[comId].date
                    }                   
                });

                 await updateDoc(doc(db, 'comments', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayUnion({
                            useId: currentUser.uid,
                            displayName: currentUser.displayName,
                            likes: "yes"
                        }),
                        likeCount: docu.data()[comId].likeCount +2,
                        date: docu.data()[comId].date
                    }                   
                });
             } else if(obj && obj.likes === "yes") {
                return updateDoc(doc(db, 'comments', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayRemove(obj),
                        likeCount: docu.data()[comId].likeCount -1,
                        date: docu.data()[comId].date
                    }                  
                });
             }
        }catch(err){

        };
    };

    const dislike = async (comId) => {
        let commentId = comId;
        try{
             const docu = await getDoc(doc(db, "comments", id));
             console.log(docu.data()[comId]);
             let obj = docu.data()[comId].likes.find((x) => x.useId === currentUser.uid);
             
             if(!obj){
                 await updateDoc(doc(db, "comments", id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayUnion({
                            useId: currentUser.uid,
                            displayName: currentUser.displayName,
                            likes: "no"
                        }),
                        likeCount: docu.data()[comId].likeCount -1,
                        date: docu.data()[comId].date
                    }
                 });
             } else if(obj && obj.likes === "yes"){
                await updateDoc(doc(db, 'comments', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayRemove(obj),
                        likeCount: docu.data()[comId].likeCount,
                        date: docu.data()[comId].date
                    }                   
                });

                 await updateDoc(doc(db, 'comments', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayUnion({
                            useId: currentUser.uid,
                            displayName: currentUser.displayName,
                            likes: "no"
                        }),
                        likeCount: docu.data()[comId].likeCount -2,
                        date: docu.data()[comId].date
                    }                   
                });
             } else if(obj && obj.likes === "no") {
                return updateDoc(doc(db, 'comments', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayRemove(obj),
                        likeCount: docu.data()[comId].likeCount +1,
                        date: docu.data()[comId].date
                    }                  
                });
             }
        }catch(err){

        };
    };

    const showReplyBox = (replyId) => {
        let remove = replyId;
        const replyBox = document.querySelectorAll(".commentSection");
        replyBox.forEach((btn) => {
            console.log(remove)
         if(btn.classList.contains("hidden") && btn.classList.contains(remove)){
             btn.classList.remove("hidden");
         } else if(!btn.classList.contains("hidden") && btn.classList.contains(remove)){
             btn.classList.add("hidden");
         };
        });     
    };

    const reply = async (replyId) => {
        const replyBox = document.getElementById("replyBox");
        const ids = currentUser.uid + uuid();

        await updateDoc(doc(db, 'replies', replyId), {
                [ids]: {
                commentId: ids,
                commenter: currentUser.uid,
                displayName: currentUser.displayName,
                replyTo: replyId,
                comment: replies,
                likes: [],
                likeCount: 0,
                date: Timestamp.now()}
            },
        )
        replyBox.classList.add("hidden");
        setReplies("");
    };

    useEffect(() => {
         const unSub = onSnapshot(doc(db,"comments", id), (doc)=>{

             doc.exists() && setComments(Object.keys(doc.data()).map((key) => doc.data()[key]));
           })

           return() => {
             unSub();
           };
    },[]);

  return (   
    <>  
          {comments.sort((a, b) => {return b.date - a.date}).map((obj) => {
            return (  
                <div className='container' key={obj.commentId} container-id ={obj.commentId}>
                    <div className="comment__container" id={obj.commentId}>
                        <div className="comment__card">
                            <div className='commenter'>{obj.displayName}</div>
                            <p>{obj.comment}</p>
                            <div className="comment__footer">
                                <div><i onClick={() => like(obj.commentId)} id='like' className='bx bx-up-arrow-alt'></i></div>
                                <div>{obj.likeCount}</div>
                                <div><i onClick={() => dislike(obj.commentId)} id='dislike' className='bx bx-down-arrow-alt' ></i></div>
                                <div onClick={() => showReplyBox(obj.commentId)} className='write-replies'>Reply</div>
                                <div onClick={showReply(obj.commentId)} className='show-replies'>Show Replies</div>
                                
                            </div>                          
                        </div>
                        {showReplies && showReplies.sort((a, b) => {return b.date - a.date}).map((rep) => {
                            return (
                                <div className="comment__container hidden" dataset={obj.commentId} id='first-reply'>
                                    <div className="comment__card">
                                        <div className='commenter'>{rep.displayName}</div>
                                        <p>{rep.comment}</p>
                                        <div className="comment__footer">
                                            <div><i onClick={() => like(obj.commentId)} id='like' className='bx bx-up-arrow-alt'></i></div>
                                            <div>{rep.likeCount}</div>
                                            <div><i onClick={() => dislike(obj.commentId)} id='dislike' className='bx bx-down-arrow-alt' ></i></div>
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                        <div id='replyBox' className={`commentSection hidden ${obj.commentId}`} reply-id ={obj.commentId}>
                            <div className="commenter">Comment as {currentUser.displayName}</div>

                                <div className="commentBox">
                                    <textarea value={replies} onChange={(e) => setReplies(e.target.value)} className='postTextarea' name="" id="commentBox" cols="30" rows="5"></textarea>
                                </div>
                                <div className="postSubmit">
                                    <button onClick={() => reply(obj.commentId)} className='registerBtn'>Post</button>
                                </div>
                        </div>
                    </div>
                </div>
             )
        })
    }  
             
        {/* <div className="comment__container" id='first-comment'>
            <div className="comment__card">
                <h3>The first comment</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div className="comment__footer">
                    <div>Likes</div>
                    <div>Dislikes</div>
                    <div className='show-replies'>Reply</div>
                </div>
            </div>
            <div className="comment__container" dataset="first-comment" id='first-reply'>
                <div className="comment__card">
                    <h3>The first Reply</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="comment__footer">
                        <div>Likes</div>
                        <div>Dislikes</div>
                        <div className='show-replies'>Reply</div>
                    </div>
                </div>
                
                <div className="comment__container" dataset="first-reply" id='first-first-reply'>
                <div className="comment__card">
                    <h3>The first Reply to the first reply</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="comment__footer">
                        <div>Likes</div>
                        <div>Dislikes</div>
                        <div className='show-replies'>Reply</div>
                    </div>
                </div>
                <div className="comment__container" dataset="first-first-reply" id='first-first-reply'>
                <div className="comment__card">
                    <h3>The first Reply to the first reply to the first reply</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="comment__footer">
                        <div>Likes</div>
                        <div>Dislikes</div>
                        <div className='show-replies'>Reply</div>
                    </div>
                </div>
            </div>
            </div>

            </div>
            <div className="comment__container" dataset="first-comment" id='first-reply'>
                <div className="comment__card">
                    <h3>The second reply</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="comment__footer">
                        <div>Likes</div>
                        <div>Dislikes</div>
                        <div className='show-replies'>Reply</div>
                    </div>
                </div>
            </div>
        </div> */}
    
    </>
  )
}

export default CommentFeed