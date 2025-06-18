import React, {useState, useEffect} from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styled from 'styled-components';


export default function Welcome({ currentUser }) {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (currentUser) {
        setUserName(currentUser.username);
        }
    }, [currentUser]);
    
    return (
        <Container>
            <DotLottieReact src="https://lottie.host/2cd1e6f0-790e-4ff6-8599-e066d8172ba3/AQtvcdssad.lottie" style={{height: '20rem', width: '100%'}} loop autoplay />
            <h1>
                Welcome <span>{userName}!</span>
            </h1>
            <h3>Please select on chat to start messaging</h3>
        </Container>
  )
}

const Container= styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
DotLottieReact{
  height: 5rem;
}
span{
  color: #4e0eff;
}


`;
