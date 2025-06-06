import React, { useContext } from 'react'
import "./FoodItem.css"
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'

const FoodItem = ({id,name,price,description,image}) => {

  // const [itemCount,setItemCount]=useState(0)//to add fooditem in our cart, it is creating a state variable for each product, this is not a best practise, to solve this we will create a cartItem object in our context

  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)//we will add cartItems, add to cart and remove from cart functionality from store context component using context api

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
        {/* append image url in the end */}
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {/* if our foodItem count is 0, then we will provide one add button, if count is greater than 0 then we will provide one counter */}
            {!cartItems[id]
            //adding add to cart function from context api which takes in an id
              ? <img onClick={()=>addToCart(id,toast.success("Food item added to cart"))} className='add' src={assets.add_icon_white} alt=''/>
              :<div className='food-item-counter'>
              {/* adding remove from cart function from context api which takes in an id */}
                <img onClick={()=>removeFromCart(id,toast.success("Food item removed to cart"))} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem