import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
`;

const heartBeat = keyframes`
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  35% { transform: scale(1); }
  45% { transform: scale(1.1); }
  55% { transform: scale(1); }
`;

const sparkleAnimation = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1) rotate(180deg); opacity: 1; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

const HeartContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Heart = styled.div`
  position: absolute;
  font-size: ${props => props.size || '24px'};
  animation: ${float} ${props => props.duration || 3}s ease-in-out infinite;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  opacity: 0.6;
  transform-origin: center;
  animation: ${heartBeat} 2s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const Sparkle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${props => props.color || '#FFD700'};
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  animation: ${sparkleAnimation} ${props => props.duration || 2}s linear infinite;
  animation-delay: ${props => props.delay || 0}s;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
`;

const Text = styled.div`
  font-size: ${props => props.fontSize || '1.6rem'};
  margin: 10px;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: ${props => props.delay}s;
  font-family: 'Arial', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  padding: 0 20px;
  text-align: center;
  color: white;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  background-size: 200% 100%;
  animation: 
    ${fadeIn} 1s ease forwards,
    ${shimmer} 2s linear infinite;
  animation-delay: ${props => props.delay}s, ${props => props.delay + 1}s;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    font-size: ${props => props.fontSize || '2rem'};
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 25px;
  color: #ff1493;
  cursor: pointer;
  margin-top: 20px;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 4s;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.8),
      transparent
    );
    transform: rotate(45deg);
    transition: all 0.5s ease;
    opacity: 0;
  }

  &:hover {
    transform: scale(1.1) translateY(-2px);
    background: white;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);

    &::before {
      animation: ${shimmer} 1s forwards;
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const messages = [
  { text: "❤️ Happy Birthday, My Love! ❤️", fontSize: "1.6rem", delay: 0 },
  { text: "Every moment with you makes my life complete...", delay: 1 },
  { text: "Your smile lights up my world! ✨", delay: 2 },
  { text: "I've prepared something special just for you... 💝", delay: 3 }
];

const TextAnimation = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);

    // Create initial hearts
    const initialHearts = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 20 + 'px',
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 2
    }));
    setHearts(initialHearts);

    // Create initial sparkles
    const initialSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2
    }));
    setSparkles(initialSparkles);

    return () => clearTimeout(timer);
  }, []);

  const handleTextClick = () => {
    // Add new sparkles on text click
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`,
      duration: Math.random() * 2 + 1,
      delay: 0
    }));
    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.slice(0, 15)); // Keep only the first 15 sparkles
    }, 2000);
  };

  return (
    <Container>
      <HeartContainer>
        {hearts.map(heart => (
          <Heart key={heart.id} {...heart}>❤️</Heart>
        ))}
        {sparkles.map(sparkle => (
          <Sparkle key={sparkle.id} {...sparkle} />
        ))}
      </HeartContainer>
      {messages.map((message, index) => (
        <Text
          key={index}
          delay={message.delay}
          fontSize={message.fontSize}
          onClick={handleTextClick}
        >
          {message.text}
        </Text>
      ))}
      {showButton && (
        <Button onClick={onComplete}>
          Begin Your Birthday Adventure! 💫
        </Button>
      )}
    </Container>
  );
};

export default TextAnimation;