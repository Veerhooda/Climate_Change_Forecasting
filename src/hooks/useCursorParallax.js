import { useEffect, useRef } from 'react';

/**
 * useCursorParallax:
 * Adds smooth mouse inertia 3D parallax to the visual stage.
 * Mimics physical camera tilt and spatial depth found in award-winning
 * Awwwards single-page experiences.
 */
export const useCursorParallax = (targetRef, options = {}) => {
  const { intensity = 1.0, smoothing = 0.06 } = options;
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to range [-1, 1]
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetPos.current.x = (e.clientX - halfW) / halfW;
      targetPos.current.y = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth inertia render loop
    const render = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * smoothing;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * smoothing;

      if (targetRef.current) {
        const tiltX = currentPos.current.y * -2.2 * intensity;
        const tiltY = currentPos.current.x * 2.8 * intensity;
        const panX = currentPos.current.x * -12 * intensity;
        const panY = currentPos.current.y * -8 * intensity;

        targetRef.current.style.transform = `perspective(1200px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translate3d(${panX.toFixed(1)}px, ${panY.toFixed(1)}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [targetRef, intensity, smoothing]);
};

export default useCursorParallax;
