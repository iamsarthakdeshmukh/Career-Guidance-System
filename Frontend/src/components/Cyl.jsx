import React, { useRef } from 'react';
import { useTexture, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import DocImg from '../assets/images/Doctor.png';

function Cyl() {
  let tex = useTexture(DocImg);
  let cyl = useRef(null);

  useFrame((state, delta) => {
    cyl.current.rotation.y += delta / 2; // Keep rotating
  });

  return (
    <group rotation={[0.2, 0, 0.08]}>
      <mesh ref={cyl}>
        {/* Disable zooming and panning */}
        <OrbitControls enableZoom={false} enablePan={false} />
        <cylinderGeometry args={[1, 1, 1, 9, 10, true]} />
        <meshStandardMaterial map={tex} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default Cyl;
