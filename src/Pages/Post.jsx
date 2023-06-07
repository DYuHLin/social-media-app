import React from 'react'
import Nav from '../Components/Nav'

const Post = () => {
  return (
    <div className='postPage'>
        <Nav />

        <div className="postContainer">
          <div className="postComponent">
            <div className="Posttitle">Create Post</div>
            <div className="createPosts">
              <div className="switchTypes">
                <div className="postLink active">Post</div>
                <div className="postLink">Image or Video</div>
                <div className="postLink">Link</div>
              </div>

              <div className="postInputs">
                <input className='postText' type="text" autoComplete='off' placeholder='Title'/>  
                <textarea className='postTextarea' name="" id="" cols="30" rows="10" placeholder='Text'></textarea>   
              </div>
              
              <div className="postSubmit">
                <button className='loginBtn'>Cancel</button>
                <button className='registerBtn'>Post</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Post