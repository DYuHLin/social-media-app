import React from 'react'

const showReplies = () => {
    const replyBtn = document.querySelectorAll('.show-replies');

    // replyBtn.forEach(btn => btn.addEventListener('click', (e) => {

    // }));
};

const CommentFeed = () => {
  return (
    <div className='container'>
        <div className="comment__container" id='first-comment'>
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
        </div>
    </div>
  )
}

export default CommentFeed