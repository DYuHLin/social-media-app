import { arrayRemove, arrayUnion, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../Firebase';
import UserContext from '../Context/UserContext';

const Feed = () => {
    const [posts, setPosts] = useState([{}]);
    const colRef = collection(db, 'posts');
    const {currentUser} = useContext(UserContext);

    const like = (id) => {
        onSnapshot(doc(db, "posts", id), async (docs) => {
            console.log(docs.data().likes);
            if(!docs.data().likes.useId){
            await updateDoc(doc(db, 'posts', id), {
                 likes: arrayUnion({
                     useId: currentUser.uid,
                     displayName: currentUser.displayName,
                     likes: "yes"
                 })
            });
            } else if (docs.data().likes.useId && docs.data().likes.likes === "no") {
                console.log("here")
                await updateDoc(doc(db, 'posts', id), {
                    likes: arrayRemove(docs)
               });
            }
         });   
    };

    const dislike = (id) => {
         onSnapshot(doc(db, "posts", id), async (docs) => {
            console.log(docs.data().likes);
            if(!docs.data().likes.useId){
            await updateDoc(doc(db, 'posts', id), {
                 likes: arrayUnion({
                     useId: currentUser.uid,
                     displayName: currentUser.displayName,
                     likes: "no"
                 })
            });
            } else if (docs.data().likes.useId) {
                console.log("here")
            }
         });           
    };

    useEffect(() => {
        onSnapshot(colRef, (snapshot) => {
            let post = [];
            snapshot.docs.map((doc) => {
                post.push({...doc.data()});
                setPosts(post);
            });
        });
    },[]);

  return (
    <>
        {posts.sort((a, b) => {return b.date - a.date}).map((obj) => {
            return (
                <div className='post' key={obj.idPost}>
                    <div className="postContainer">
                        <div className="vote">
                            <i onClick={() => like(obj.idPost)} className='bx bx-up-arrow-alt like'></i>
                            <span>12</span>
                            <i onClick={() => dislike(obj.idPost)} className='bx bx-down-arrow-alt' ></i>   
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