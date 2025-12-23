
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import Loader from "./Loader";

// ---- Atmosphere Glow ----
const Atmosphere = () => (
  <mesh scale={1.15}>
    <sphereGeometry args={[1, 64, 64]} />
    <meshBasicMaterial
      color="#4EA1FF"
      transparent
      opacity={0.15}
      side={THREE.BackSide}
    />
  </mesh>
);

// ---- Cloud Layer (placeholder) ----
const Clouds = ({ paused }) => {
  const cloudRef = useRef();

  // Use a fully transparent texture instead of missing image
  const cloudTexture = new THREE.Texture();

  useFrame(() => {
    if (!paused) cloudRef.current.rotation.y += 0.0006;
  });

  return (
    <mesh ref={cloudRef} scale={1.02}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={cloudTexture} transparent opacity={0.35} />
    </mesh>
  );
};

// ---- Dotted Globe ----
const DottedGlobe = () => {
  const dots = [];
  for (let lat = -80; lat <= 80; lat += 10) {
    for (let lon = -180; lon <= 180; lon += 10) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);

      dots.push(
        <mesh position={[x, y, z]} key={`${lat}-${lon}`} scale={0.01}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#4ea1ff" />
        </mesh>
      );
    }
  }
  return <group>{dots}</group>;
};

// ---- Country Marker ----
const Marker = ({ lat, lon }) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -Math.sin(phi) * Math.cos(theta);
  const y = Math.cos(phi);
  const z = Math.sin(phi) * Math.sin(theta);

  return (
    <mesh position={[x * 1.02, y * 1.02, z * 1.02]}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshStandardMaterial color="#ff4f81" />
    </mesh>
  );
};


// ---- Travel Line ----
// const TravelLine = ({ start, end }) => {
//   const curve = new THREE.QuadraticBezierCurve3(
//     new THREE.Vector3(...start),
//     new THREE.Vector3(0, 1.5, 0),
//     new THREE.Vector3(...end)
//   );

//   const points = curve.getPoints(60);
//   const geometry = new THREE.BufferGeometry().setFromPoints(points);

//   return (
//     <line>
//       <bufferGeometry attach="geometry" {...geometry} />
//       <lineBasicMaterial color="#4ea1ff" linewidth={2} />
//     </line>
//   );
// };


// ---- Globe Container ----
const Earth = ({ paused }) => {
  const earthRef = useRef();
  useFrame(() => {
    if (!paused) earthRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={earthRef}>
      <DottedGlobe />

      {/* Important Markers */}
      <Marker lat={5.6037} lon={-0.1870} /> {/* Accra */}
      <Marker lat={37.7749} lon={-122.4194} /> {/* San Francisco */}
      <Marker lat={51.5074} lon={-0.1278} /> {/* London */}
      <Marker lat={-33.9249} lon={18.4241} />    {/* Cape Town */}
      <Marker lat={39.9042} lon={116.4074} />    {/* Beijing */}
      <Marker lat={35.6762} lon={139.6503} />    {/* Tokyo */}
      <Marker lat={6.5244} lon={3.3792} />       {/* Lagos */}
      <Marker lat={30.0444} lon={31.2357} />     {/* Cairo */}
      <Marker lat={45.4215} lon={-75.6972} />    {/* Ottawa */}
      <Marker lat={40.7128} lon={-74.0060} />    {/* New York */}
      <Marker lat={36.7783} lon={-119.4179} />   {/* California */}
      <Marker lat={55.6761} lon={12.5683} />     {/* Copenhagen */}
      <Marker lat={-12.0464} lon={-77.0428} />   {/* Lima */}

      {/* Travel Arcs */}
      {/* <TravelLine start={[0.1, 0.8, 0.2]} end={[-0.5, -0.2, 0.5]} /> */}
      {/* <TravelLine start={[0.2, -0.5, 0.8]} end={[0.6, 0.4, -0.3]} /> */}

      <Clouds paused={paused} />
      <Atmosphere />
    </group>
  );
};

// ---- Main Globe Component ----
export default function StripeGlobe() {
  const containerRef = useRef();
  const [paused, setPaused] = useState(false);
  const [visibleOnce, setVisibleOnce] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleOnce(true); // Load canvas only once
          setPaused(false);
        } else {
          setPaused(true); // Pause animation when out of view
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);


  return (
    <>
      <div ref={containerRef} style={{ width: "100%", height: "100svh", cursor: "grab" }}>
        { visibleOnce && (
          <Canvas
            onCreated={() => {
              setIsLoaded(true);
            }}
            camera={{ position: [0, 0, 3] }}
            frameloop={paused ? "demand" : "always"} // Pause GPU updates when out of view
          >
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 1]} intensity={1} />
            <Earth paused={paused} />
            <Stars radius={50} depth={20} count={1000} factor={2} />
            <OrbitControls
              enableZoom={false}
              autoRotate={!paused}
              autoRotateSpeed={0.3}
            />
          </Canvas>
        )}
        
      </div>
      {
        !isLoaded && <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 place-items-center">
          <Loader size={30} />
          <span className="text-white">Loading...</span>
        </div>
      }
    </>
  );
}
