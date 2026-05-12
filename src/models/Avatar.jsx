import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export const Avatar = ({ ...props }) => {
  const group = useRef();
  // Load the main avatar model
  const { scene, animations } = useGLTF("/src/assets/3d models/avatar.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Attempt to play 'Idle' animation if it exists, otherwise the first one
    const animationName = animations.find(a => a.name.toLowerCase().includes('idle'))?.name || animations[0]?.name;
    
    if (actions && animationName) {
      actions[animationName].fadeIn(0.5).play();
    }
    
    return () => {
      if (actions && animationName) actions[animationName]?.fadeOut(0.5);
    };
  }, [actions, animations]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};