import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const FloatingModel = ({ 
  url, 
  radius = 2, 
  speed = 1, 
  angleOffset = 0, 
  modelScale = 0.5, 
  yAmplitude = 0.2 
}) => {
  const meshRef = useRef();
  // Load the GLB model
  const { scene } = useGLTF(url);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Calculate orbit position (X and Z coordinates)
    const angle = time * speed + angleOffset;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    // Calculate floating vertical movement (sine wave)
    const y = Math.sin(time * 1.5 + angleOffset * 2) * yAmplitude;

    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      
      // Subtle rotation to make the icons look dynamic
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene.clone()} 
      scale={modelScale} 
    />
  );
};