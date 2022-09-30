
const localStorageCartItems = JSON.parse(localStorage.getItem("cartItems"));
console.log(localStorageCartItems)

  const  initialState = {
    quantity : localStorageCartItems ? localStorageCartItems.quantity :0 ,
    total :localStorageCartItems ? localStorageCartItems.total : 0,
    products: localStorageCartItems ? localStorageCartItems.products : []
 }
   
  
export const cartReducer = (state = initialState,action) =>{

    if(action.type ==="USER_CART"){
        return action.payload
    }

    if(action.type ==="ADD_CART_NON_USER"){
        // setting up Localstorage cart data 
          localStorage.setItem("cartItems",JSON.stringify({...state,
            quantity:state.quantity+1,
            products:[...state.products,action.payload],
            total:state.total += action.payload.price }))

        return{
               ...state,
               quantity:state.quantity+1,
               products:[...state.products,action.payload],
               total:state.total += action.payload.price             
        }
  
    }

    if(action.type==="ADD_CART_USER"){
      return{
        ...state,
        products:[...state.products,action.payload]
      }
    }

    if(action.type==="CLEAR_CART"){
      return null
    }
    

    return state ;
}