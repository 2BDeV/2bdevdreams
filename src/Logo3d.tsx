import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";

// --- MODOSÍTHATÓ BEÁLLÍTÁSOK ---
const SETTINGS = {
  modelPath: "/2bdev-logo3d.glb", // A modell elérési útja
  
  // Modell megjelenése
  scale: 0.5,             // Mekkora legyen az objektum
  position: [-5, 0, 0],    // Hol legyen a térben [x, y, z] (y: -1 ha lebegtetni akarod)
  rotationSpeed: 0.01,    // Forgási sebesség (0 = megáll)
  initialRotation: [0.2, 0, 0], // Alap dőlésszög [x, y, z]

  // Kamera és Keret
  cameraDistance: 14,     // Mennyire legyen messze a kamera (Z tengely)
  canvasHeight: "410px",  // A 3D ablak magassága
  canvasWidth: "300%",    // A 3D ablak szélessége (a 150% kilógatja az oldalból!)

  // Fények
  ambientIntensity: 1.8,  // Általános háttérfény ereje
  lightPosition: [10, 10, 10], // Fő fényforrás helye
  lightIntensity: 10,    // Fő fényforrás ereje

  // Árnyék (ContactShadows)
  shadowOpacity: 1.4,     // Árnyék sötétsége
  shadowScale: 10,        // Árnyék kiterjedése
};

function Logo3DModel() {
  const { scene } = useGLTF(SETTINGS.modelPath); 
  const ref = useRef<any>();

  useFrame(() => {
    if (ref.current) {
      // Folyamatos forgás Y tengelyen
      ref.current.rotation.y += SETTINGS.rotationSpeed;
    }
  });

  return (
    <primitive 
      object={scene} 
      ref={ref} 
      scale={SETTINGS.scale} 
      position={SETTINGS.position}
      rotation={SETTINGS.initialRotation}
    />
  );
}

export default function Logo3d() {
  return (
    <div style={{ width: SETTINGS.canvasWidth, height: SETTINGS.canvasHeight, overflow: 'hidden' }}>
      <Canvas 
        camera={{ position: [0, 0, SETTINGS.cameraDistance], fov: 45 }}
        shadows
      >
        {/* Világítás beállításai */}
        <ambientLight intensity={SETTINGS.ambientIntensity} />
        <spotLight position={SETTINGS.lightPosition} angle={0.2} penumbra={1} intensity={SETTINGS.lightIntensity} />
        <pointLight position={[-10, -10, -10]} color="#ffffff" intensity={0.5} />
        
        {/* A Modell */}
        <Logo3DModel />
        
        {/* Árnyék az objektum alatt */}
        <ContactShadows 
          position={[0, -4.5, 0]} 
          opacity={SETTINGS.shadowOpacity} 
          scale={SETTINGS.shadowScale} 
          blur={2.5} 
          far={4} 
        />
        
      </Canvas>
    </div>
  );
}