import React, { useState ,useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import {FirebaseContext} from '../../store/Context'
import {useHistory} from 'react-router-dom'

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errors, setErrors] = useState({});
  const {Firebase} = useContext(FirebaseContext)
  let history = useHistory()
  const handleLogin = (e)=> {
    e.preventDefault()
    if(email.length > 0 && password.length > 5){
      Firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
        history.push('/')
      }).catch((error)=>{
        alert(error.message)
      })
   }else{
    if(email.length <= 0){

      setErrors({
        errorusername : 'username name is required'
      })
      alert("error")
    }
    else if(password.length <= 0){
      setErrors({
        errorpassword : 'password is required'
      })
    }
    else{
      setErrors({
        errorpassword : 'password have minimum 5'
      })
    }
   }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange = {(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <p style={{color:"red"}}> {errors.errorusername} </p>
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
          <button>Login</button>
        </form>
        <a onClick={() => {
          history.push('/signup')
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
