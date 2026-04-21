"use client"
import { Canvas } from '@react-three/fiber'
import { Stars, MeshDistortMaterial } from '@react-three/drei'
import type { PlayerData } from './LoginForm'
import styles from './SpaceScene.module.css'
import { useRef } from 'react'
import * as THREE from 'three'

interface Props {
  showAvatar: boolean
  avatarData: PlayerData | null
}

export default function SpaceScene({ showAvatar, avatarData }: Props) {
  const planetRef = useRef<THREE.Mesh>(null)

  return (
    <div className={styles.canvasWrapper}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#8b5cf6" />
        
        <Stars radius={80} depth={40} count={4000} factor={3} saturation={0} fade speed={1.2} />

        <mesh ref={planetRef} scale={1.6}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#3b82f6"
            attach="material"
            distort={0.35}
            speed={1.5}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
      </Canvas>

      <div className={`${styles.avatarOverlay} ${showAvatar ? styles.visible : ''}`}>
        {avatarData && (
          <div className={styles.avatarWrapper}>
            <div className={styles.glow} />
            <img
              src={avatarData.avatar}
              alt={avatarData.username}
              className={styles.avatarImage}
            />
            <div className={styles.avatarTitle}>{avatarData.title}</div>
          </div>
        )}
      </div>
    </div>
  )
}