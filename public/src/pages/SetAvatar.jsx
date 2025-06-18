import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Loader from '../assets/Loader.gif'
import {ToastContainer, toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "react-toastify/ReactToastify.css"
import { setAvatarRoute } from '../utils/APIRoutes';

window.Buffer = window.Buffer || require("buffer").Buffer; 

export default function SetAvatar() {
    const navigate= useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
            navigate('/login');
        }
    }, [])

    const setProfilePicture = async() =>{
        if(selectedAvatar === undefined){
            toast.error("Select an avatar to continue", toastOptions);
        } 
        else{
            const user= await JSON.parse(localStorage.getItem('chat-app-user'));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {image: avatars[selectedAvatar],});
            console.log(data);
            if(data.isSet){
                user.isAvatarImageSet= true;
                user.avatarImage= data.image;
                localStorage.setItem('chat-app-user', JSON.stringify(user));
                navigate('/')
            } else{
                toast.error("Error setting up avatars. Please try again", toastOptions);
            }
        }

    };

    useEffect(()=>{
        const fetchAvatars = async ()=>{
            const avatarStyle = "adventurer";
            const avatarList = [];
            for (let i = 0; i < 4; i++) {
                const seed = Math.random().toString(36).substring(7); 
                const url = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${seed}`;
                avatarList.push(url);
            }
            setAvatars(avatarList);
            setIsLoading(false);
        };
        fetchAvatars();
    }, [])

  return (
    <>
        {isLoading ? (
            <Container>
            <img src={Loader} alt="Loading" className='loader' /> 
            </Container>  
        ) : (
            <Container>
            <div className="title-container">
                <h1>Pick an Avatar as your profile picture</h1>
            </div>
    
            <div className="avatars">
                {avatars.map((avatar,index)=>{
                    return (
                        <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`} key={index}>
                            <img src={avatar} alt="avatar" onClick={()=> setSelectedAvatar(index)} />
                        </div>
                    );
                })
            };
            </div>
            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>
        )};
        <ToastContainer/>
    </>
  );
 }

const Container= styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .title-container{
    h1{
      color: white;
    }
  }
  .avatars{
    display: flex;
    gap: 2rem;

    .avatar{
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      justify-content: center;
      align-items: center;
      display: flex;
      transition: transform 0.2s ease-in-out;

      img{
        height: 6rem;
        &:hover{
          transform: scale(1.2);
        }
      }
    }
    .selected {
      border: 0.4rem #4e0eff;
    }
  }
  .submit-btn{
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

`;