import { useEffect, useState } from 'react';

const calcHeight = () => window.innerHeight;

const use100vh = () => {
  const [height, setHeight] = useState(calcHeight);

  const setActualHeight = () => {
    const actualHeight = calcHeight();
    setHeight(actualHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      setActualHeight();
    });

    return () => window.removeEventListener('resize', setActualHeight);
  }, []);

  return height;
};

export default use100vh;

// Also works:

// 1. Using CSS Property
// useEffect(() => {
//   const vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty('--vh', `${vh}px`);
//   // height: 'calc(var(--vh, 1vh) * 100)' — for container.
// });

// 2. Changing height property on resize
// useEffect(() => {
//   window.onresize = () => {
//     document.body.height = window.innerHeight;
//   };
//   window.onresize();
// });
