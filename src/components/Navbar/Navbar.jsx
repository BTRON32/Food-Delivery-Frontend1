import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from "../../assets/assets"
import {Link, useNavigate} from "react-router-dom"
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu]=useState('home')
// logic so that when we are logged in, sign in button will be removed and we will get one profile icon
  const {getTotalCartAmount,token,setToken}=useContext(StoreContext)

  const navigate=useNavigate()
  
  const logout=()=>{//when we will click on logout we will execute this function
    localStorage.removeItem("token")//we have to remove the token from localstorage, provide key name which will be token
    setToken("")//from token state we will remove token
    navigate("/")//after user logs out we will send them to home page, pass path of home page
    toast.success("User logged out successfully!")
  }

  return (
    <div className='navbar'>
      {/* <img src={assets.logo} alt="" className="logo" /> */}
      <Link to="/"><h1 style={{color:'tomato', cursor:"pointer",fontSize:"35px"}} className='logo'>Grub Hub</h1></Link>
      <ul className="navbar-menu">
      {/* when we are in cart page and we click on the logo, we will open the home page */}
        <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href="#footer" onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img style={{cursor:"pointer"}} src={assets.search_icon} alt="" />
        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} /> */}
        <div className="navbar-search-icon">
        {/* link route with basket icon, when we will open the icon, it will open the cart page */}
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          {/* using getTotalCartAmount, if cartamount is 0 then dot will be hidden, else dot will be visible */}
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {/* if we click on the button, we will link this function with sign in button */}
         {/* logic so that when we are logged in, sign in button will be removed and we will get one profile icon */}
        {!token? <button onClick={()=>setShowLogin(true)}>sign in</button>:<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
          {/* navigate to myorders page */}
            <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>}
       
      </div>
    </div>
  )
}

export default Navbar
