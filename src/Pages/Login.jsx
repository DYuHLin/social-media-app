import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [error, setError] = useState(false);

  return (
    <div className='login'>
      <div className="registerContainer">
        <div className="title">Login</div>
        <form className='registerForm'>
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