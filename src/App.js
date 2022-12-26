import React,{useEffect,useContext} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import  SignupPage from './Pages/Signup'
import Login from './Pages/Login'
import './App.css';
import Create from './Pages/Create'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';

function App() {
  const {setUser} = useContext(AuthContext)
  const {Firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    const auth = Firebase.auth();
    console.log(auth)
    auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
  })
  return (
    <div>
      <Router>
        <Route exact path= '/'>
         <Home />
        </Route>

        <Route path= '/signup'>
         <SignupPage />
        </Route>

        <Route path= '/login'>
         <Login />
        </Route>

        <Route path= '/create'>
         <Create />
        </Route>

      </Router>
    </div>
  );
}

export default App;
