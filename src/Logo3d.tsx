import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Logo3DModel() {
  const { scene } = useGLTF("/2bdev-logo3d.gbl");
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const ref = useRef<any>();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.rotation.x = 0.2;
    }
  });

  return <primitive object={clonedScene} ref={ref} />;
}

export default function Logo3d() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }} style={{ height: "400px", width: "100%" }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Logo3DModel />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}