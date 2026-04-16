import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";

function Logo3DModel() {
  const { scene } = useGLTF("/2bdev-logo3d.glb"); 
  const ref = useRef<any>();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <primitive object={scene} ref={ref} scale={1.5} />;
}

export default function Logo3d() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }} style={{ height: "400px", width: "100%" }}>
      <ambientLight intensity={0.7} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Logo3DModel />
      
      <Environment preset="night" /> 
      
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}