import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Logo3DModel() {
  const { scene } = useGLTF("/2bdev-logo3d.gbl"); 
  return <primitive object={scene} scale={1} />;
}

export default function Logo3d() {
  return (
    <div className="w-full h-[500px] bg-gray-900 rounded-xl flex items-center justify-center">
      <Canvas>
        {/* Tiltjuk a zoom-ot */}
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Logo3DModel />
      </Canvas>
    </div>
  );
}
