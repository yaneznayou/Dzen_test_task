export const isServerless = typeof window === 'undefined' && process.env.VERCEL === '1'

export const getWebSocketUrl = () => {
  if (isServerless) {
    return null
  }
  return process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001'
}

export const shouldUseWebSocket = () => {
  return !isServerless && typeof window !== 'undefined'
}
