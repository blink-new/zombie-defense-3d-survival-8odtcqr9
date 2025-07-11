import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGame } from '../contexts/GameContext'
import { Vector3 } from 'three'

interface ZombieProps {
  id: string
  position: [number, number, number]
  health: number
  speed: number
}

export default function Zombie({ id, position, health }: ZombieProps) {
  const { state, dispatch } = useGame()
  const zombieRef = useRef<THREE.Group>(null)
  const lastGrowlTime = useRef<number>(0)

  // Animate zombie
  useFrame(() => {
    if (!zombieRef.current) return

    // Simple bobbing animation
    const time = Date.now() * 0.003
    zombieRef.current.position.y = Math.sin(time + parseFloat(id.split('-')[1]) * 0.1) * 0.1 + 0.9

    // Rotate towards player occasionally
    if (Math.random() < 0.02) {
      const playerPos = new Vector3(...state.playerPosition)
      const zombiePos = new Vector3(...position)
      const direction = playerPos.sub(zombiePos).normalize()
      const angle = Math.atan2(direction.x, direction.z)
      zombieRef.current.rotation.y = angle + Math.PI
    }

    // Growl occasionally
    if (Date.now() - lastGrowlTime.current > 3000 + Math.random() * 5000) {
      console.log(`🧟 Zombie ${id} growls: "Graaaaahhh!"`)
      lastGrowlTime.current = Date.now()
    }
  })

  // Handle being shot
  useEffect(() => {
    const handleShot = () => {
      // Check if this zombie was hit (simplified hit detection)
      const playerPos = new Vector3(...state.playerPosition)
      const zombiePos = new Vector3(...position)
      const distance = playerPos.distanceTo(zombiePos)
      
      if (distance < 15 && Math.random() < 0.3) { // 30% chance to hit this zombie if in range
        console.log(`🎯 Zombie ${id} hit! "ARRRGGHHH!"`)
        dispatch({ type: 'KILL_ZOMBIE', zombieId: id })
      }
    }

    // Listen for shots (this is a simplified implementation)
    // In a real game, you'd use proper raycast collision detection
    window.addEventListener('zombieShot', handleShot)
    
    return () => {
      window.removeEventListener('zombieShot', handleShot)
    }
  }, [id, position, state.playerPosition, dispatch])

  return (
    <group ref={zombieRef} position={position}>
      {/* Zombie body */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 1.8, 0.3]} />
        <meshStandardMaterial color="#4a5d23" />
      </mesh>
      
      {/* Zombie head */}
      <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#6b4423" />
      </mesh>
      
      {/* Zombie eyes (glowing red) */}
      <mesh position={[-0.1, 1.65, 0.15]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.1, 1.65, 0.15]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Zombie arms */}
      <mesh position={[-0.35, 1.2, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#4a5d23" />
      </mesh>
      <mesh position={[0.35, 1.2, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#4a5d23" />
      </mesh>
      
      {/* Zombie hands */}
      <mesh position={[-0.45, 0.9, 0]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#6b4423" />
      </mesh>
      <mesh position={[0.45, 0.9, 0]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#6b4423" />
      </mesh>
      
      {/* Zombie legs */}
      <mesh position={[-0.15, 0.4, 0]} castShadow>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color="#4a5d23" />
      </mesh>
      <mesh position={[0.15, 0.4, 0]} castShadow>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color="#4a5d23" />
      </mesh>
      
      {/* Zombie feet */}
      <mesh position={[-0.15, 0.05, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#2d3416" />
      </mesh>
      <mesh position={[0.15, 0.05, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#2d3416" />
      </mesh>

      {/* Eerie glow around zombie */}
      <pointLight 
        position={[0, 1, 0]} 
        intensity={0.5} 
        distance={3} 
        color="#ff0000"
        decay={2}
      />
      
      {/* Health indicator (small red bar above head) */}
      <group position={[0, 2.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.1, 0.02]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0, 0, 0.01]} scale={[health / 100, 1, 1]}>
          <boxGeometry args={[0.8, 0.08, 0.02]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
      </group>
    </group>
  )
}