import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Plane, Cylinder } from '@react-three/drei'


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
      <Plane
        args={[200, 200]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#2a2a2a" />
      </Plane>

      {/* Streets */}
      <Plane
        args={[200, 8]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>

      <Plane
        args={[8, 200]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>

      {/* Houses */}
      {/* House 1 */}
      <group position={[20, 0, 20]}>
        <Box args={[10, 6, 12]} position={[0, 3, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#654321" />
        </Box>
        <Box args={[12, 4, 14]} position={[0, 5, 0]} castShadow>
          <meshStandardMaterial color="#8B4513" />
        </Box>
        {/* Windows */}
        <Box args={[2, 2, 0.1]} position={[-3, 2, 6.1]} castShadow>
          <meshStandardMaterial color="#000033" />
        </Box>
        <Box args={[2, 2, 0.1]} position={[3, 2, 6.1]} castShadow>
          <meshStandardMaterial color="#000033" />
        </Box>
      </group>

      {/* House 2 */}
      <group position={[-20, 0, 20]}>
        <Box args={[8, 5, 10]} position={[0, 2.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#8B4513" />
        </Box>
        <Box args={[10, 3, 12]} position={[0, 4.5, 0]} castShadow>
          <meshStandardMaterial color="#654321" />
        </Box>
        {/* Windows */}
        <Box args={[1.5, 1.5, 0.1]} position={[-2, 2, 5.1]} castShadow>
          <meshStandardMaterial color="#000033" />
        </Box>
        <Box args={[1.5, 1.5, 0.1]} position={[2, 2, 5.1]} castShadow>
          <meshStandardMaterial color="#000033" />
        </Box>
      </group>

      {/* House 3 */}
      <group position={[20, 0, -20]}>
        <Box args={[12, 7, 10]} position={[0, 3.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#A0522D" />
        </Box>
        <Box args={[14, 3, 12]} position={[0, 6.5, 0]} castShadow>
          <meshStandardMaterial color="#654321" />
        </Box>
        {/* Windows */}
        <Box args={[2, 2, 0.1]} position={[-4, 3, 5.1]} castShadow>
          <meshStandardMaterial color="#000033" />
        </Box>
        <Box args={[2, 2, 0.1]} position={[0, 3, 5.1]} castShadow>
          <meshStandardMaterial color="#000033" />
        </Box>
        <Box args={[2, 2, 0.1]} position={[4, 3, 5.1]} castShadow>
          <meshStandardMaterial color="#000033" />
        </Box>
      </group>

      {/* House 4 */}
      <group position={[-20, 0, -20]}>
        <Box args={[9, 6, 11]} position={[0, 3, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#8B4513" />
        </Box>
        <Box args={[11, 4, 13]} position={[0, 6, 0]} castShadow>
          <meshStandardMaterial color="#654321" />
        </Box>
        {/* Windows */}
        <Box args={[1.8, 1.8, 0.1]} position={[-2.5, 2.5, 5.6]} castShadow>
          <meshStandardMaterial color="#000033" />
        </Box>
        <Box args={[1.8, 1.8, 0.1]} position={[2.5, 2.5, 5.6]} castShadow>
          <meshStandardMaterial color="#000033" />
        </Box>
      </group>

      {/* Fences */}
      {Array.from({ length: 20 }, (_, i) => (
        <Box
          key={`fence-${i}`}
          args={[0.2, 2, 1]}
          position={[15 + i * 1.2, 1, 10]}
          castShadow
        >
          <meshStandardMaterial color="#8B4513" />
        </Box>
      ))}

      {/* Street lights */}
      <group position={[10, 0, 10]}>
        <Cylinder args={[0.2, 0.2, 8]} position={[0, 4, 0]} castShadow>
          <meshStandardMaterial color="#333333" />
        </Cylinder>
        <Box args={[1, 0.5, 1]} position={[0, 8, 0]} castShadow>
          <meshStandardMaterial color="#444444" />
        </Box>
        <pointLight position={[0, 7.5, 0]} intensity={2} distance={20} color="#ffaa00" />
      </group>

      <group position={[-10, 0, 10]}>
        <Cylinder args={[0.2, 0.2, 8]} position={[0, 4, 0]} castShadow>
          <meshStandardMaterial color="#333333" />
        </Cylinder>
        <Box args={[1, 0.5, 1]} position={[0, 8, 0]} castShadow>
          <meshStandardMaterial color="#444444" />
        </Box>
        <pointLight position={[0, 7.5, 0]} intensity={2} distance={20} color="#ffaa00" />
      </group>

      <group position={[10, 0, -10]}>
        <Cylinder args={[0.2, 0.2, 8]} position={[0, 4, 0]} castShadow>
          <meshStandardMaterial color="#333333" />
        </Cylinder>
        <Box args={[1, 0.5, 1]} position={[0, 8, 0]} castShadow>
          <meshStandardMaterial color="#444444" />
        </Box>
        <pointLight position={[0, 7.5, 0]} intensity={2} distance={20} color="#ffaa00" />
      </group>

      <group position={[-10, 0, -10]}>
        <Cylinder args={[0.2, 0.2, 8]} position={[0, 4, 0]} castShadow>
          <meshStandardMaterial color="#333333" />
        </Cylinder>
        <Box args={[1, 0.5, 1]} position={[0, 8, 0]} castShadow>
          <meshStandardMaterial color="#444444" />
        </Box>
        <pointLight position={[0, 7.5, 0]} intensity={2} distance={20} color="#ffaa00" />
      </group>

      {/* Abandoned cars */}
      <group position={[5, 0, 0]}>
        <Box args={[4, 1.5, 2]} position={[0, 0.75, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#444444" />
        </Box>
        <Box args={[3, 1, 1.8]} position={[0, 1.8, 0]} castShadow>
          <meshStandardMaterial color="#666666" />
        </Box>
        {/* Car wheels */}
        <Cylinder args={[0.4, 0.4, 0.3]} position={[1.5, 0.4, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial color="#222222" />
        </Cylinder>
        <Cylinder args={[0.4, 0.4, 0.3]} position={[1.5, 0.4, -0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial color="#222222" />
        </Cylinder>
        <Cylinder args={[0.4, 0.4, 0.3]} position={[-1.5, 0.4, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial color="#222222" />
        </Cylinder>
        <Cylinder args={[0.4, 0.4, 0.3]} position={[-1.5, 0.4, -0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial color="#222222" />
        </Cylinder>
      </group>

      <group position={[-8, 0, -5]}>
        <Box args={[3.5, 1.8, 2.2]} position={[0, 0.9, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#8B0000" />
        </Box>
        <Box args={[2.8, 1.2, 2]} position={[0, 2.1, 0]} castShadow>
          <meshStandardMaterial color="#654321" />
        </Box>
        {/* Car wheels */}
        <Cylinder args={[0.35, 0.35, 0.25]} position={[1.3, 0.35, 0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial color="#222222" />
        </Cylinder>
        <Cylinder args={[0.35, 0.35, 0.25]} position={[1.3, 0.35, -0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial color="#222222" />
        </Cylinder>
        <Cylinder args={[0.35, 0.35, 0.25]} position={[-1.3, 0.35, 0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial color="#222222" />
        </Cylinder>
        <Cylinder args={[0.35, 0.35, 0.25]} position={[-1.3, 0.35, -0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial color="#222222" />
        </Cylinder>
      </group>

      {/* Trash cans and debris */}
      <group position={[3, 0, 8]}>
        <Cylinder args={[0.5, 0.5, 1.5]} position={[0, 0.75, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#333333" />
        </Cylinder>
      </group>

      <group position={[-7, 0, 6]}>
        <Cylinder args={[0.4, 0.4, 1.2]} position={[0, 0.6, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#666666" />
        </Cylinder>
      </group>

      {/* Add some atmospheric particles/dust */}
      <group position={[0, 5, 0]}>
        {Array.from({ length: 50 }, (_, i) => (
          <Box
            key={`particle-${i}`}
            args={[0.05, 0.05, 0.05]}
            position={[
              (Math.random() - 0.5) * 100,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 100
            ]}
          >
            <meshStandardMaterial color="#999999" opacity={0.3} transparent />
          </Box>
        ))}
      </group>
    </>
  )
}