import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const [showLogin,setShowLogin]=useState(false)

  return (
    <>
    {/* we want to display this on top, if showLogin is true, we have to display component, if false we will return <></> */}
    {/* to use setShowLogin function in the LoginPopup component, pass it as a prop and destructure it in the loginpopup component */}
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div className='app'>
      {/* passing the props setShowLogin which is destructured in Navbar component */}
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
        {/* whenever we will open / path we will get Home page */}
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path='myorders' element={<MyOrders />} />
        </Routes>
      </div>
       <ToastContainer />
      <Footer />
    </>
  )
}

export default App