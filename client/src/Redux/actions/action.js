

export const addTocart = (data)=>{
    return{
         type:"ADD_CART_NON_USER",
         payload:data
    }  
}

export const addToUserCart = (data)=>{
    return{
        type:"ADD_CART_USER",
        payload:data
    }
}

export const getUserCart = (data) =>{
    return{
        type:"USER_CART",
        payload:data
    }
}

export const clearCart = ()=>{
    return {
        type:"CLEAR_CART"
    }
}


export const currentUser = (data)=>{
    return{
        type:"USER",
        payload :data
    }
}


export const logoutUser = ()=>{
    return{
        type:"LOGOUT"
    }
}