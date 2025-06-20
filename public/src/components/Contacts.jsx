import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';

export default function Contacts({contacts, currentUser, changeChat}) {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(()=>{
    if(currentUser){
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
    }
  },[currentUser])

  const changeCurrentChat = (index, contact) =>{
    setCurrentSelected(index);
    changeChat(contact);
  }
  return (
    <>
    {
        currentUserImage && currentUserName && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt="Logo" />
                    <h3>ChatServer</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact,index) =>{
                            return (
                                <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={()=>changeCurrentChat(index,contact)}>
                                    <div className="avatar">
                                        <img src={contact.avatarImage} alt="image" />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                    })}
                    
                </div>
                <div className="current-user">
                    <div className="avatar">
                        <img src={currentUserImage} alt="" />
                    </div>
                    <div className="username">
                        <h3>{currentUserName}</h3>
                    </div>
                </div>
            </Container>
        )
    }
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap:1rem;

    img{
      height: 2rem;
    }
    h3{
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width:0.2rem;
      background-color: #ffffff39;
    }

    .contact{
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.5sec ease-in-out;

      .avatar {
        img{
          height: 3rem;
        }
      }
      .username{
        h3{
          color: white;
        }
      }
    }
    .selected {
        background-color: #9186f3;
    }
  }
  .current-user{
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar{
        img {
          height: 5rem;
          max-inline-size: 100%;
        }
    }
    .username{
        h3{
          color: white;
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px){
      gap:0.5rem;
      .username{
        h3{
          font-size: 1rem;
        }
      }
      grid-template-columns: 35% 65%;
   }
  }
}
`;
