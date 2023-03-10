const express = require('express')
const gameController = require('../controllers/gameController')
const router = express.Router()

router.post('/', gameController.createGame)
router.delete('/', gameController.finishGame)

module.exports = router
