import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
   
    const url=import.meta.env.VITE_BACKEND_URL
    const [token,setToken]=useState("")
  //to get this data from db
  // we will create a function using that, we can load the fooditem in this state from db
    const [food_list,setFoodList]=useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {//if user is adding product first time in the cart, in that case we will create a new entry,
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))//prev cart data and we will return 1 object where we will define the item ID and value will be 1, keyid =item id and value will be number of quantity
        }
        else {//any product item is already available and quantity is 1, in that case we will increase that
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))//pass prev cart data and we will modify prev item id key +1, increase value by 1
        }
        if (token) {//if we have token available, whatever item is added in cart, we will update in db also
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})//provide url+end point address and provide item id that we are getting from the parameter passed in the function and set token in header
        }//when we are logged in, we will get a token, in that case when we will add product in cart, that product will be added in db cart also
    }

    const removeFromCart = async (itemId) => {//logic using that if we click on remove it will remove item from db
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))//pass prev cart data and in that we will set item id with prev item id -1 , decrease value by 1
        if (token) {//if we click on remove, it will remove item from db
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})//add url where we will append endpoint, and pass item id that we will get from parameter and pass token in headers, in headers we will pass object as token
        }
    }

    //logic that will calculate subtotal and total 
    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {//for in loop because cartItems is an object, it will iterate over the object and provide with the object 1 by 1
            if (cartItems[item] > 0) {//item is key value of cartItems object, executed only when quantity is >0
                let itemInfo = food_list.find((product) => product._id === item)//where we will get the product, if product id is matching with item, where it is the key value of cart item, implies this product is available in cart
                totalAmount += itemInfo.price * cartItems[item]//in that case we will add total amount with itemInfo.price(price of 1 quantity)*quantity(total amount of that product)
            }

        }
        return totalAmount
    }

    // we will create a function using that, we can load the fooditem in this state from db
    const fetchFoodList=async ()=>{
        const response=await axios.get(url+"/api/food/list")//call api, when we will hit this api, we will get all food items
        setFoodList(response.data.data)
    } 

    const loadCartData=async(token)=>{// logic so that when we refresh the webpage after increasing  quantity, it should remain as it is and not reset, pass token
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})//call api, add url and concat api endpoint and pass an empty object because we don't need to add anything in body to hit this api and now add header, in this headers, we will send one token  in object
        setCartItems(response.data.cartData)//response will be cart data and we will save that cart data in cartItems state, cart data will be loaded in this state
    }
    
// if we reload the webpage we will not get logged out
// we will add logic using that local storage data will be saved in token state when we refresh the webpage
    useEffect(()=>{
     
        async function loadData(){
            await fetchFoodList()//run this function whenever the webpage is loaded
            if (localStorage.getItem("token")) {//key name token, if this entry is there
                setToken(localStorage.getItem("token"))//if localstorage has this token then we will set this token in token state, so that if we reload the webpage we will not get logged out, because token state is getting updated with data from localstorage
                await loadCartData(localStorage.getItem("token")) //run this function whenever webpage is loaded, call function whenever our page is loaded, pass token, here token is keyname
            }
           
        }
        loadData()//call the function here, whenever our page is loaded
    },[])


    const contextValue = {//adding any element(value or function) in this object, we can access this in any component using the context
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider