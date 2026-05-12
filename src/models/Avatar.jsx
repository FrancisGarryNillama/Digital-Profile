import { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export const Avatar = ({ ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/Avatar.glb");
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const animationName = animations.find(a => a.name.toLowerCase().includes('idle'))?.name || animations[0]?.name;

    const action = animationName ? actions?.[animationName] : undefined;

    if (action) {
      action.fadeIn(0.5).play();
    }

    return () => {
      action?.fadeOut(0.5);
    };
  }, [actions, animations]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={cloned} />
    </group>
  );
};
