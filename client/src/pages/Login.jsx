import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentUser } from "../Redux/actions/action";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link2 = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => { 
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const loginUser = async (e)=>{
    e.preventDefault();
     const res = await fetch('/auth/login',{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
     });

     const data = await res.json();
     if(data.success){
      localStorage.setItem("user",JSON.stringify(data.user))
      localStorage.setItem('accessToken',data.accessToken)
      dispatch(currentUser(data.user))
      navigate('/')
     }
     console.log(data)
  }


  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input 
          onChange={(e)=>{setEmail(e.target.value)}}
          type="email" placeholder="email" />
          <Input 
          onChange={(e)=>{setPassword(e.target.value)}}
          type="password" placeholder="password" />
          <Button onClick={loginUser} >LOGIN</Button>
          <Link2>DO NOT YOU REMEMBER THE PASSWORD?</Link2>
          <Link2 > <Link to="/register">  CREATE A NEW ACCOUNT  </Link></Link2>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
