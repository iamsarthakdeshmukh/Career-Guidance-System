import { Canvas } from '@react-three/fiber';
import React, { useRef } from 'react';
import Cyl from './Cyl';

function DirectionalLightComponent() {
    const lightRef = useRef();
  
    return (
      <directionalLight ref={lightRef} position={[-8, 3, 15]} intensity={1.2} />
    );
}

function CylGeometry() {
  return (
    <>
      <Canvas camera={{ fov: 22, position: [0, 0, 5] }}>  
        <ambientLight intensity={2.8} />
        <DirectionalLightComponent />
        <Cyl />
      </Canvas>  
    </>
  );
}

export default CylGeometry;
