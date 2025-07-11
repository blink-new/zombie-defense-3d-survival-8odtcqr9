import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import ZombieGame from './components/ZombieGame'
import GameUI from './components/GameUI'
import { GameProvider } from './contexts/GameContext'

function App() {
  return (
    <GameProvider>
      <div className="w-full h-screen bg-black overflow-hidden">
        <Canvas
          shadows
          camera={{ position: [0, 1.8, 5], fov: 75 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <ZombieGame />
          </Suspense>
        </Canvas>
        <GameUI />
      </div>
    </GameProvider>
  )
}

export default App