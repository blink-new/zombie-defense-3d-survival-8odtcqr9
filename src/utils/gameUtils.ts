/**
 * Generate random spawn positions for zombies around the player
 */
export function generateZombieSpawns(count: number): Array<[number, number, number]> {
  const spawns: Array<[number, number, number]> = []
  const minDistance = 15
  const maxDistance = 30
  
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
    const distance = minDistance + Math.random() * (maxDistance - minDistance)
    
    const x = Math.cos(angle) * distance
    const z = Math.sin(angle) * distance
    const y = 0
    
    spawns.push([x, y, z])
  }
  
  return spawns
}

/**
 * Calculate distance between two 3D points
 */
export function distance3D(
  pos1: [number, number, number],
  pos2: [number, number, number]
): number {
  const dx = pos1[0] - pos2[0]
  const dy = pos1[1] - pos2[1]
  const dz = pos1[2] - pos2[2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

/**
 * Generate random position within bounds
 */
export function randomPosition(
  bounds: { x: number; y: number; z: number }
): [number, number, number] {
  return [
    (Math.random() - 0.5) * bounds.x,
    (Math.random() - 0.5) * bounds.y,
    (Math.random() - 0.5) * bounds.z,
  ]
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

/**
 * Generate a unique ID for game objects
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Calculate zombie stats based on round
 */
export function getZombieStats(round: number) {
  return {
    health: 100 + (round - 1) * 10,
    speed: 1 + (round - 1) * 0.2,
    damage: 10 + (round - 1) * 2,
    count: 5 + (round - 1) * 2,
  }
}

/**
 * Play sound effect (placeholder for actual sound implementation)
 */
export function playSound(soundName: string, volume: number = 1) {
  // Placeholder for sound effects
  console.log(`🔊 Playing sound: ${soundName} at volume ${volume}`)
  
  // In a real implementation, you would load and play audio files
  // For now, we'll just log the sound events
  switch (soundName) {
    case 'shoot':
      console.log('🔫 BANG!')
      break
    case 'reload':
      console.log('🔄 *click click*')
      break
    case 'zombie_hit':
      console.log('🧟 ARRRGGHHH!')
      break
    case 'zombie_death':
      console.log('💀 *thud*')
      break
    case 'player_hurt':
      console.log('😵 OOF!')
      break
    case 'round_start':
      console.log('🚨 Round starting!')
      break
    case 'victory':
      console.log('🎉 VICTORY!')
      break
    case 'game_over':
      console.log('💀 Game Over...')
      break
  }
}

/**
 * Screen shake effect helper
 */
export function shakeScreen(intensity: number = 1, duration: number = 100) {
  // Placeholder for screen shake implementation
  console.log(`📳 Screen shake: intensity ${intensity}, duration ${duration}ms`)
  
  // In a real implementation, you would manipulate the camera position
  // to create a shake effect
}

/**
 * Generate blood particle effect positions
 */
export function generateBloodParticles(
  position: [number, number, number],
  count: number = 10
): Array<[number, number, number]> {
  const particles: Array<[number, number, number]> = []
  
  for (let i = 0; i < count; i++) {
    const offset = [
      (Math.random() - 0.5) * 2,
      Math.random() * 2,
      (Math.random() - 0.5) * 2,
    ]
    
    particles.push([
      position[0] + offset[0],
      position[1] + offset[1],
      position[2] + offset[2],
    ])
  }
  
  return particles
}