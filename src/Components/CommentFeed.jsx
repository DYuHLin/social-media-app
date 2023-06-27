import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { useParams } from 'react-router-dom';

const CommentFeed = () => {
    const {id} = useParams();
    const [comments, setComments] = useState([{}]);
    const showReplies = () => {
        const replyBtn = document.querySelectorAll('.show-replies');
    
        // replyBtn.forEach(btn => btn.addEventListener('click', (e) => {
    
        // }));
    };

    useEffect(() => {
        const unSub = onSnapshot(doc(db,"comments", id), (doc)=>{
            doc.exists() && setComments(doc.data().comments)
          })

          return() => {
            unSub();
          };
    },[]);

  return (   
    <>  
        {comments.map((obj) => {
            return ( 
                <div className='container'>
                    <div className="comment__container">
                        <div className="comment__card">
                            <div className='commenter'>{obj.displayName}</div>
                            <p>{obj.comment}</p>
                            <div className="comment__footer">
                                <div><i id='like' className='bx bx-up-arrow-alt'></i></div>
                                <div>{obj.likeCount}</div>
                                <div><i id='dislike' className='bx bx-down-arrow-alt' ></i></div>
                                <div className='show-replies'>Replies</div>
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