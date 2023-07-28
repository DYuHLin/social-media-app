import { arrayRemove, arrayUnion, collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../Firebase';
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Feed = (props) => {
    const [posts, setPosts] = useState([{}]);
    const colRef = collection(db, 'posts');
    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate();

    const like = async (id, userId) => {           
        try{
            const docu = await getDoc(doc(db, "posts", id));
            console.log(docu.data().likes);
            let obj = docu.data().likes.find((x) => x.useId === userId);
            if(!docu.data().likes.find((x) => x.useId === userId)){;
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
        {posts && posts.sort((a, b) => {
        if(props.new === true){
            return b.date - a.date;
        } else if(props.old === true){
            return a.date - b.date;
        } else if(props.best === true){
            return b.likeCount - a.likeCount;
        };
    }).map((obj) => {
            return (
                <div className='post' key={obj.idPost}>
                    <div className="postContainer">
                        <div className="vote">
                            <i id='like' onClick={() => like(obj.idPost, currentUser.uid)} className='bx bx-up-arrow-alt'></i>
                            <span>{obj.likeCount}</span>
                            <i id='dislike' onClick={() => dislike(obj.idPost, currentUser.uid)} className='bx bx-down-arrow-alt' ></i>   
                        </div>
                        <div className="postContent" onClick={() => navigate(`/${obj.idPost}`)}>
                            <div className="postInfo">
                                <div className='postNameDate'>
                                    <div className="poster">Posted by {obj.displayName}</div>
                                    <div className="postedate">{obj.date && moment(obj.date.toDate()).fromNow()}</div>
                                </div>                    
                            </div>
                            
                            <div className="posts">
                                <div className="postText">
                                    {obj.title}
                                </div>
                                {obj.postImg !== "" && <div className="postImg">
                                    <img className='postImage' src={`${obj.postImg}`} alt="A Post" />
                                </div> }
                                 {obj.postVid !== "" && <div className="postImg">
                                 <video className='postVid' src={obj.postVid} controls autoPlay muted></video>
                                </div> } 
                                {obj.links !== "" && <div className="postLinked">
                                    <div className="wLink">
                                        <a href={obj.links}>{obj.links}</a>
                                    </div>
                                    <a href={obj.links}>
                                        <div className="linkBox">
                                            <div className="linkMiddle">
                                                <i class='bx bx-link'></i>
                                            </div>                                     
                                            <div className="linkBtm">
                                                <div className="linkBx">
                                                    <i class='bx bx-link-external'></i>
                                                </div>
                                            </div>
                                        </div>
                                    </a>                                  
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