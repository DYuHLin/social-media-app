import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';
import { useParams } from 'react-router-dom';
import Comments from '../Components/Comments';
import CommentFeed from '../Components/CommentFeed';

const PostPage = () => {
    const {id} = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        onSnapshot(doc(db, 'posts', `${id}`), (doc) => {
            setPost(doc.data());           
        });
    },[]);
console.log(post)
  return (
    <div className="home">
        <div className='singlePage'>
            <Nav />
            <div className="feed">
            <div className='post'>
                    <div className="postContainer">
                        <div className="vote">
                            <i id='like' className='bx bx-up-arrow-alt'></i>
                            <span>{post.likeCount}</span>
                            <i id='dislike' className='bx bx-down-arrow-alt' ></i>   
                        </div>
                        <div className="postContent">
                            <div className="postInfo">
                                <div className="poster">Posted by {post.displayName}</div>
                                <div className="postedate">A year ago</div>
                            </div>
                            <div className="posts">
                                <div className="postText">
                                    {post.title}
                                </div>
                                {post.postImg !== "" && <div className="postImg">
                                    <img className='postImage' src={`${post.postImg}`} alt="A Post" />
                                </div> }
                                {post.postDec !== "" && <div className='postDesc'>{post.postDesc}</div>}
                            </div>
                            <div className="commentBtn">
                                <i className='bx bxs-comment'></i>
                                <div className="commentHeading">7 Comments</div>
                            </div>
                            <Comments collection = {id}/>
                            <CommentFeed />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostPage