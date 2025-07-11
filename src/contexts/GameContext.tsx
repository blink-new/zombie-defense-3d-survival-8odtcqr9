import { createContext, useContext, useReducer, ReactNode } from 'react'

interface GameState {
  health: number
  maxHealth: number
  ammo: number
  maxAmmo: number
  round: number
  zombiesKilled: number
  zombiesInRound: number
  gameStatus: 'menu' | 'playing' | 'between-rounds' | 'game-over' | 'victory'
  roundStartTime: number
  playerPosition: [number, number, number]
  zombies: Array<{
    id: string
    position: [number, number, number]
    health: number
    speed: number
    isAlive: boolean
  }>
  isReloading: boolean
  reloadTime: number
  score: number
}

type GameAction =
  | { type: 'START_GAME' }
  | { type: 'TAKE_DAMAGE'; amount: number }
  | { type: 'SHOOT'; hit: boolean }
  | { type: 'RELOAD' }
  | { type: 'FINISH_RELOAD' }
  | { type: 'KILL_ZOMBIE'; zombieId: string }
  | { type: 'SPAWN_ZOMBIE'; zombie: GameState['zombies'][0] }
  | { type: 'UPDATE_ZOMBIE_POSITION'; zombieId: string; position: [number, number, number] }
  | { type: 'UPDATE_PLAYER_POSITION'; position: [number, number, number] }
  | { type: 'START_NEXT_ROUND' }
  | { type: 'GAME_OVER' }
  | { type: 'VICTORY' }
  | { type: 'RESET_GAME' }

const initialState: GameState = {
  health: 50,
  maxHealth: 50,
  ammo: 20,
  maxAmmo: 20,
  round: 1,
  zombiesKilled: 0,
  zombiesInRound: 0,
  gameStatus: 'menu',
  roundStartTime: 0,
  playerPosition: [0, 0, 0],
  zombies: [],
  isReloading: false,
  reloadTime: 0,
  score: 0,
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        gameStatus: 'playing',
        roundStartTime: Date.now(),
        zombiesInRound: 5 + (state.round - 1) * 2, // Increase zombies each round
      }
    
    case 'TAKE_DAMAGE': {
      const newHealth = Math.max(0, state.health - action.amount)
      return {
        ...state,
        health: newHealth,
        gameStatus: newHealth <= 0 ? 'game-over' : state.gameStatus,
      }
    }
    
    case 'SHOOT':
      if (state.ammo <= 0 || state.isReloading) return state
      return {
        ...state,
        ammo: state.ammo - 1,
        score: action.hit ? state.score + 10 : state.score,
      }
    
    case 'RELOAD':
      if (state.ammo === state.maxAmmo) return state
      return {
        ...state,
        isReloading: true,
        reloadTime: Date.now(),
      }
    
    case 'FINISH_RELOAD':
      return {
        ...state,
        ammo: state.maxAmmo,
        isReloading: false,
        reloadTime: 0,
      }
    
    case 'KILL_ZOMBIE': {
      const updatedZombies = state.zombies.map(zombie =>
        zombie.id === action.zombieId ? { ...zombie, isAlive: false } : zombie
      )
      const newZombiesKilled = state.zombiesKilled + 1
      const allZombiesDead = updatedZombies.every(zombie => !zombie.isAlive)
      
      return {
        ...state,
        zombies: updatedZombies,
        zombiesKilled: newZombiesKilled,
        score: state.score + 50,
        gameStatus: allZombiesDead && newZombiesKilled >= state.zombiesInRound
          ? (state.round >= 10 ? 'victory' : 'between-rounds')
          : state.gameStatus,
      }
    }
    
    case 'SPAWN_ZOMBIE':
      return {
        ...state,
        zombies: [...state.zombies, action.zombie],
      }
    
    case 'UPDATE_ZOMBIE_POSITION':
      return {
        ...state,
        zombies: state.zombies.map(zombie =>
          zombie.id === action.zombieId
            ? { ...zombie, position: action.position }
            : zombie
        ),
      }
    
    case 'UPDATE_PLAYER_POSITION':
      return {
        ...state,
        playerPosition: action.position,
      }
    
    case 'START_NEXT_ROUND': {
      const nextRound = state.round + 1
      return {
        ...state,
        round: nextRound,
        ammo: state.maxAmmo,
        gameStatus: 'playing',
        roundStartTime: Date.now(),
        zombiesInRound: 5 + (nextRound - 1) * 2,
        zombies: [], // Clear zombies with new round
        zombiesKilled: 0,
      }
    }
    
    case 'GAME_OVER':
      return {
        ...state,
        gameStatus: 'game-over',
      }
    
    case 'VICTORY':
      return {
        ...state,
        gameStatus: 'victory',
      }
    
    case 'RESET_GAME':
      return {
        ...initialState,
        gameStatus: 'menu',
      }
    
    default:
      return state
  }
}

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}