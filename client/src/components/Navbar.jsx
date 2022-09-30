import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../responsive";
import { useSelector,useDispatch } from "react-redux";
import { clearCart, logoutUser } from "../Redux/actions/action";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const [cartQuantity, setCartQuantity] = useState(0)
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer)
  const cart = useSelector((state) => state.cartReducer)

  useEffect(() => {
    if (user) {
      setCartQuantity(cart?.products.length)
    }
    else {
      setCartQuantity(cart?.quantity)
    }
  }, [cart])


  const LogOut = ()=>{
    localStorage.clear();
    dispatch(logoutUser());
    dispatch(clearCart());
    navigate('/login')
  }


  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo><Link to={'/'} style={{textDecoration:"none",color:"black"}} >  NEEL SHOP</Link></Logo>
        </Center>
        <Right>

          { user ?
         <div class="dropdown">
            <button style={{outline:"none",boxShadow:"none",marginBottom:"7px"}} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
             {user.username}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="/">Profile</a></li>
              <li><a class="dropdown-item" href="/">Privacy Policy</a></li>
              <li style={{marginLeft:"13px",marginTop:"10px"}} ><button onClick={LogOut} className="btn btn-danger" >Logout</button></li>
            </ul>
          </div> 

          :
           <>
           <MenuItem><Link to={'/register'} >REGISTER</Link> </MenuItem>
          <MenuItem> <Link to={'/login'} >SIGN IN</Link> </MenuItem>
          </>
          }
        
         
          <Link to={'/cart'} >
            <MenuItem>
              <Badge badgeContent={cartQuantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>

        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
