import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const loginFunction = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch(error){
      setError(true);
    };
  };

  return (
    <div className='login'>
      <div className="registerContainer">
        <div className="title">Login</div>
        <form onSubmit={loginFunction} className='registerForm'>
            <input type='email' autoComplete='off' placeholder='email'/>
            <input type='password' autoComplete='off' placeholder='password'/>
            <div className='regisBtn'>
              <button className='loginBtn'>Sign In</button>
            </div>
            {error && <span>There was an error</span>}
        </form>
        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login