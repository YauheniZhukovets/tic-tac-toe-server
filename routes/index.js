const Router = require('express')
const router = new Router()
const userRouter = require('./userRoutes')
const gameRouter = require('./gameRoutes')

router.use('/user', userRouter)
router.use('/game', gameRouter)

module.exports = router