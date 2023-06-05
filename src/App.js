import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import "./style/style.css";

function App() {
  return (
    <Router>
      <div className="App"> 
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
          <div className='content'>
            <Routes>
              <Route path='/' element = {<Home />}/>
              <Route path='/register' element = {<Register />}/>
              <Route path='/login' element = {<Login />}/>
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
