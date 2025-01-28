import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import TextAnimation from './components/TextAnimation';
import CakeCutting from './components/CakeCutting';
import GiftBox from './components/GiftBox';
import './App.css';

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

const moveAcross = keyframes`
  0% {
    transform: translateX(-100%) translateY(0);
  }
  50% {
    transform: translateX(50%) translateY(-50px);
  }
  100% {
    transform: translateX(200%) translateY(0);
  }
`;

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    45deg, 
    #FF1493, 
    #FF69B4, 
    #FF1493, 
    #FFB6C1,
    #FF69B4
  );
  background-size: 400% 400%;
  animation: ${keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `} 15s ease infinite;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 100%);
    pointer-events: none;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

const FloatingItem = styled.div.attrs(props => ({
  style: {
    left: `${props.left}%`,
    top: `${props.top}%`,
    animationDuration: `${props.duration || 3}s`,
    animationDelay: `${props.delay || 0}s`,
    fontSize: props.size || '2rem',
  }
}))`
  position: fixed;
  animation: ${float} ease-in-out infinite;
  opacity: 0.6;
  z-index: 0;
  filter: blur(1px);
  user-select: none;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    opacity: 0.8;
  }
`;

const Sparkle = styled.div.attrs(props => ({
  style: {
    left: `${props.left}%`,
    top: `${props.top}%`,
    animationDuration: `${props.duration || 3}s`,
    animationDelay: `${props.delay || 0}s`,
    background: props.color || 'white',
  }
}))`
  position: fixed;
  width: ${props => props.size || '4px'};
  height: ${props => props.size || '4px'};
  border-radius: 50%;
  animation: ${spin} linear infinite,
             ${pulse} ease-in-out infinite;
  opacity: 0.4;
  z-index: 0;
  box-shadow: 0 0 ${props => props.glow || '10px'} ${props => props.glow || '2px'} rgba(255, 255, 255, 0.3);
`;

const Cloud = styled.div.attrs(props => ({
  style: {
    top: `${props.top}%`,
    animationDuration: `${props.duration || 20}s`,
    animationDelay: `${props.delay || 0}s`,
  }
}))`
  position: fixed;
  font-size: 3rem;
  animation: ${moveAcross} linear infinite;
  opacity: 0.4;
  z-index: 0;
  filter: blur(1px);
  color: white;
`;

const BackgroundItems = () => {
  const items = [
    { emoji: '💝', size: '2rem', left: 10, top: 20, duration: 4, delay: 0 },
    { emoji: '🌹', size: '2.5rem', left: 85, top: 15, duration: 5, delay: 1 },
    { emoji: '✨', size: '2rem', left: 75, top: 70, duration: 4.5, delay: 2 },
    { emoji: '💖', size: '1.8rem', left: 15, top: 80, duration: 3.5, delay: 1.5 },
    { emoji: '🌟', size: '2.2rem', left: 90, top: 40, duration: 4.2, delay: 0.5 },
    { emoji: '💕', size: '2.3rem', left: 5, top: 60, duration: 4.8, delay: 0.8 },
    { emoji: '🦋', size: '1.9rem', left: 95, top: 85, duration: 3.8, delay: 1.2 },
    { emoji: '💫', size: '2.1rem', left: 25, top: 30, duration: 4.4, delay: 1.8 },
    { emoji: '🌸', size: '2rem', left: 45, top: 25, duration: 4.6, delay: 2.2 },
    { emoji: '✨', size: '1.7rem', left: 65, top: 45, duration: 3.9, delay: 1.6 },
  ];

  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2,
    size: `${3 + Math.random() * 3}px`,
    color: `hsl(${Math.random() * 60 + 320}, 100%, 75%)`,
    glow: `${8 + Math.random() * 8}px`
  }));

  const clouds = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    duration: 25 + Math.random() * 10,
    delay: i * 8,
    top: 10 + Math.random() * 20
  }));

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemHover = (index) => {
    setHoveredItem(index);
  };

  return (
    <>
      {items.map((item, index) => (
        <FloatingItem
          key={index}
          {...item}
          onMouseEnter={() => handleItemHover(index)}
          onMouseLeave={() => handleItemHover(null)}
          style={{
            transform: hoveredItem === index ? 'scale(1.2)' : 'scale(1)',
            filter: hoveredItem === index ? 'none' : 'blur(1px)'
          }}
        >
          {item.emoji}
        </FloatingItem>
      ))}
      {sparkles.map((sparkle, index) => (
        <Sparkle key={`sparkle-${index}`} {...sparkle} />
      ))}
      {clouds.map((cloud, index) => (
        <Cloud key={`cloud-${index}`} {...cloud}>
          ☁️
        </Cloud>
      ))}
    </>
  );
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleComplete = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <TextAnimation onComplete={handleComplete} />;
      case 1:
        return <CakeCutting onComplete={handleComplete} />;
      case 2:
        return <GiftBox />;
      default:
        return <TextAnimation onComplete={handleComplete} />;
    }
  };

  return (
    <AppContainer>
      <BackgroundItems />
      <ContentContainer>
        {renderCurrentStep()}
      </ContentContainer>
    </AppContainer>
  );
}

export default App;