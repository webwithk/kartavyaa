import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface TubesBackgroundProps {
  children?: ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export default function TubesBackground({
  children,
  className = '',
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const appInstance = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initTubes = async () => {
      try {
        // Dynamic import of the specific module
        // @ts-ignore
        const module = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
        const TubesCursor = module.default || module;

        if (isMounted && canvasRef.current) {
          appInstance.current = TubesCursor(canvasRef.current, {
            tubes: {
              colors: ["#020617", "#38BDF8", "#6366F1"], // Background, Accent, Highlight
              lights: {
                intensity: 200,
                colors: ["#38BDF8", "#6366F1", "#1E293B", "#0F172A"]
              }
            }
          });
        }
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      isMounted = false;
      if (appInstance.current && typeof appInstance.current.destroy === 'function') {
        appInstance.current.destroy();
      }
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !appInstance.current?.tubes) return;

    const randomColors = (count: number) => {
      return new Array(count)
        .fill(0)
        .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    };

    const newColors = randomColors(3);
    const newLightsColors = randomColors(4);

    if (typeof appInstance.current.tubes.setColors === 'function') {
      appInstance.current.tubes.setColors(newColors);
    }
    if (typeof appInstance.current.tubes.setLightsColors === 'function') {
      appInstance.current.tubes.setLightsColors(newLightsColors);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        style={{ width: '100vw', height: '100vh', display: 'block' }}
      />
      <div className="relative z-10 w-full h-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
}