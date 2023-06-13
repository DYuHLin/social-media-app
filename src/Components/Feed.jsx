import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';

const Feed = () => {
    const [posts, setPosts] = useState([{}]);
    const colRef = collection(db, 'posts');

    useEffect(() => {
        onSnapshot(colRef, (snapshot) => {
            let post = [];
            snapshot.docs.forEach((doc) => {
                post.push({...doc.data()});
                setPosts(post);
            });
        });
    },[]);

  return (
    <>
        {posts.sort((a, b) => {return b.date - a.date}).map((obj) => {
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
                                <div className="poster">Posted by {obj.displayName}</div>
                                <div className="postedate">A year ago</div>
                            </div>
                            <div className="posts">
                                <div className="postText">
                                    {obj.title}
                                </div>
                                {obj.postImg !== "" && <div className="postImg">
                                    <img className='postImage' src={`${obj.postImg}`} alt="A Post" />
                                </div> }
                            </div>
                            <div className="commentBtn">
                                <i className='bx bxs-comment'></i>
                                <div className="commentHeading">7 Comments</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
    
    </>
  )
}

export default Feed