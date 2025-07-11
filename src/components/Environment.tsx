import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Environment() {
  const fogRef = useRef<THREE.Fog>(null)

  // Animate fog for atmosphere
  useFrame((state) => {
    if (fogRef.current) {
      fogRef.current.density = 0.02 + Math.sin(state.clock.elapsedTime * 0.5) * 0.005
    }
  })

  return (
    <>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Streets */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[200, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[8, 200]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Houses */}
      {/* House 1 */}
      <group position={[20, 0, 20]}>
        <mesh position={[0, 3, 0]} castShadow receiveShadow>
          <boxGeometry args={[10, 6, 12]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0, 5, 0]} castShadow>
          <boxGeometry args={[12, 4, 14]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Windows */}
        <mesh position={[-3, 2, 6.1]} castShadow>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#000033" />
        </mesh>
        <mesh position={[3, 2, 6.1]} castShadow>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#000033" />
        </mesh>
      </group>

      {/* House 2 */}
      <group position={[-20, 0, 20]}>
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[8, 5, 10]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 4.5, 0]} castShadow>
          <boxGeometry args={[10, 3, 12]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Windows */}
        <mesh position={[-2, 2, 5.1]} castShadow>
          <boxGeometry args={[1.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#000033" />
        </mesh>
        <mesh position={[2, 2, 5.1]} castShadow>
          <boxGeometry args={[1.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#000033" />
        </mesh>
      </group>

      {/* Street lights */}
      <group position={[10, 0, 10]}>
        <mesh position={[0, 4, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 8]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0, 8, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 1]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        <pointLight position={[0, 7.5, 0]} intensity={2} distance={20} color="#ffaa00" />
      </group>

      <group position={[-10, 0, 10]}>
        <mesh position={[0, 4, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 8]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0, 8, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 1]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        <pointLight position={[0, 7.5, 0]} intensity={2} distance={20} color="#ffaa00" />
      </group>

      {/* Abandoned car */}
      <group position={[5, 0, 0]}>
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 1.5, 2]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        <mesh position={[0, 1.8, 0]} castShadow>
          <boxGeometry args={[3, 1, 1.8]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
        {/* Car wheels */}
        <mesh position={[1.5, 0.4, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[1.5, 0.4, -0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[-1.5, 0.4, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[-1.5, 0.4, -0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
    </>
  )
}