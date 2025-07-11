import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

import { Vector3 } from 'three'
import { useGame } from '../contexts/GameContext'
import Environment from './Environment'
import Player from './Player'
import Zombie from './Zombie'
import { generateZombieSpawns } from '../utils/gameUtils'

export default function ZombieGame() {
  const { state, dispatch } = useGame()

  // Spawn zombies at the start of each round
  useEffect(() => {
    if (state.gameStatus === 'playing' && state.zombies.length < state.zombiesInRound) {
      const spawnPositions = generateZombieSpawns(state.zombiesInRound - state.zombies.length)
      
      spawnPositions.forEach((position, index) => {
        setTimeout(() => {
          dispatch({
            type: 'SPAWN_ZOMBIE',
            zombie: {
              id: `zombie-${state.round}-${Date.now()}-${index}`,
              position,
              health: 100,
              speed: 1 + (state.round - 1) * 0.2, // Increase speed each round
              isAlive: true,
            },
          })
        }, index * 500) // Stagger spawns
      })
    }
  }, [state.gameStatus, state.round, state.zombies.length, state.zombiesInRound, dispatch])

  // Game loop
  useFrame((_, delta) => {
    if (state.gameStatus !== 'playing') return

    // Update zombie AI
    state.zombies.forEach(zombie => {
      if (!zombie.isAlive) return

      // Move zombie towards player
      const zombiePos = new Vector3(...zombie.position)
      const playerPos = new Vector3(...state.playerPosition)
      const direction = playerPos.clone().sub(zombiePos).normalize()
      
      const newPosition = zombiePos.add(direction.multiplyScalar(zombie.speed * delta))
      
      dispatch({
        type: 'UPDATE_ZOMBIE_POSITION',
        zombieId: zombie.id,
        position: [newPosition.x, newPosition.y, newPosition.z],
      })

      // Check if zombie is close to player for damage
      const distance = zombiePos.distanceTo(playerPos)
      if (distance < 2) {
        dispatch({ type: 'TAKE_DAMAGE', amount: 10 })
      }
    })

    // Handle reload timing
    if (state.isReloading && Date.now() - state.reloadTime > 2000) {
      dispatch({ type: 'FINISH_RELOAD' })
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} />

      {/* Environment */}
      <fog attach="fog" args={['#1a1a1a', 30, 100]} />
      
      {/* Simple sky color */}
      <color attach="background" args={['#0a0a0a']} />

      {/* Game Objects */}
      <Environment />
      <Player />
      
      {/* Zombies */}
      {state.zombies.map(zombie => (
        zombie.isAlive && (
          <Zombie
            key={zombie.id}
            id={zombie.id}
            position={zombie.position}
            health={zombie.health}
            speed={zombie.speed}
          />
        )
      ))}


    </>
  )
}