import { useState,useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({category,filters}) => {
  const [products,setProducts] = useState([])
  const [newProduct,setNewProduct] = useState([])

  
  useEffect(()=>{
    const getAllProducts = async () =>{
      const resp = await fetch(category?`/product/all?category=${category}` : `/product/all`);
      const data = await resp.json();
      if(data.success){
        setProducts(data.products)
      }
    } 
       getAllProducts()
       console.log("working")
  },[category])

 
  useEffect(()=>{
    let filteredProduct;
    if(filters?.color && filters?.size){
      console.log('both calling')
     filteredProduct = products.filter(item=>{
      return item.color === filters?.color &&
       item.size === filters?.size
    })
  }
  else if(filters?.color){
    filteredProduct = products.filter(item=>{
      return item.color === filters?.color 
    })
  }
  else if(filters?.size){
    filteredProduct = products.filter(item=>{
      return item.size === filters?.size 
    })
  }
    setNewProduct(filteredProduct);
  },[filters])



  console.log(category,filters)
  return (
    <Container>
      { newProduct ? <>{newProduct?.map((item) => (
        <Product item={item} key={item.id} />
      ))}</> : <>{products?.map((item) => (
        <Product item={item} key={item.id} />
      ))} </>

      }
      
      
    </Container>
  );
};

export default Products;
