import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  const gltf = useGLTF("/2bdev-logo3d.gbl");
  return <primitive object={gltf.scene} />;
}

export default function Logo3d() {
  return (
    <div className="w-80 h-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
