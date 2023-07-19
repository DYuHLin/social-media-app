import React, { useContext, useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { useParams } from 'react-router-dom';
import Comments from '../Components/Comments';
import CommentFeed from '../Components/CommentFeed';
import UserContext from '../Context/UserContext';

const PostPage = () => {
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const {currentUser} = useContext(UserContext);

    const like = async (id, userId) => {           
        try{
            const docu = await getDoc(doc(db, "posts", id));
            // console.log(docu.data().likes);
            let obj = docu.data().likes.find((x) => x.useId === userId);
            highLight();
            if(!docu.data().likes.find((x) => x.useId === userId)){;
                // highLight(); 
                return updateDoc(doc(db, 'posts', id), {
                    likes: arrayUnion({
                        useId: currentUser.uid,
                        displayName: currentUser.displayName,
                        likes: "yes"
                    }),
                    likeCount: docu.data().likeCount +1
                });
            } else if(obj && obj.likes === "no"){
                // highLight(); 
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

    const highLight = () => {
        const sub = onSnapshot(doc(db, 'posts', `${id}`), (doc) => {
            setPost(doc.data()); 
            const like = document.getElementById("post-like");
            const dislike = document.getElementById("post-dislike");
            like.classList.remove("like");
            dislike.classList.remove("dislike");
                 for(let i = 0; i < doc.data().likes.length; i++){
                      if(doc.data().likes[i].useId === currentUser.uid && 
                      doc.data().likes[i].likes === "yes"){
                        like.classList.add("like");
                        dislike.classList.remove("dislike");
                      } else if(doc.data().likes[i].useId === currentUser.uid && 
                      doc.data().likes[i].likes === "no"){
                          like.classList.remove("like");
                          dislike.classList.add("dislike");
                      }
                  };

        });

        return() => {
            sub();
        };
    };
highLight()
    const dislike = async (id, userId) => {
        try{
            const docu = await getDoc(doc(db, "posts", id));
            // console.log(docu.data().likes);
            let obj = docu.data().likes.find((x) => x.useId === userId);

            highLight();
            if(!docu.data().likes.find((x) => x.useId === userId)){
                // highLight(); 
                return updateDoc(doc(db, 'posts', id), {
                    likes: arrayUnion({
                        useId: currentUser.uid,
                        displayName: currentUser.displayName,
                        likes: "no"
                    }),
                    likeCount: docu.data().likeCount -1
                });
            } else if(obj && obj.likes === "yes"){
                // highLight(); 
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
        const unSub = onSnapshot(doc(db,"comments", id), (doc)=>{

            doc.exists() && setComments(Object.keys(doc.data()).map((key) => doc.data()[key]));
          })

        const sub = onSnapshot(doc(db, 'posts', `${id}`), (doc) => {
            setPost(doc.data()); 
        });

        return() => {
            unSub();
            sub();     
            highLight();            
          };

    },[]);

  return (
    <div className="home">
        <div className='singlePage'>
            <Nav />
            <div className="feed">
            <div className='post1'>
                    <div className="postContainer">
                        <div className="vote">
                            <i className='bx bx-up-arrow-alt' onClick={() => like(post.idPost, currentUser.uid)} id='post-like'></i>
                            <span>{post.likeCount}</span>
                            <i className='bx bx-down-arrow-alt' onClick={() => dislike(post.idPost, currentUser.uid)} id='post-dislike'></i>   
                        </div>
                        <div className="postContent">
                            <div className="postInfo">
                                <div className="poster">Posted by {post.displayName}</div>
                                <div className="postedate">{}</div>
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
                                <div className="commentHeading">{comments.length} Comments</div>
                            </div>
                            <Comments />
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