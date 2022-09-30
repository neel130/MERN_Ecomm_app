import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserCart } from "./Redux/actions/action";
import CheckOut from "./pages/CheckOut";


const App = () => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const LocalStoragecartItems = JSON.parse(localStorage.getItem('cartItems'))
    if (user) {

      if (LocalStoragecartItems) {
        const addproductToCart = async () => {
          const res = await fetch(`/cart/additems`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: user._id,
              products: LocalStoragecartItems.products
            })
          })
          const data = await res.json();
          console.log(data)
          localStorage.removeItem('cartItems');
        }
        addproductToCart();
      }
    }
  }, [user])





  useEffect(() => {
    if (user) {
      const userCart = async () => {
        const res = await fetch(`/cart/${user._id}`);
        const data = await res.json();
        console.log(data)
        dispatch(getUserCart(data.cartItems))
      }

      userCart();
    }
  }, [user])


  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/productlist/:catagory" element={<ProductList/>} />
      <Route path="/product/:id" element={<Product/>} />
      <Route  path="/cart" element={<Cart/>} />
      <Route  path="/register"  element={<Register/>} />
      <Route path="/login" element={  <Login/>} />
      <Route path="/checkout" element={  <CheckOut/>} />
    </Routes>
  </BrowserRouter>
    
    
    
    
    </>
  )
};

export default App;