const { Server } = require('socket.io')
const http = require('http')

const server = http.createServer()

// Настройка CORS для локальной разработки и продакшна
const allowedOrigins = [
  "http://localhost:3000",
  "https://localhost:3000",
  // Railway автоматически добавит свои домены через переменные окружения
]

// Добавляем продакшн URL из переменных окружения
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL)
}

// Разрешаем все HTTPS домены Railway в продакшне
const corsOrigin = process.env.NODE_ENV === 'production' 
  ? (origin, callback) => {
      // Разрешаем Railway домены и наши указанные домены
      if (!origin || allowedOrigins.includes(origin) || origin.includes('.railway.app')) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  : allowedOrigins

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
    credentials: true
  }
})

let activeSessions = 0

io.on('connection', (socket) => {
  activeSessions++
  console.log(`User connected. Active sessions: ${activeSessions}`)
  
  // Send current active sessions count to all clients
  io.emit('activeSessions', activeSessions)

  socket.on('disconnect', () => {
    activeSessions--
    console.log(`User disconnected. Active sessions: ${activeSessions}`)
    
    // Send updated active sessions count to all clients
    io.emit('activeSessions', activeSessions)
  })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`)
})
