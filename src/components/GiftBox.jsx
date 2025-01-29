import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  40% {
    transform: translateY(-30px) rotate(-5deg);
  }
  60% {
    transform: translateY(-15px) rotate(5deg);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(-15deg) scale(1.1);
  }
  75% {
    transform: rotate(15deg) scale(1.1);
  }
`;

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const floatUp = keyframes`
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px #ff69b4, 0 0 40px #ff1493;
  }
  50% {
    box-shadow: 0 0 40px #ff69b4, 0 0 60px #ff1493;
  }
`;

const sparkle = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1) rotate(180deg); opacity: 1; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
`;

const bounceLink = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px #ff69b4, 0 0 40px #ff1493; }
  50% { box-shadow: 0 0 40px #ff69b4, 0 0 60px #ff1493; }
`;

const sparkleRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  position: relative;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

  &::before {
    content: '🎁';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 80px;
    opacity: 0.9;
  }

  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 15px;
    background: linear-gradient(45deg, #ff69b4, #ff1493, #ff69b4);
    z-index: -1;
    animation: ${glow} 2s ease-in-out infinite;
  }

  &:hover {
    transform: scale(1.1) translateY(-10px);
  }
`;

const Message = styled.div.attrs(props => ({
  style: {
    animationDelay: `${props.delay || 0}s`,
    fontSize: props.size || '1.5rem',
  }
}))`
  color: white;
  margin: 15px;
  text-align: center;
  opacity: 0;
  animation: ${appear} 1s ease forwards;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  padding: 0 20px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  background-size: 200% 100%;
  animation: 
    ${appear} 1s ease forwards,
    ${shimmer} 2s linear infinite;
  z-index: 1;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    font-size: ${props => props.size || '2rem'};
    margin: 20px;
  }
`;

const Particle = styled.div.attrs(props => ({
  style: {
    left: `${props.left}%`,
    top: `${props.top}%`,
    backgroundColor: props.color,
    animationDuration: `${props.duration}s`,
    animationDelay: `${props.delay}s`,
  }
}))`
  position: absolute;
  width: ${props => props.size || '10px'};
  height: ${props => props.size || '10px'};
  border-radius: ${props => props.isRound ? '50%' : '0'};
  pointer-events: none;
  animation: ${floatUp} linear infinite;
  opacity: 0.6;
  z-index: 0;
`;

const Heart = styled.div.attrs(props => ({
  style: {
    left: `${props.left}%`,
    top: `${props.top}%`,
    fontSize: props.size || '24px',
    animationDuration: `${props.duration}s`,
    animationDelay: `${props.delay}s`,
  }
}))`
  position: fixed;
  animation: ${floatUp} linear forwards;
  opacity: 0;
  z-index: 0;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: linear-gradient(45deg, #ff69b4, #ff1493, #ff69b4);
  background-size: 200% 200%;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  opacity: 0;
  animation: 
    ${appear} 1s ease forwards,
    ${bounceLink} 2s ease-in-out infinite;
  animation-delay: 3s;
  position: relative;
  margin-top: 30px;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.2);

  &::before {
    content: '🎁';
    position: absolute;
    left: 12px;
    animation: ${bounceLink} 1s ease infinite;
    animation-delay: 0.5s;
  }

  &::after {
    content: '✨';
    position: absolute;
    right: 12px;
    animation: ${sparkleRotate} 2s linear infinite;
  }

  span {
    margin: 0 30px;
  }

  &:hover {
    transform: scale(1.05);
    animation: ${glowPulse} 1.5s ease-in-out infinite;
    background-position: right center;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const GiftBox = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const initialSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
      isRound: true
    }));
    setSparkles(initialSparkles);
  }, []);

  const handleClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 0.5,
        size: Math.random() * 8 + 4 + 'px',
        isRound: Math.random() > 0.5
      }));
      setParticles(prev => [...prev, ...newParticles]);
      
      const newSparkles = Array.from({ length: 10 }, (_, i) => ({
        id: Date.now() + i + 100,
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`,
        duration: Math.random() * 2 + 1,
        delay: 0,
        isRound: true
      }));
      setSparkles(prev => [...prev, ...newSparkles]);
      
      setTimeout(() => {
        setSparkles(prev => prev.slice(0, 15));
      }, 2000);
    }
  };

  const handleMessageClick = () => {
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`,
      duration: Math.random() * 2 + 1,
      delay: 0,
      isRound: true
    }));
    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.slice(0, 15));
    }, 2000);
  };

  return (
    <Container>
      {sparkles.map(sparkle => (
        <Particle key={sparkle.id} {...sparkle} />
      ))}
      {particles.map(particle => (
        <Particle key={particle.id} {...particle} />
      ))}
      {!isOpened && (
        <Message onClick={handleMessageClick}>
          A special gift for the most special person in my life! 💝
        </Message>
      )}
      <Box onClick={handleClick} />
      {isOpened && (
        <>
          <Message delay={0.5} size="1.6rem" onClick={handleMessageClick}>
            🌹 My Darling 🌹
          </Message>
          <Message delay={1.5} onClick={handleMessageClick}>
            You mean everything to me. Your love makes every day feel like a celebration!
          </Message>
          <Message delay={2.5} onClick={handleMessageClick}>
            Thank you for being the most amazing person in my life. I love you more with each passing day! 💖
          </Message>
          <LinkButton 
            href="https://fastidious-kheer-751cb9.netlify.app/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Click For Another Surprise! 🎀</span>
          </LinkButton>
        </>
      )}
    </Container>
  );
};

export default GiftBox;