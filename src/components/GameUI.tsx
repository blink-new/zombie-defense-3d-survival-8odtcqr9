import { useEffect, useState } from 'react'
import { useGame } from '../contexts/GameContext'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function GameUI() {
  const { state, dispatch } = useGame()
  const [roundTransition, setRoundTransition] = useState<string>('')
  const [showTransition, setShowTransition] = useState(false)

  // Handle round transitions
  useEffect(() => {
    if (state.gameStatus === 'between-rounds') {
      setRoundTransition(`Round ${state.round + 1} Starting...`)
      setShowTransition(true)
      
      const timer = setTimeout(() => {
        setShowTransition(false)
        dispatch({ type: 'START_NEXT_ROUND' })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [state.gameStatus, state.round, dispatch])

  const handleStartGame = () => {
    dispatch({ type: 'START_GAME' })
  }

  const handleResetGame = () => {
    dispatch({ type: 'RESET_GAME' })
  }

  // Menu Screen
  if (state.gameStatus === 'menu') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <Card className="w-96 bg-gray-900 border-red-900">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-red-600 mb-2">🔫 ZOMBIE DEFENSE</h1>
              <h2 className="text-xl text-red-400">3D Suburban Survival</h2>
            </div>
            
            <div className="mb-8 text-gray-300 text-left">
              <p className="mb-4">🧟‍♂️ <strong>Mission:</strong> Survive 10 rounds in a zombie-infested neighborhood</p>
              <div className="space-y-2">
                <p>🎮 <strong>Controls:</strong></p>
                <p className="pl-4">• WASD - Move</p>
                <p className="pl-4">• Mouse - Look around</p>
                <p className="pl-4">• Left Click - Shoot</p>
                <p className="pl-4">• R - Reload</p>
                <p className="pl-4">• Shift - Run</p>
              </div>
              <p className="mt-4">💀 You start with 50 HP and 20 bullets each round</p>
            </div>
            
            <Button 
              onClick={handleStartGame}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3"
            >
              🚀 START SURVIVAL
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Game Over Screen
  if (state.gameStatus === 'game-over') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <Card className="w-96 bg-gray-900 border-red-900">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-red-600 mb-2">💀 GAME OVER</h1>
              <p className="text-red-400">You have fallen to the zombie horde...</p>
            </div>
            
            <div className="mb-8 text-gray-300">
              <p className="text-2xl mb-2">Round Reached: <span className="text-red-400">{state.round}</span></p>
              <p className="text-xl mb-2">Zombies Killed: <span className="text-green-400">{state.zombiesKilled}</span></p>
              <p className="text-xl">Final Score: <span className="text-yellow-400">{state.score}</span></p>
            </div>
            
            <Button 
              onClick={handleResetGame}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3"
            >
              🔄 TRY AGAIN
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Victory Screen
  if (state.gameStatus === 'victory') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <Card className="w-96 bg-gray-900 border-green-900">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-green-600 mb-2">🎉 VICTORY!</h1>
              <p className="text-green-400">You survived all 10 rounds!</p>
            </div>
            
            <div className="mb-8 text-gray-300">
              <p className="text-2xl mb-2">🏆 SURVIVAL CHAMPION 🏆</p>
              <p className="text-xl mb-2">Zombies Killed: <span className="text-green-400">{state.zombiesKilled}</span></p>
              <p className="text-xl">Final Score: <span className="text-yellow-400">{state.score}</span></p>
            </div>
            
            <Button 
              onClick={handleResetGame}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
            >
              🎮 PLAY AGAIN
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Round Transition Screen
  if (showTransition) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600 mb-4 animate-pulse">
            {roundTransition}
          </h1>
          <p className="text-2xl text-gray-300">Get ready...</p>
        </div>
      </div>
    )
  }

  // In-Game HUD
  return (
    <>
      {/* Health Bar */}
      <div className="fixed top-4 left-4 z-40">
        <div className="bg-black bg-opacity-70 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <span className="text-red-400 font-bold">❤️ HP:</span>
            <div className="w-48">
              <Progress 
                value={(state.health / state.maxHealth) * 100} 
                className="h-4"
              />
            </div>
            <span className="text-white font-bold">{state.health}/{state.maxHealth}</span>
          </div>
        </div>
      </div>

      {/* Ammo Counter */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="bg-black bg-opacity-70 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              {state.ammo}/{state.maxAmmo}
            </div>
            <div className="text-sm text-gray-300">
              {state.isReloading ? '🔄 RELOADING...' : '🔫 AMMO'}
            </div>
          </div>
        </div>
      </div>

      {/* Round Info */}
      <div className="fixed top-4 right-4 z-40">
        <div className="bg-black bg-opacity-70 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">
            Round {state.round}
          </div>
          <div className="text-sm text-gray-300">
            Zombies: {state.zombiesKilled}/{state.zombiesInRound}
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-black bg-opacity-70 p-4 rounded-lg text-center">
          <div className="text-xl font-bold text-yellow-400">
            Score: {state.score}
          </div>
        </div>
      </div>

      {/* Crosshair */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
        <div className="w-4 h-4 border-2 border-red-500 rounded-full bg-red-500 bg-opacity-30">
          <div className="w-1 h-1 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="bg-black bg-opacity-70 p-3 rounded-lg text-xs text-gray-300">
          <p>Click to lock mouse | WASD: Move | R: Reload | Shift: Run</p>
        </div>
      </div>
    </>
  )
}