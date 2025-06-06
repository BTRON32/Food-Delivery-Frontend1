import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
//integrate this verify order api with frontend
const Verify = () => {
  // logic to get these parameters=success:true and orderid
  const [searchParams,setSearchParams]=useSearchParams()//to find url parameters
// create 2 variables to get success by providing key="success"
//to get success and orderId
  const success=searchParams.get("success")
  const orderId=searchParams.get("orderId")
  const {url}=useContext(StoreContext)//get backend url from context api
  const navigate=useNavigate()

  const verifyPayment=async()=>{
    const response=await axios.post(url+"/api/order/verify",{success,orderId})//call api, provide url and append endpoint and send success and orderId, when we will hit this api, we will get one response
    if (response.data.success) {//if response if true, payment is successful
      navigate("/myorders")
    }
    else{//if payment if failed
      navigate("/")//home page
    }
  }

  useEffect(()=>{
    verifyPayment()
  },[])//run this function, when the component is loaded(when payment is true)

  // console.log(success,orderId);
  
  return (
    <div className='verify'>
    {/* displayed until payment will be verified */}
    <div className="spinner"></div>

    </div>
  )
}

export default Verify