const mongoose = require('mongoose')

const gameModel = mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
})

const Game = mongoose.model('Game', gameModel)

module.exports = Game