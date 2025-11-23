import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useCMS } from '../../context/CMSContext';

// Augment both global JSX and React.JSX to ensure R3F elements are recognized
// regardless of the React type definitions version being used.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      icosahedronGeometry: any;
      meshBasicMaterial: any;
      instancedMesh: any;
      dodecahedronGeometry: any;
      ambientLight: any;
      pointLight: any;
      color: any;
    }
  }
}

// Fix for React 18+ types where JSX might be namespaced under React
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      icosahedronGeometry: any;
      meshBasicMaterial: any;
      instancedMesh: any;
      dodecahedronGeometry: any;
      ambientLight: any;
      pointLight: any;
      color: any;
    }
  }
}

const HeroObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial 
          color="#00f0ff"
          wireframe
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={1}
        />
      </mesh>
      <mesh scale={1.7}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#7000ff" wireframe transparent opacity={0.2} />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const count = 500;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate random positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const SceneContent = () => {
    const { config } = useCMS();
    
    if (!config.enable3D) return null;

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <color attach="background" args={['#030508']} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
            
            {config.performanceMode === 'high' && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
            <HeroObject />
            {config.performanceMode !== 'low' && <Particles />}
            <Environment preset="city" />
        </>
    );
};

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full opacity-60">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <React.Suspense fallback={null}>
            <SceneContent />
        </React.Suspense>
      </Canvas>
    </div>
  );
}