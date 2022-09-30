import { cartReducer } from "./cartReducer";
import {userReducer } from "./userReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    cartReducer,
     userReducer
})


export default rootReducer ;