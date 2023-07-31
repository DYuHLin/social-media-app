import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../Firebase';
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
  try{
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user post on firestore
            await setDoc(doc(db, "userPosts", res.user.uid), {});
            navigate("/");
          } catch (err) {
            setErr(true);
          }
        });
      });
    } catch(error){
      setErr(true);
    }
  };

  return (
    <div className='register'>
      <div className="registerContainer">
      <div className="logoContainer">
          <img className='logo' src="./logo.png" alt="logo" />
        </div>
        <div className="title">Register</div>
        <form onSubmit={handleSubmit} className='registerForm'>
        <input type='text' autoComplete='off' placeholder='Username'/>
            <input type='email' autoComplete='off' placeholder='email'/>
            <input type='password' autoComplete='off' placeholder='password'/>
            <input style={{display: 'none'}} type='file' autoComplete='off' id='file'/>
            <label htmlFor='file'>
            <i style={{fontSize: '32px'}} className='bx bx-image-add'></i>
            <span>Add an Avatar</span>
            </label>
            <div className='regisBtn'>
              <button className='registerBtn'>Sign Up</button>
            </div>
            {err && <span>There was an error</span>}
        </form>
        <p>Have an account? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register