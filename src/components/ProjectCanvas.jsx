'use client';

import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import DemoComputer from './DemoComputer';
import CanvasLoader from './Loading';
import { useInView } from '../hooks/useInView';

// Wrapper to control render loop
function ComputerScene({ texture, isActive }) {
  useFrame(() => {
    if (!isActive) return; // Skip rendering when not active
  });

  return (
    <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
      <DemoComputer texture={texture} />
    </group>
  );
}

/**
 * ProjectCanvas - 3D Computer Display for Projects
 * Separated from Projects.jsx for better code splitting
 * Only loads and renders when Projects section is visible
 */
export default function ProjectCanvas({ texture }) {
  const { ref: canvasRef, isInView } = useInView({
    rootMargin: '50px',
    threshold: 0.01,
    triggerOnce: false
  });

  return (
    <div ref={canvasRef} className="w-full h-full">
      <Canvas frameloop={isInView ? 'always' : 'never'}>
        <ambientLight intensity={Math.PI} />
        <directionalLight position={[10, 10, 5]} />
        <Center>
          <Suspense fallback={<CanvasLoader />}>
            <ComputerScene texture={texture} isActive={isInView} />
          </Suspense>
        </Center>
        <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
      </Canvas>
    </div>
  );
}
