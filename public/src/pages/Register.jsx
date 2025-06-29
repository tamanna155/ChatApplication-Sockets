import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ToastContainer, toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.svg';
import "react-toastify/ReactToastify.css"
import { regsiterRoute } from '../utils/APIRoutes';

export default function Register() {

  const navigate= useNavigate(); 

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const handleChange = (event) =>{
    setValues({...values, [event.target.name]: event.target.value});
  };

  const handleValidation = () =>{
    const {username, email, password, confirmPassword} = values;
    if(password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same", toastOptions);
      return false;
    } else if(username.length <3) {
      toast.error("Username should be atleast of 4 charecters", toastOptions);
      return false;
    } else if(password.length <8) {
      toast.error("The minimum length of password should be 8 charecters", toastOptions);
      return false;
    } else if(email===""){
      toast.error("Email is required");
      return false;
    }
    return true;
  }

  const handleSubmit= async (event) =>{
    event.preventDefault();
    if(handleValidation()){
      const {username,email,password,confirmPassword} = values;
      const {data} = await axios.post(regsiterRoute, {
        username,
        email,
        password,
      });

      if(data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  useEffect(()=> {
      if(localStorage.getItem('chat-app-user')){
        navigate('/');
      }
    }, [])

  return (
    <>
    <FormContainer>
      <form onSubmit={(event)=> handleSubmit(event)}> 
        <div className="brand">
          <img src={Logo}></img>
          <h1>ChatApp</h1>
        </div>
        <input type='text' placeholder='Username' name='username' onChange={(e)=> handleChange(e)}></input>
        <input type='text' placeholder='Email' name='email' onChange={(e)=> handleChange(e)}></input>
        <input type='password' placeholder='Password' name='password' onChange={(e)=> handleChange(e)}></input>
        <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={(e)=> handleChange(e)}></input>

        <button type='submit'>Create User</button>
        <span> Already have an account ? <Link to="/login">Login</Link> </span>
      </form>
    </FormContainer>
    <ToastContainer />
    </>
  );
}

const FormContainer= styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand{
    display: flex;
    align-items:center;
    gap:1rem;
    justify-content: center;

    img{
      height: 5rem;
    }

    h1{
      color: white;
      text-transform: uppercase;
    }
}
    form{
      display:flex;
      flex-direction: column;
      gap:2rem;
      background-color: #00000076;
      border-radius: 2rem;
      padding: 3rem 5rem;

      span{
        color: white;
        text-transform: uppercase;

        a{
          color: #4e0eff;
          font-weight: bold;
          text-decoration: none;
          &: hover{
            color: #3ed5b2;
          }
        }
      }

      input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius:0.4rem;
        width:100%;
        font-size: 1rem;
        &:focus{
          border: 0.1rem solid #997af0;
          outline: none;
          background-color:rgb(177, 160, 223);
        }
      }
      
      button{
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
          background-color: #4e0eff;
        }
      }
    }
`;
