require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDb = require('./db')
const router = require('./routes/index');
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(notFound)
app.use(errorHandler)
let server
const start = async () => {
    try {
        connectDb()
        server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()

const io = require('socket.io')(server, {
    pingTimeout: 40000,
    cors: {
        origin: '*',
    }
})

io.on('connection', (socket) => {
    console.log('User Connected')

    socket.on('joinRoom', (roomCode) => {
        console.log(`A user joined the room ${roomCode}`)
        socket.join(roomCode);
    });

    socket.on('play', ({id, roomCode}) => {
        console.log(`play at ${id} to ${roomCode}`);
        socket.broadcast.to(roomCode).emit('updateGame', id)
    })

    socket.on('change', ({room, name}) => {
        console.log(`Change player ${name} to ${room._id} room`);
        io.in(room._id).emit('updateName', name)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})