import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {
    
    const {url,token}=useContext(StoreContext)//url and token from context api
    const [data,setData]=useState([])

    const fetchOrders=async ()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}})//to call api, add url and concat it with endpoint, in body we dont have to send anything so send {} and add headers: add token in an object and we will get response in the variable
        setData(response.data.data)//save users order data in this state variable
        // console.log(response.data.data);
        
    }

    useEffect(()=>{
        if (token) {//if token is available
            fetchOrders()
        }
    },[token])//call this function whenever the component is loaded, user logged in or logged off from webpage, again we have to execute the function, whenever the token will be updated, this function will be executed

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{//use this data array and map the data, individual order and index
                return (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{//we will display multiple items, display all items one by one seperated by ,s, pass individual item and index
                            if(index===order.items.length-1){//with item name we will display quantity also, we can access the last item of user order
                                return item.name+" x "+item.quantity//to display item x quantity, if we are on last item, we don't have a ,
                            }
                            else{//if it is not the last item from all our items, then add , at its end
                                return item.name+" x "+item.quantity+", "
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        {/* items and provide total number of items that we will get from order.items.length */}
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        {/* now we will check if we are updating the status here, whether our frontend status is getting updated or not */}
                        {/* add functionality, when we click on this button, it will update the status, whenever we will click on this button, it will run the fetchOrders function, now we don't need to refresh the webpage as only by clicking the below button, it will update the status*/}
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders
// Stripe dummy cc card for india-4000003560000008