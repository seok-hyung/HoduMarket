import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollTop = () => {
    const scrolled = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop,
    );
    if (scrolled > 2000) setIsVisible(true);
    else setIsVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  return (
    <Button onClick={scrollToTop} className={isVisible ? 'visible' : ''}>
      <img src="/assets/chevron-up.svg" alt="Scroll to top" />
    </Button>
  );
};

export default ScrollToTopBtn;

const Button = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  width: 3rem;
  height: 3rem;
  background-color: var(--main-color);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  &.visible {
    display: flex;
  }
  &:hover {
    background: #469f5b;
  }
  &:active {
    background: #199c34;
  }
  & img {
    width: 30px;
    height: 30px;
  }
`;
