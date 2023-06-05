import React from 'react'

const Nav = () => {
  return (
    <div className='head'>
        <div className="logo">Lin Share</div>

        <div className="search">
            <input className='textSearch' type="text" autoComplete='off' placeholder='Search'/>
        </div>

        <div className="profile">
        <i className='bx bxs-user'></i>
        </div>
    </div>
  )
}

export default Nav