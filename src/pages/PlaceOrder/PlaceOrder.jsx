import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {//to get address details of the user

  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)//from context take the following

  const [data,setData]=useState({//create state where we will store info from form fields
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""

  })//in data state we are getting all data from input fields




  const onChangeHandler=(event)=>{//using this we will save the input field data in state variable
    const name=event.target.name//using that event, we will extract the name and value
    const value=event.target.value
    setData(data=>({...data,[name]:value}))//call setData and pass prev data and change prev data and change name field and update it with latest value we will get from event 
  }

  const placeOrder=async(event)=>{//using this we will be redirected to payment gateway 
    event.preventDefault()//to prevent reloading of webpage whenever we submit the form
    let orderItems=[]//structure all order data as we have created in api, here we will add cartitem related data
    food_list.map((item)=>{//pass individual item, here we are mapping all item data with quantity in orderitems array
      if(cartItems[item._id]>0){//check if cart items have product with item id
        let itemInfo=item//this item is in object, in this object we will add one property called quantity
        itemInfo["quantity"]=cartItems[item._id]//using that in this item._id we will get all quantity in this iteminfo [quantity] property 
        orderItems.push(itemInfo) 
      }
    })
    // check if order mapping is working fine or not using a console.log(orderItems)
    let orderData={//generating order data
      address:data,//in this we will add address that will be data(data state variable)
      items:orderItems,//in items, we will provide orderItems where we are adding data using this mapping
      amount:getTotalCartAmount()+2,//amount : add 2 delivery fee
    }//send order data to api
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}})//url(backend) and concat the endpoint and set orderData that we have created with address data, items and total amount and add headers with object and store token
    if (response.data.success) {//if response is true, we will get one session url
      const {session_url}=response.data
      window.location.replace(session_url)//send user on session url, provide session url here
    }
    else{
      alert("Error")
    }
    
  }

  // useEffect(()=>{
  //   console.log(data);
    
  // },[data])//whenever the data state is updated it will execute this function

  const navigate=useNavigate()

  // add logic so that when we click on logout, we cannot see login page until we login again, so this page will be hidden
  useEffect(()=>{
    if (!token) {//if the token is not available
      navigate("/cart")//we will be navigated to cart page
    }
    else if(getTotalCartAmount()===0){//if cart is empty, (even after login)
      navigate("/cart")//send user on cart page
    }
  },[token])//executed whenever our token gets updated

  return (
    // add onsubmit and provide function name
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
        {/* link this handler function and data state with input fields by adding name, value and onchange properties */}
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' required />
          {/* if these fields are empty, then proceed to payment will not work */}
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' required />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' required />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
      {/* copied from cart.jsx */}
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder