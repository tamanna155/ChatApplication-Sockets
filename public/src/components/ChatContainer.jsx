import React, {useState,useEffect} from 'react'
import styled from 'styled-components';
import Logout from './Logout.jsx';
import ChatInput from './ChatInput.jsx';
import axios from 'axios';
import { sendMessageRoute } from '../utils/APIRoutes.js';
import { getAllMessagesRoute } from '../utils/APIRoutes.js';
import { useRef } from 'react';
import {v4 as uuidv4} from 'uuid'; 

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [userName, setUserName]= useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(()=>{
    if (currentChat){
        setUserName(currentChat.username);
        setAvatarImage(currentChat.avatarImage);
    }
  }, [currentChat])

  useEffect(()=>{
    const ChatFunction= async() =>{
        if (currentChat){
            const response= await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        }
    }
    ChatFunction();
  },[currentChat]);

  const handleSendMsg = async (msg) =>{
    await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
    });
    socket.current.emit('send-msg', {
        to: currentChat._id,
        from: currentUser._id,
        message: msg,
    });

    const msgs= [...messages];
    msgs.push({fromSelf: true, message: msg});
    setMessages(msgs);
  };

  useEffect(()=>{
    if(socket.current){
        socket.current.on('msg-receive', (msg)=>{
          console.log("📥 Received msg from socket:", msg);
            setArrivalMessage({fromSelf: false, message: msg});
        });
    }
  }, [])

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=> [...prev,arrivalMessage]);
  }, [arrivalMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"});

  }, [messages])

  return (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={avatarImage} alt="AvatarImage" />
                </div>
                <div className="username">
                    <h3>{userName}</h3>
                </div>
            </div>
            <Logout />
        </div>
        <div className="chat-messages">
            {
                messages.map((message)=>{
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
        <ChatInput handleSendMsg= {handleSendMsg} />
    </Container>
  )
}

const Container= styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  overflow: hidden;
  gap: 0.1rem;
  @media screen and (min-width: 720px) and (max-width: 1080px){
     grid-template-rows: 15% 70% 15%;
   }
  .chat-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details{
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar{
        img{
          height: 4rem;
        }
      }
      .username{
        h3{
          color: white;
        }
      }
    }
  }
  .chat-messages{
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    
    .message{
      display: flex;
      align-items: center;

      .content{
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended{
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved{
      justify-content: flex-start;
      .content{
        background-color: #9900ff20;
      }
    }
  }
`;
