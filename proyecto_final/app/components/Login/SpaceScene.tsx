"use client"
import { Canvas } from '@react-three/fiber'
import { Stars, MeshDistortMaterial } from '@react-three/drei'
import type { PlayerData } from './LoginForm'
import styles from './SpaceScene.module.css'
import { useRef } from 'react'
import * as THREE from 'three'

const FALLBACK_AVATAR = 'https://static.wikia.nocookie.net/roblox/images/3/3b/NOOB%21.png/revision/latest/scale-to-width-down/284?cb=20210630174226'

interface Props {
  showAvatar: boolean
  avatarData: PlayerData | null
  isLoading?: boolean
}

export default function SpaceScene({ showAvatar, avatarData, isLoading = false }: Props) {
  const planetRef = useRef<THREE.Mesh>(null)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = e.nativeEvent.offsetX * 0.001
      planetRef.current.rotation.x = e.nativeEvent.offsetY * 0.001
    }
  }

  return (
    <div className={styles.canvasWrapper}>
      <Canvas 
        camera={{ position: [0, 0, 4.5], fov: 45 }} 
        dpr={[1, 2]}
        onPointerMove={handlePointerMove}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#8b5cf6" />
        
        <Stars radius={80} depth={40} count={4000} factor={3} saturation={0} fade speed={1.2} />

        <mesh ref={planetRef} scale={1.6}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={isLoading ? "#10b981" : "#3b82f6"}
            attach="material"
            distort={isLoading ? 0.5 : 0.35}
            speed={isLoading ? 3 : 1.5}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
      </Canvas>

      <div className={`${styles.avatarOverlay} ${showAvatar ? styles.visible : ''}`}>
        {isLoading ? (
          <div className={styles.loadingAvatar}>
            <div className={styles.spinner3D} />
            <span>Conectando...</span>
          </div>
        ) : avatarData ? (
          <div className={styles.avatarWrapper}>
            <div className={styles.glow} />
            <img
              src={avatarData.avatar}
              alt={avatarData.username}
              className={styles.avatarImage}
              onError={(e) => {
                // ✅ Fallback si la imagen falla al cargar
                e.currentTarget.src = FALLBACK_AVATAR
              }}
            />
            <div className={styles.avatarTitle}>{avatarData.title}</div>
            {/* ❌ Badge @usuario ELIMINADO según requerimiento */}
          </div>
        ) : (
          <div className={styles.hintText}>
            👆 Escribe tu usuario o correo para ver tu avatar
          </div>
        )}
      </div>
    </div>
  )
}