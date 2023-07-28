import React, { useContext, useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../Components/Comments';
import CommentFeed from '../Components/CommentFeed';
import UserContext from '../Context/UserContext';
import moment from 'moment';

const PostPage = () => {
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const {currentUser} = useContext(UserContext);
    const [news, setNews] = useState(true);
    const [old, setOld] = useState(false);
    const [best, setBest] = useState(false);
    const navigate = useNavigate();

    const switchCommentFilter = (choice) => {
        const options = document.getElementById("filterOptionList");
        const optionsName = document.getElementById("filterName");
        if(choice === "top"){
            setBest(true);
            setNews(false);
            setOld(false);
            optionsName.innerHTML = "Top";
        } else if(choice === "new"){  
          setBest(false);
          setNews(true);
          setOld(false);
          optionsName.innerHTML = "New";
        } else if(choice === "old"){
          setBest(false);
          setNews(false);
          setOld(true);
          optionsName.innerHTML = "Old";
        }

        options.classList.add("hidden");
      };

    const like = async (id, userId) => {           
        try{
            const docu = await getDoc(doc(db, "posts", id));
             console.log(post);
            let obj = docu.data().likes.find((x) => x.useId === userId);
            highLight();
            conversion()
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

    const conversion = () => {
        const date = new Date(null)
        date.setTime(256000000 * 1000)
        console.log(date.toLocaleString())
    }

    const highLight = () => {
        // const sub = onSnapshot(doc(db, 'posts', `${id}`), (doc) => {
        //     setPost(doc.data()); 
        //     const like = document.getElementById("post-like");
        //     const dislike = document.getElementById("post-dislike");
        //     like.classList.remove("like");
        //     dislike.classList.remove("dislike");
        //          for(let i = 0; i < doc.data().likes.length; i++){
        //               if(doc.data().likes[i].useId === currentUser.uid && 
        //               doc.data().likes[i].likes === "yes"){
        //                 like.classList.add("like");
        //                 dislike.classList.remove("dislike");
        //               } else if(doc.data().likes[i].useId === currentUser.uid && 
        //               doc.data().likes[i].likes === "no"){
        //                   like.classList.remove("like");
        //                   dislike.classList.add("dislike");
        //               }
        //           };

        // });

        // return() => {
        //     sub();
        // };
    };

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

    const optionMenu = () => {
        const options = document.getElementById("filterOptionList");
        if(options.classList.contains("hidden")){
          options.classList.remove("hidden");
        } else {
          options.classList.add("hidden");
        };
      };

      const deleteMenu = () => {
        const deleteMnu = document.getElementById("deleteList");
        if(deleteMnu.classList.contains("hidden")){
            deleteMnu.classList.remove("hidden");
        } else {
            deleteMnu.classList.add("hidden");
        };
      };

      const deletePost = (delId) => {
        const dltDcu = doc(db, "posts", delId);

        deleteDoc(dltDcu);
        navigate("/");
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
                                <div className='postNameDate'>
                                    <div className="poster">Posted by {post.displayName}</div>
                                    <div className="postedate">{post.date && moment(post.date.toDate()).fromNow()}</div>
                                </div>
                                {currentUser.uid === post.postUid &&<div> <i onClick={deleteMenu} class='bx bx-trash'></i>
                                <div id='deleteList' className="profileList hidden">
                                    <ul className='deleteOptions'>
                                        <li onClick={() => {deletePost(post.idPost)}}><div className="optionUser">Delete Post</div></li>
                                    </ul>
                                    </div>
                                </div>
                                }  
                            </div>
                            <div className="posts">
                                <div className="postText">
                                    {post.title}
                                </div>
                                {post.postImg !== "" && <div className="postImg">
                                    <img className='postImage' src={`${post.postImg}`} alt="A Post" />
                                </div> }
                                {post.postDec !== "" && <div className='postDesc'>{post.postDesc}</div>}
                                {post.postVid !== "" && <div className="postImg">
                                 <video className='postVid' src={post.postVid} controls autoPlay muted></video>
                                </div> } 
                                {post.links !== "" && <div className="postLinked">
                                    <div className="wLink">
                                        <a href={post.links}>{post.links}</a>
                                    </div>
                                    <a href={post.links}>
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
                                <div className="commentHeading">{comments.length} Comments</div>
                            </div>
                            <Comments />
                            <div className="filterComments">
                                <p>Sort By </p>
                                <div className="filters">
                                    <div className="filterBtn" onClick={optionMenu}>

                                       <p id='filterName'>New</p> <i class='bx bx-chevron-down'></i>
                                        </div>
                                    <div id='filterOptionList' className="filterOptionList hidden">
                                        <ul className="filterOptions">
                                            <li onClick={() => switchCommentFilter("new")}><div className="optionText">New</div></li>
                                            <li onClick={() => switchCommentFilter("old")}><div className="optionText">Old</div></li>
                                            <li onClick={() => switchCommentFilter("top")}><div className="optionText">Top</div></li>
                                        </ul>
                                    </div>
                                </div>
                                
                            </div>
                            <CommentFeed new = {news} old = {old} top = {best}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostPage