import React from 'react'

const Feed = () => {
  return (
    <div className='post'>
        <div className="postContainer">
            <div className="vote">
                <i class='bx bx-up-arrow-alt'></i>
                <span>12</span>
                <i class='bx bx-down-arrow-alt' ></i>   
            </div>
            <div className="postContent">
                <div className="postInfo">
                    <div className="poster">Posted by damian</div>
                    <div className="postedate">A year ago</div>
                </div>
                <div className="posts">
                    <div className="postText">
                        This is a Post Just to help me design the page
                    </div>
                    <div className="postImg">
                        <img className='postImage' src="./1.jpg" alt="A Post" />
                    </div>
                </div>
                <div className="commentBtn">
                    <i className='bx bxs-comment'></i>
                    <div className="commentHeading">7 Comments</div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Feed