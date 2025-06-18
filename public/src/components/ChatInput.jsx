import React, {useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';

export default function ChatInput({handleSendMsg}) {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg,setMsg] = useState("");

  const handleEmojiPickerHideShow = async () =>{
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event) => {
    let message= msg;
    message += event.emoji;
    setMsg(message);
  };

  const sendChat = (event) =>{
    event.preventDefault();
    if(msg.length>0) {
        handleSendMsg(msg);
        setMsg('');
    }
  };

  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
            </div>
        </div>
        <form className='input-container' onSubmit={(e)=> sendChat(e)}>
            <input type="text" placeholder="Type something.." value={msg} onChange={(event)=>{setMsg(event.target.value)}} />
            <button className='submit'>
                <IoMdSend />
            </button>
        </form>
    </Container>
  )
}

const Container= styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;

  .button-container{
    color: white;
    display: flex;
    gap: 1rem;
    align-items: center;

    .emoji{
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -500px;
      }
    }
  }
  .input-container{
    width: 100%;
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    input{
      width: 100%;
      height: 100%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus{
        outline: none;
      }
    }
    button{
      padding: 1rem 2rem 1rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;

      svg{
        font-size: 2rem;
      }

    }
  }
`;

