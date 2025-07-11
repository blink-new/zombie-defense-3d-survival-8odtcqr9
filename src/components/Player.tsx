import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGame } from '../contexts/GameContext'
import { Vector3, Raycaster, Vector2 } from 'three'

export default function Player() {
  const { state, dispatch } = useGame()
  const { camera, gl } = useThree()
  const playerRef = useRef<THREE.Group>(null)
  const moveSpeed = 5
  const mouseSensitivity = 0.002
  
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
  })

  // Movement controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          keys.current.forward = true
          break
        case 'KeyS':
          keys.current.backward = true
          break
        case 'KeyA':
          keys.current.left = true
          break
        case 'KeyD':
          keys.current.right = true
          break
        case 'ShiftLeft':
          keys.current.shift = true
          break
        case 'KeyR':
          if (state.ammo < state.maxAmmo && !state.isReloading) {
            dispatch({ type: 'RELOAD' })
          }
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          keys.current.forward = false
          break
        case 'KeyS':
          keys.current.backward = false
          break
        case 'KeyA':
          keys.current.left = false
          break
        case 'KeyD':
          keys.current.right = false
          break
        case 'ShiftLeft':
          keys.current.shift = false
          break
      }
    }

    const handleMouseClick = (event: MouseEvent) => {
      if (event.button === 0 && state.gameStatus === 'playing') { // Left click
        if (state.ammo > 0 && !state.isReloading) {
          // Raycast to check if we hit a zombie
          const raycaster = new Raycaster()
          const mouse = new Vector2(0, 0) // Center of screen
          raycaster.setFromCamera(mouse, camera)
          
          // Check hit
          const hit = Math.random() < 0.7 // 70% hit chance for now
          dispatch({ type: 'SHOOT', hit })
          
          // Play shooting sound effect here
          console.log('BANG! 🔫')
        }
      }
    }

    // Mouse look
    const handleMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement === gl.domElement) {
        camera.rotation.y -= event.movementX * mouseSensitivity
        camera.rotation.x -= event.movementY * mouseSensitivity
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x))
      }
    }

    // Lock pointer on click
    const handleCanvasClick = () => {
      if (state.gameStatus === 'playing') {
        gl.domElement.requestPointerLock()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('click', handleMouseClick)
    document.addEventListener('mousemove', handleMouseMove)
    gl.domElement.addEventListener('click', handleCanvasClick)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('click', handleMouseClick)
      document.removeEventListener('mousemove', handleMouseMove)
      gl.domElement.removeEventListener('click', handleCanvasClick)
    }
  }, [camera, gl, state.ammo, state.maxAmmo, state.isReloading, state.gameStatus, dispatch])

  // Update player movement
  useFrame((_, delta) => {
    if (state.gameStatus !== 'playing') return

    const speed = keys.current.shift ? moveSpeed * 1.5 : moveSpeed
    const direction = new Vector3()

    if (keys.current.forward) direction.z -= 1
    if (keys.current.backward) direction.z += 1
    if (keys.current.left) direction.x -= 1
    if (keys.current.right) direction.x += 1

    direction.normalize()
    direction.multiplyScalar(speed * delta)

    // Apply camera rotation to movement
    direction.applyEuler(camera.rotation)
    direction.y = 0 // Keep player on ground

    // Update camera position
    camera.position.add(direction)
    camera.position.y = 1.8 // Eye level

    // Update player position in game state
    dispatch({
      type: 'UPDATE_PLAYER_POSITION',
      position: [camera.position.x, camera.position.y, camera.position.z],
    })
  })

  return (
    <group ref={playerRef}>
      {/* Player body (invisible, just for reference) */}
      <mesh position={[0, 0.9, 0]} visible={false}>
        <boxGeometry args={[0.6, 1.8, 0.3]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      
      {/* Weapon (simple pistol representation) */}
      <group position={[0.3, -0.2, -0.5]}>
        <mesh>
          <boxGeometry args={[0.05, 0.15, 0.3]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0, 0.1, -0.1]}>
          <boxGeometry args={[0.03, 0.05, 0.15]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
    </group>
  )
}