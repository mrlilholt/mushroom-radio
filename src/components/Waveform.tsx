"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function Waveform({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) {
  const meshRef = useRef<any>(null);
  const [dataArray, setDataArray] = useState(new Uint8Array(32));
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 64;
      const source = audioCtx.createMediaElementSource(audioRef.current);
      source.connect(analyserNode);
      analyserNode.connect(audioCtx.destination);
      setAnalyser(analyserNode);
    }
  }, [audioRef]);

  useFrame(() => {
    if (analyser) {
      const newArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(newArray);
      setDataArray(newArray);
    }
  });

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      {dataArray.map((value, index) => (
        <mesh key={index} position={[index * 0.3 - dataArray.length / 6, value * 0.01, 0]} ref={meshRef}>
          <boxGeometry args={[0.2, value * 0.05, 0.2]} />
          <meshStandardMaterial color={`hsl(${value}, 100%, 70%)`} />
        </mesh>
      ))}
    </Canvas>
  );
}
