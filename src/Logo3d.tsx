import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  // A modell a public mappában van
  const gltf = useGLTF("/2bdev-logo3d.gbl");
  return <primitive object={gltf.scene} scale={1} />;
}

export default function Logo3d() {
  return (
    <Canvas style={{ width: 300, height: 300 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}
