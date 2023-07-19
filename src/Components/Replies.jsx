import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react'
import { db } from '../Firebase';
import { useParams } from 'react-router-dom';
import UserContext from '../Context/UserContext';

const Replies = (props) => {
    const {id} = useParams();
    const {currentUser} = useContext(UserContext);

    const like = async (comId) => {
        let commentId = comId;
        try{
             const docu = await getDoc(doc(db, "replies", id));
             console.log(docu.data()[comId]);
             let obj = docu.data()[comId].likes.find((x) => x.useId === currentUser.uid);

             if(!obj){
                 await updateDoc(doc(db, "replies", id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayUnion({
                            useId: currentUser.uid,
                            displayName: currentUser.displayName,
                            likes: "yes"
                        }),
                        likeCount: docu.data()[comId].likeCount +1,
                        date: docu.data()[comId].date
                    }
                 });
             } else if(obj && obj.likes === "no"){
                await updateDoc(doc(db, 'replies', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayRemove(obj),
                        likeCount: docu.data()[comId].likeCount,
                        date: docu.data()[comId].date
                    }                   
                });

                 await updateDoc(doc(db, 'replies', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayUnion({
                            useId: currentUser.uid,
                            displayName: currentUser.displayName,
                            likes: "yes"
                        }),
                        likeCount: docu.data()[comId].likeCount +2,
                        date: docu.data()[comId].date
                    }                   
                });
             } else if(obj && obj.likes === "yes") {
                return updateDoc(doc(db, 'replies', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayRemove(obj),
                        likeCount: docu.data()[comId].likeCount -1,
                        date: docu.data()[comId].date
                    }                  
                });
             }
        }catch(err){

        };
    };

    const dislike = async (comId) => {
        let commentId = comId;
        try{
             const docu = await getDoc(doc(db, "replies", id));
             console.log(docu.data()[comId]);
             let obj = docu.data()[comId].likes.find((x) => x.useId === currentUser.uid);
             
             if(!obj){
                 await updateDoc(doc(db, "replies", id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayUnion({
                            useId: currentUser.uid,
                            displayName: currentUser.displayName,
                            likes: "no"
                        }),
                        likeCount: docu.data()[comId].likeCount -1,
                        date: docu.data()[comId].date
                    }
                 });
             } else if(obj && obj.likes === "yes"){
                await updateDoc(doc(db, 'replies', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayRemove(obj),
                        likeCount: docu.data()[comId].likeCount,
                        date: docu.data()[comId].date
                    }                   
                });

                 await updateDoc(doc(db, 'replies', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayUnion({
                            useId: currentUser.uid,
                            displayName: currentUser.displayName,
                            likes: "no"
                        }),
                        likeCount: docu.data()[comId].likeCount -2,
                        date: docu.data()[comId].date
                    }                   
                });
             } else if(obj && obj.likes === "no") {
                return updateDoc(doc(db, 'replies', id), {
                    [commentId]:{
                        commentId: docu.data()[comId].commentId,
                        commenter: docu.data()[comId].commenter,
                        displayName: docu.data()[comId].displayName,
                        replyTo: docu.data()[comId].replyTo,
                        comment: docu.data()[comId].comment,
                        likes: arrayRemove(obj),
                        likeCount: docu.data()[comId].likeCount +1,
                        date: docu.data()[comId].date
                    }                  
                });
             }
        }catch(err){

        };
    };

  return (
    <div className={`comment__container2 ${props.rep.commentId}`} id='first-reply'>
        <div className="comment__card">
            <div className='commenter'>{props.rep.displayName}</div>
            <p>{props.rep.comment}</p>
                <div className="comment__footer">
                    <div><i onClick={() => like(props.rep.commentId)} id='like' className='bx bx-up-arrow-alt'></i></div>
                    <div>{props.rep.likeCount}</div>
                    <div><i onClick={() => dislike(props.rep.commentId)} id='dislike' className='bx bx-down-arrow-alt' ></i></div>
                                            
                </div>
        </div>
    </div>
  )
}

export default Replies