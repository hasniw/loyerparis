'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Paris arrondissement approximate positions (normalized -3 to 3) and rent prices
const ARRONDISSEMENTS = [
  { id: 1, x: 0.2, z: 0.1, price: 35.2 },
  { id: 2, x: 0.5, z: -0.3, price: 33.5 },
  { id: 3, x: 0.8, z: -0.1, price: 34.0 },
  { id: 4, x: 0.5, z: 0.3, price: 35.8 },
  { id: 5, x: 0.2, z: 0.7, price: 32.5 },
  { id: 6, x: -0.3, z: 0.5, price: 36.5 },
  { id: 7, x: -0.8, z: 0.3, price: 36.0 },
  { id: 8, x: -0.5, z: -0.5, price: 35.5 },
  { id: 9, x: 0.1, z: -0.7, price: 31.0 },
  { id: 10, x: 0.7, z: -0.7, price: 28.5 },
  { id: 11, x: 1.2, z: 0.2, price: 28.0 },
  { id: 12, x: 1.3, z: 0.8, price: 26.5 },
  { id: 13, x: 0.5, z: 1.3, price: 25.5 },
  { id: 14, x: -0.3, z: 1.2, price: 27.0 },
  { id: 15, x: -1.2, z: 0.9, price: 27.5 },
  { id: 16, x: -1.5, z: -0.2, price: 33.0 },
  { id: 17, x: -0.8, z: -1.0, price: 29.5 },
  { id: 18, x: 0.0, z: -1.3, price: 26.0 },
  { id: 19, x: 1.0, z: -1.2, price: 24.0 },
  { id: 20, x: 1.5, z: -0.5, price: 25.0 },
];

function Building({ position, height, delay }: { position: [number, number, number]; height: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const startTime = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    if (startTime.current === null) startTime.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - startTime.current - delay;
    if (elapsed < 0) {
      ref.current.scale.y = 0.01;
      return;
    }
    const progress = Math.min(elapsed / 1.2, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    ref.current.scale.y = eased;
    ref.current.position.y = (height * eased) / 2;
  });

  const color = useMemo(() => {
    const t = (height - 0.3) / 1.2;
    const r = 0.15 + t * 0.85;
    const g = 0.35 + (1 - t) * 0.2;
    const b = 0.1 + (1 - t) * 0.3;
    return new THREE.Color(r, g, b);
  }, [height]);

  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[0.35, height, 0.35]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} />
    </mesh>
  );
}

function Stars() {
  const points = useMemo(() => {
    const positions = new Float32Array(600);
    for (let i = 0; i < 600; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.15;
    }
  });

  const minPrice = 24;
  const maxPrice = 36.5;

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1} color="#f97316" />
      <directionalLight position={[-3, 5, -3]} intensity={0.4} color="#60a5fa" />
      <Stars />
      <Float speed={0.5} rotationIntensity={0} floatIntensity={0.3}>
        <group ref={groupRef}>
          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
            <circleGeometry args={[3, 64]} />
            <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.8} />
          </mesh>
          {/* Buildings */}
          {ARRONDISSEMENTS.map((a) => {
            const h = 0.3 + ((a.price - minPrice) / (maxPrice - minPrice)) * 1.2;
            return (
              <Building
                key={a.id}
                position={[a.x * 1.5, 0, a.z * 1.5]}
                height={h}
                delay={a.id * 0.08}
              />
            );
          })}
        </group>
      </Float>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 4, 6], fov: 40 }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  );
}
