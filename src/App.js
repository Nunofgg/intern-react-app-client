import './App.css';
import axios from 'axios';
import {useState, useEffect} from "react";
import Login from './components/authentication/Login';
import { Route, Routes } from "react-router-dom";
import Signup from './components/authentication/Signup';
import Home from './components/home/Home';
import ListPosts from './components/listPosts/ListPosts';
import NavBar from './components/navbar/NavBar';
import EditPostCard from './components/postCard/EditPostCard';
import { LoggedUserConsumer, LoggedUserProvider } from './context/loggedUser';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AddPosts from './components/postCard/AddPosts';


function App() {
  const [loggedInUser, setCurrentLoggedInUser] = useState("");

  useEffect(() => {
    async function checkLoggedIn() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/loggedin`
      );
      if (response.data) {
        setCurrentLoggedInUser(response.data);
        console.log(response.data);
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <LoggedUserProvider value={loggedInUser}/>
      <NavBar loggedInUser={loggedInUser}
          setCurrentLoggedInUser={setCurrentLoggedInUser}
          />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/login' element={<Login setCurrentLoggedInUser={setCurrentLoggedInUser}/>} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/posts' element={<ListPosts loggedInUser={loggedInUser}/>} />
          <Route exact path='/post-edit' element={<EditPostCard />} />
          <Route exact path='/add-post' element={<AddPosts />} />
        </Routes>
    </div>
  );
}

export default App;
