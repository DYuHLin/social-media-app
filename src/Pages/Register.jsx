import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [error, setError] = useState(false);
  return (
    <div className='register'>
      <div className="registerContainer">
        <div className="title">Register</div>
        <form className='registerForm'>
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
            {error && <span>There was an error</span>}
        </form>
        <p>Have an account? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register