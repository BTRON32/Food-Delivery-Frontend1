import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"//we need axios support in frontend
import { toast } from 'react-toastify'
// import toast from "react-toastify"


const LoginPopup = ({setShowLogin}) => {

  const {url,setToken}=useContext(StoreContext)//fetch url using context api

  const [currentState,setCurrentState]=useState("Login")
  const [data,setData]=useState({//state variable where we will save users name, email and password
    name:"",
    email:"",
    password:""
  })

  // take data from input field and save it in state variable

  const onChangeHandler=(event)=>{
    const name=event.target.name//we will extract name and value from above event 
    const value=event.target.value
    setData(data=>({...data,[name]:value}))//set value in state variable, here we will pass prev data and in prev data we will change name field and we will update it with updated value
  }

  // useEffect(()=>{
  //   console.log(data);
    
  // },[data])//whenever data is updated, this function is executed

  const onLogin=async (event)=>{
    event.preventDefault()
    // api call in onlogin function
    let newUrl=url//create one instance of this url
    if(currentState==="Login"){//if our current state is login
      newUrl+="/api/user/login"//in new url we will append login api, newurl will be login api
    }
    else{
      newUrl+="/api/user/register"//in new url we will append register api
    }

    const response=await axios.post(newUrl,data)//to call api, call newUrl and we will set data state, this api will work in both login and register depending on state

    if (response.data.success) {//we will  get one response
      setToken(response.data.token)//it means we are logged in/register, we will get one tokem, to save token we will use state variable, token from context api, we will save token using setToken function
      localStorage.setItem("token",response.data.token)//we will store token in local storage, key name is token and in value we will add res.data.token, after this we will be successfully logged in  
      setShowLogin(false)//it will hide login page
      toast.success("Logged in successfully!")
    }
    else{//when response data.success will be false
      
      alert(response.data.message)
    }
    
  }

  return (
    <div className='login-popup'>
    {/* link function with form tag */}
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
        {/* to display login or signup state */}
          <h2>{currentState}</h2>
          {/* when we click on the below button, it will close the popup */}
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
        {/* if currentState is login, return <></>, if currentState is not login, in that case we will provide the input field of your name */}
        {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
        {/* will display the below 2 fields in both login and signup popups */}
        {/* link onchange handler with input fields */}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        {/* if currentState is signup, then we will return a string, create account, if state is not signup i.e., Login, we will add a string Login */}
        <button type='submit'>{currentState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        
        {/* if currentState is same as login, in that case we will provide the first paragraph, else we will provide the 2nd paragraph */}
        {/* in these span tag, we will provide onclick property and we will pass an arrow function of setCurrectState to signup in 1st and login in 2nd */}
        {currentState==="Login"?<p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
        : <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup