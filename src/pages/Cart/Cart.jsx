import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from "../../context/StoreContext"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Cart = () => {

  const { cartItems, food_list, removeFromCart,getTotalCartAmount,url } = useContext(StoreContext)//we will access our cartItems, food_list, remove from cart functionality

  const navigate=useNavigate()
  

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {//so we will get all food list from fooditems
          if (cartItems[item._id] > 0) {//if food item is available in cart item, then we will display it in the cart page, if cart Items contains 1 product with this item._id
            return (<div>
              <div className="cart-items-title cart-items-item">
             
              {/* item.image is image name */}
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                {/* display quantity */}
                <p>{cartItems[item._id]}</p>
                {/* display total price=item price * number of quantity */}
                <p>${item.price * cartItems[item._id]}</p>
                {/* remove From Cart function is from useContext */}
                <p onClick={()=>removeFromCart(item._id,toast.success("Food item removed from cart"))} className='cross'>x</p>
              </div>
              <hr />
            </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
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
              {/* if getTotalCartAmount =0 then we will simply provide 0, else we will set delivery charge 2 */}
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              {/* if getTotalCartAmount===0 in that case we will provide 0, else we will prpvide getTotalCartAmount+2 */}
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          {/* navigate to path /order or placeorder component  */}
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promocode' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
