import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Vector3, BufferGeometry, Float32BufferAttribute, Points, Line } from 'three'
import * as THREE from 'three'

// Extend Three.js objects for JSX usage
extend({ Line, Points })


function CircuitPath({ points }: { points: Vector3[] }) {
  const geometry = useMemo(() => {
    const geom = new BufferGeometry().setFromPoints(points)
    return geom
  }, [points])

  return (
    <mesh>
      <tubeGeometry args={[new THREE.CatmullRomCurve3(points), 64, 0.02, 8, false]} />
      <meshBasicMaterial 
        color="#00bfa5" 
        transparent
        opacity={0.4}
      />
    </mesh>
  )
}

function ElectricSparks() {
  const pointsRef = useRef<Points>(null)
  const sparkPositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < 100; i++) {
      positions.push(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 2
      )
    }
    return new Float32Array(positions)
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        // Move sparks along circuit paths
        positions[i] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.01
        positions[i + 1] += Math.cos(state.clock.elapsedTime * 1.5 + i) * 0.005
        
        // Wrap around edges
        if (positions[i] > 15) positions[i] = -15
        if (positions[i] < -15) positions[i] = 15
        if (positions[i + 1] > 10) positions[i + 1] = -10
        if (positions[i + 1] < -10) positions[i + 1] = 10
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={sparkPositions.length / 3}
          array={sparkPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00ffbf"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function CircuitBoard() {
  // Generate circuit paths
  const circuitPaths = useMemo(() => {
    const paths = []
    
    // Horizontal paths
    for (let y = -8; y <= 8; y += 2) {
      const points = []
      for (let x = -12; x <= 12; x += 0.5) {
        points.push(new Vector3(x, y + Math.sin(x * 0.5) * 0.2, 0))
      }
      paths.push(points)
    }
    
    // Vertical paths
    for (let x = -10; x <= 10; x += 3) {
      const points = []
      for (let y = -8; y <= 8; y += 0.5) {
        points.push(new Vector3(x + Math.sin(y * 0.3) * 0.3, y, 0))
      }
      paths.push(points)
    }
    
    return paths
  }, [])

  return (
    <group>
      {circuitPaths.map((points, index) => (
        <CircuitPath 
          key={index} 
          points={points} 
        />
      ))}
      <ElectricSparks />
    </group>
  )
}

function Scene() {
  const { viewport } = useThree()
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#00bfa5" />
      <CircuitBoard />
    </>
  )
}

export function CircuitBoardBackground() {
  return (
    <div 
      className="absolute inset-0 opacity-80"
      style={{ background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}