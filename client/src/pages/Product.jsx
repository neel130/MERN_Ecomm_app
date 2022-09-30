import { Add, Remove } from "@material-ui/icons";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useSelector,useDispatch } from "react-redux";
import { addTocart, addToUserCart } from "../Redux/actions/action";
import { getUserCart } from "../Redux/actions/action";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const params =useParams();
  const productId = params.id;
  const [product,setProduct] = useState({});
  const [amount,setAmount] = useState(1);
  const dispatch = useDispatch();

  const user = useSelector((state)=>state.userReducer)
  console.log(user);
  

  useEffect(()=>{
 
    const getProduct = async ()=>{
      const res = await fetch(`/product/${productId}`);
      const data = await res.json();
      console.log(data);
      if(data.success){
      setProduct(data.product)
      }
    }

    getProduct();
  },[])
 
  const amountChange = (type) =>{
    if(type==="minus"){
     amount>1 && setAmount(amount-1)
    }else{
      setAmount(amount+1)
    }
  }


  const addToCartItem = ()=>{
    const cartData = {...product,amount,price:product.price*amount}
    if(user){
      const addproductToCart = async()=>{
        const res = await fetch(`/cart/additems`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            userId:user._id,
            products:cartData
          })
        })
        const data = await res.json();
        console.log(data)
       if(data.success){
        dispatch(addToUserCart(cartData))
       }
      }
      addproductToCart();
    }
    else{
       dispatch(addTocart(cartData))
    }
   
  }





  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>
           {product.description}
          </Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color={product.color} />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>{product.size}</FilterSizeOption>

              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>amountChange("minus")} />
              <Amount>{amount}</Amount>
              <Add onClick={()=>amountChange("plus")} />
            </AmountContainer>
            <Button onClick={addToCartItem} >ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
