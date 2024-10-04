
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import {Navigate} from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import  { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
import AddPost from './pages/AddPost';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
   
    <div className="App">

       <ToastContainer />
       <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
       <Routes>
       <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>}/>
        <Route path="addpost" element={<AddPost/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
