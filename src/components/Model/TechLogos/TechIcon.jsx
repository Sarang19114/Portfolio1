'use client';

import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { useInView } from "../../../hooks/useInView";

const Model = ({ model, isActive }) => {
  const scene = useGLTF(model.modelPath);
  const meshRef = useRef();

  useEffect(() => {
    if(model.name === 'Interactive Developer'){
      scene.scene.traverse((child) => {
        if (child.isMesh && child.name === 'Object_5') {
          child.material = new THREE.MeshStandardMaterial({ color: 'white' });
        }
      });
  }},[scene, model.name]);

  // Only animate when visible
  useFrame(() => {
    if (!isActive || !meshRef.current) return;
    // Float animation handled by Float component
  });

  return (
    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group ref={meshRef} scale={model.scale} rotation={model.rotation}>
        <primitive object={scene.scene} />
      </group>
    </Float>
  );
};

const TechIcon = ({ model }) => {
  const { ref: containerRef, isInView, shouldRender } = useInView({
    rootMargin: '50px',
    threshold: 0.1,
    triggerOnce: false,
    unmountWhenHidden: true // Completely unmount canvas when not visible
  });

  return (
    <div ref={containerRef} className="w-36 h-36">
      {shouldRender && (
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }}
          frameloop={isInView ? 'always' : 'never'} // Pause render loop when not visible
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} />
          
          <Suspense fallback={null}>
            <Model model={model} isActive={isInView} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default TechIcon;
