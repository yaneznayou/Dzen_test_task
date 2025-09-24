const { Server } = require('socket.io')
const http = require('http')

const server = http.createServer()
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
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
