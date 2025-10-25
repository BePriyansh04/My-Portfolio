// src/components/Cursor3D.jsx
import { useEffect, useRef } from 'react';

const Cursor3D = () => {
  const ringRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    let x = 0, y = 0;
    let winW = window.innerWidth, winH = window.innerHeight;

    const onMouseMove = (e) => {
      x = e.clientX; y = e.clientY;
      const rotX = (y / winH - 0.5) * 20;
      const rotY = (x / winW - 0.5) * 20;
      ring.style.transform = `translate(${x}px, ${y}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };

    const onResize = () => { winW = window.innerWidth; winH = window.innerHeight; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    // remove on touch
    const onTouchStart = () => ring.remove();
    window.addEventListener('touchstart', onTouchStart, { once: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-ring {
          position: fixed;
          top: -12px; left: -12px;
          width: 24px; height: 24px;
          border: 2px solid var(--accent-blue);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.1s ease-out;
          box-shadow: 0 0 10px var(--accent-blue), 0 0 20px var(--accent-blue);
        }
      `}</style>
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default Cursor3D;