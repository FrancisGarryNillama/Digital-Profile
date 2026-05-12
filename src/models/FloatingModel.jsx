import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function FloatingModel({ url, radius, speed, angleOffset, modelScale, yAmplitude, ...props }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const angle = clock.elapsedTime * speed + angleOffset;
    ref.current.position.set(Math.cos(angle) * radius, Math.sin(angle * 2) * yAmplitude, Math.sin(angle) * radius);
    ref.current.rotation.y += 0.01; // Simple rotation for visual interest
  });

  return (
    <group ref={ref} {...props}>
      <primitive object={scene} scale={[modelScale, modelScale, modelScale]} />
    </group>
  );
}
