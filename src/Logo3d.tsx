import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Logo3DModel() {
  const { scene } = useGLTF("/2bdev-logo3d.gbl");
  const ref = useRef<any>();

  const initialRotationX = 0.2; 

  // Automatikus forgatás
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;  
      ref.current.rotation.x = initialRotationX; 
    }
  });

  return <primitive ref={ref} object={scene} scale={2.5} />;
}

export default function Logo3d() {
  return (
    <div className="w-full h-[500px] flex items-center justify-center">
      <Canvas>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Logo3DModel />
      </Canvas>
    </div>
  );
}
