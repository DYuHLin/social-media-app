import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Post from './Pages/Post';
import "./style/style.css";
import UserContext from './Context/UserContext';

function App() {
  const {currentUser} = useContext(UserContext);

  console.log(currentUser);

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to= "/login"/>
    };

    return children;
  };
  return (
    <Router>
      <div className="App"> 
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
          <div className='content'>
            <Routes>
              <Route path='/' element = {<ProtectedRoute><Home /></ProtectedRoute>}/>
              <Route path='/register' element = {<Register />}/>
              <Route path='/login' element = {<Login />}/>
              <Route path='/post' element = {<Post />}/>
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
