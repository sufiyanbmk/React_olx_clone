import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import {useHistory} from 'react-router-dom'
import './Signup.css';
import {useForm } from "react-hook-form"

export default function Signup() {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('');
  const [phone ,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const {Firebase} = useContext(FirebaseContext)
  let history = useHistory();
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(email.length > 0 && password.length >6 && phone.length > 9 && username.length > 0){
    Firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username})
      Firebase.firestore().collection('users').add({
        id:result.user.uid,
        username:username,
        phone:phone
      }).then(()=>{
        history.push("/login")
      })
    }).catch((error)=>{
      alert(error.message)
    })
  }else{
    if(username.length <= 0){
      setErrors({
        errorusername : 'username name is required'
      })
    }
    else if(email.length <= 0){
      setErrors({
        erroremail : 'email is required'
      })
    }
    else if(password.length <= 5){
      setErrors({
        errorpassword : 'password is required'
      })
    }
  }
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange = {(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <p style={{color:"red"}}> {errors.errorusername} </p>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
            />
          <br />
          <p style={{color:"red"}}> {errors.erroremail} </p>
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange ={(e) => setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange = {(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <p style={{color:"red"}}> {errors.errorpassword} </p>
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{
          history.push('/login')
        }}>Login</a>
      </div>
    </div>
  );
}
