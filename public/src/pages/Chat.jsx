import React,{useEffect,useState, useRef} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts.jsx';
import Welcome from '../components/Welcome.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import { io } from 'socket.io-client';
import { host } from '../utils/APIRoutes';

export default function Chat() {

  const navigate= new useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const socket= useRef();

  useEffect(()=>{
    const fetchUser = async()=>{
      if(!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else{
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
        setIsLoaded(true);
      }
    };
    fetchUser();
  }, [])

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit('add-user',currentUser._id);
    }
  }, [currentUser])

  useEffect(()=>{
    const setUser = async ()=>{
      if(currentUser) {
        if(currentUser.isAvatarImageSet){
          const data= await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else{
          navigate('/setAvatar')
        }
      }
    };
    setUser();
  }, [currentUser])

  const handleChatChange =(chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {
          isLoaded && currentChat === undefined ? (
            <Welcome currentUser= {currentUser} />
          ) : 
          (
            <ChatContainer currentChat= {currentChat} currentUser={currentUser} socket={socket} />
          )
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
 height:100vh;
 width:100vw;
 display:flex;
 flex-direction: column;
 align-items: center;
 background-color: #131324;
 gap:1rem;
 justify-content:center;

 .container{
   width:85vw;
   height:85vh;
   background-color: #00000076;
   display: grid;
   grid-template-columns: 25% 75%;
   @media screen and (min-width: 720px) and (max-width: 1080px){
     grid-template-columns: 35% 65%;
   }
 }
`;
