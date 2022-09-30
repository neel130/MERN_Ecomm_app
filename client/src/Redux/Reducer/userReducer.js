
const user = JSON.parse(localStorage.getItem('user'))
const initialState = user;

 export const userReducer = (state = initialState,action)=>{

    if(action.type==="USER"){
        return action.payload ;
    }

    if(action.type==="LOGOUT"){
        return null ;
    }

    return state ;
}