import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list}=useContext(StoreContext)//get food_list array using context api

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
        {/* to display multiple food items */}
            {food_list.map((item,index)=>{//take food data and display that in a card
              if(category==="All" || category===item.category){//if we click on these icons, food item will be filtered and display food items from particular category, if category state is All, we will get all products and if category is same as the item.category, in that case we will get the product of that category
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />//props destructured in FoodItem.jsx component
              }
                
            })}
        </div>
    </div>
  )
}

export default FoodDisplay