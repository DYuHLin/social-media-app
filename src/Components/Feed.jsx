import { arrayRemove, arrayUnion, collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../Firebase';
import UserContext from '../Context/UserContext';

const Feed = () => {
    const [posts, setPosts] = useState([{}]);
    const colRef = collection(db, 'posts');
    const {currentUser} = useContext(UserContext);

    const like = async (id, userId) => {       
        try{
            const docu = await getDoc(doc(db, "posts", id));
            console.log(docu.data().likes);
            let obj = docu.data().likes.find((x) => x.useId === userId);
            if(!docu.data().likes.find((x) => x.useId === userId)){
                return updateDoc(doc(db, 'posts', id), {
                    likes: arrayUnion({
                        useId: currentUser.uid,
                        displayName: currentUser.displayName,
                        likes: "yes"
                    }),
                    likeCount: docu.data().likeCount +1
                });
            } else if(obj && obj.likes === "no"){
                await updateDoc(doc(db, 'posts', id), {
                    likes: arrayRemove(obj)
                });

                 await updateDoc(doc(db, 'posts', id), {
                    likes: arrayUnion({
                        useId: currentUser.uid,
                        displayName: currentUser.displayName,
                        likes: "yes"
                    }),
                    likeCount: docu.data().likeCount +2
                });
            }else{               
                return updateDoc(doc(db, 'posts', id), {
                    likes: arrayRemove(obj),
                    likeCount: docu.data().likeCount -1
                });
            }; 
             
           } catch(err){
             console.log(err);
           }; 
    };

    const dislike = async (id, userId) => {
        try{
            const docu = await getDoc(doc(db, "posts", id));
            console.log(docu.data().likes);
            let obj = docu.data().likes.find((x) => x.useId === userId);

            if(!docu.data().likes.find((x) => x.useId === userId)){
                return updateDoc(doc(db, 'posts', id), {
                    likes: arrayUnion({
                        useId: currentUser.uid,
                        displayName: currentUser.displayName,
                        likes: "no"
                    }),
                    likeCount: docu.data().likeCount -1
                });
            } else if(obj && obj.likes === "yes"){
                await updateDoc(doc(db, 'posts', id), {
                    likes: arrayRemove(obj),
                    likeCount: docu.data().likeCount -1
                });

                await updateDoc(doc(db, 'posts', id), {
                    likes: arrayUnion({
                        useId: currentUser.uid,
                        displayName: currentUser.displayName,
                        likes: "no"
                    }),
                    likeCount: docu.data().likeCount -2
                });
            }else{                
                return updateDoc(doc(db, 'posts', id), {
                    likes: arrayRemove(obj),
                    likeCount: docu.data().likeCount +1
                });
            }; 
             
           } catch(err){
             console.log(err);
           };           
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
                            <i onClick={() => like(obj.idPost, currentUser.uid)} className='bx bx-up-arrow-alt'></i>
                            <span>{obj.likeCount}</span>
                            <i onClick={() => dislike(obj.idPost, currentUser.uid)} className='bx bx-down-arrow-alt' ></i>   
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