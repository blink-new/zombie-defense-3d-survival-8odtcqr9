import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Updated to fix fetch issues - timestamp: 1752264420
export default function SuburbanEnvironment() {
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

      {/* House 3 */}
      <group position={[20, 0, -20]}>
        <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[12, 7, 10]} />
          <meshStandardMaterial color="#A0522D" />
        </mesh>
        <mesh position={[0, 6.5, 0]} castShadow>
          <boxGeometry args={[14, 3, 12]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Windows */}
        <mesh position={[-4, 3, 5.1]} castShadow>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#000033" />
        </mesh>
        <mesh position={[0, 3, 5.1]} castShadow>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#000033" />
        </mesh>
        <mesh position={[4, 3, 5.1]} castShadow>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#000033" />
        </mesh>
      </group>

      {/* House 4 */}
      <group position={[-20, 0, -20]}>
        <mesh position={[0, 3, 0]} castShadow receiveShadow>
          <boxGeometry args={[9, 6, 11]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 6, 0]} castShadow>
          <boxGeometry args={[11, 4, 13]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Windows */}
        <mesh position={[-2.5, 2.5, 5.6]} castShadow>
          <boxGeometry args={[1.8, 1.8, 0.1]} />
          <meshStandardMaterial color="#000033" />
        </mesh>
        <mesh position={[2.5, 2.5, 5.6]} castShadow>
          <boxGeometry args={[1.8, 1.8, 0.1]} />
          <meshStandardMaterial color="#000033" />
        </mesh>
      </group>

      {/* Fences */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={`fence-${i}`}
          position={[15 + i * 1.2, 1, 10]}
          castShadow
        >
          <boxGeometry args={[0.2, 2, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}

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

      <group position={[10, 0, -10]}>
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

      <group position={[-10, 0, -10]}>
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

      {/* Abandoned cars */}
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

      <group position={[-8, 0, -5]}>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.5, 1.8, 2.2]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <mesh position={[0, 2.1, 0]} castShadow>
          <boxGeometry args={[2.8, 1.2, 2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Car wheels */}
        <mesh position={[1.3, 0.35, 0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.25]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[1.3, 0.35, -0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.25]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[-1.3, 0.35, 0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.25]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[-1.3, 0.35, -0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.25]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>

      {/* Trash cans and debris */}
      <group position={[3, 0, 8]}>
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, 1.5]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>

      <group position={[-7, 0, 6]}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 1.2]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      </group>

      {/* Add some atmospheric particles/dust */}
      <group position={[0, 5, 0]}>
        {Array.from({ length: 50 }, (_, i) => (
          <mesh
            key={`particle-${i}`}
            position={[
              (Math.random() - 0.5) * 100,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 100
            ]}
          >
            <boxGeometry args={[0.05, 0.05, 0.05]} />
            <meshStandardMaterial color="#999999" opacity={0.3} transparent />
          </mesh>
        ))}
      </group>
    </>
  )
}