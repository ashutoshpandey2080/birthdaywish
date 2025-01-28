import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
  }
`;

const candleFlicker = keyframes`
  0%, 100% {
    transform: scaleY(1) rotate(0deg);
    filter: brightness(1);
  }
  25% {
    transform: scaleY(1.1) rotate(-1deg);
    filter: brightness(1.1);
  }
  75% {
    transform: scaleY(0.9) rotate(1deg);
    filter: brightness(0.9);
  }
`;

const sparkle = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2) rotate(180deg);
  }
`;

const cutCake = keyframes`
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%);
  }
`;

const blowParticles = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(100px, -50px) scale(0);
    opacity: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: visible;
  padding: 20px;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
`;

const CakeContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  margin: 50px 0;
`;

const Cake = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  animation: ${float} 3s ease-in-out infinite;
  transform-style: preserve-3d;
  ${props => props.$isCut && css`
    animation: ${cutCake} 1s forwards;
  `}

  @media (min-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const CakeLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(145deg, #fff5f5, #ffe0e0);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &::after {
    content: '🎂';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 80px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));

    @media (min-width: 768px) {
      font-size: 100px;
    }
  }
`;

const Candle = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 30px;
  background: linear-gradient(to bottom, #ffd700, #ffa500);
  border-radius: 5px;
  cursor: pointer;
  z-index: 2;
  
  ${props => !props.$isBlown && css`
    animation: ${candleFlicker} 1s ease-in-out infinite;
  `}

  @media (min-width: 768px) {
    top: -40px;
    width: 20px;
    height: 40px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    background: radial-gradient(#fff700, #ff6420);
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    filter: blur(2px);
    opacity: ${props => props.$isBlown ? 0 : 1};
    transition: opacity 0.3s ease;
  }
`;

const Flame = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: radial-gradient(#fff700, #ff6420);
  border-radius: 50%;
  filter: blur(2px);
  opacity: ${props => props.$isBlown ? 0 : 1};
  transition: opacity 0.3s ease;
`;

const BlowParticle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${props => props.color};
  border-radius: 50%;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  opacity: 0;
  animation: ${blowParticles} 1s forwards;
`;

const Knife = styled.div`
  position: absolute;
  width: 80px;
  height: 15px;
  top: 50%;
  right: ${props => props.$isCutting ? '45%' : '-100px'};
  transform: translateY(-50%) ${props => props.$isCutting ? 'rotate(45deg)' : 'rotate(0deg)'};
  cursor: pointer;
  transition: all 0.5s ease;
  z-index: 10;
  opacity: ${props => props.$isVisible ? 1 : 0};

  @media (min-width: 768px) {
    width: 120px;
    height: 20px;
  }

  &::before {
    content: '🔪';
    position: absolute;
    font-size: 30px;
    left: -15px;
    top: -20px;
    transform: scaleX(-1);

    @media (min-width: 768px) {
      font-size: 40px;
      left: -20px;
      top: -25px;
    }
  }
`;

const Message = styled.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: ${props => props.delay || 0}s;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 25px;
  color: #ff1493;
  cursor: pointer;
  margin-top: 20px;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: ${props => props.delay || 0}s;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    padding: 15px 30px;
    font-size: 1.2rem;
  }

  &:hover {
    transform: scale(1.1) translateY(-2px);
    background: white;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CakeCutting = ({ onComplete }) => {
  const [isCut, setIsCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [isBlown, setIsBlown] = useState(false);
  const [showKnife, setShowKnife] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [particles, setParticles] = useState([]);

  const handleCandleClick = () => {
    if (!isBlown) {
      setIsBlown(true);
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        top: -30 - Math.random() * 20,
        left: 50 + Math.random() * 20,
        color: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`
      }));
      setParticles(newParticles);
      setTimeout(() => setShowKnife(true), 1000);
    }
  };

  const handleCut = () => {
    if (!isCutting && !isCut && isBlown) {
      setIsCutting(true);
      setTimeout(() => {
        setIsCut(true);
        setTimeout(() => setShowButton(true), 1000);
      }, 1000);
    }
  };

  return (
    <Container>
      <Message delay={0}>
        {!isBlown ? "Make a wish, my love! I hope all your dreams come true 🕯️" : 
         !isCut ? "Let's share this sweet moment together! 🍰" :
         "Just like this cake, my love for you is sweet and endless! ✨"}
      </Message>
      <CakeContainer>
        <Cake $isCut={isCut}>
          <CakeLayer />
          <Candle onClick={handleCandleClick} $isBlown={isBlown}>
            <Flame $isBlown={isBlown} />
          </Candle>
          {particles.map(particle => (
            <BlowParticle
              key={particle.id}
              top={particle.top}
              left={particle.left}
              color={particle.color}
            />
          ))}
        </Cake>
        <Knife 
          onClick={handleCut} 
          $isCutting={isCutting} 
          $isVisible={showKnife}
        />
      </CakeContainer>
      {showButton && (
        <Button onClick={onComplete} delay={0.5}>
          I have another surprise for you! 🎁
        </Button>
      )}
    </Container>
  );
};

export default CakeCutting;