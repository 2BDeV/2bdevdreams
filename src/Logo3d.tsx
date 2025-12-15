import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Logo3DModel() {
  const { scene } = useGLTF("/2bdev-logo3d.gbl");
  const ref = useRef<any>(null);
  const initialRotationX = 0.2;

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.rotation.x = initialRotationX;
    }
  });

  return <primitive ref={ref} object={scene} dispose={null} />;
}

export default function Logo3d() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 40 }} gl={{ antialias: true }}>
      <color attach="background" args={["#05070B"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 4, 3]} intensity={1.4} color="#00D9FF" />
      <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#0EA5E9" />
      <Logo3DModel />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
}
