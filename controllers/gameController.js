const Game = require('../models/gameModel')

class GameController {
    async createGame(req, res) {
        const {ownId, userId} = req.body

        if (!userId || !ownId) {
            return res.statusCode(400).send({message: 'Нет пары игроков'})
        }

        const candidateGame = await Game.find({
            $and: [
                {users: {$elemMatch: {$eq: ownId}}},
                {users: {$elemMatch: {$eq: userId}}},
            ]
        }).populate('users')


        try {
            if (candidateGame.length) {
                res.status(200).send(candidateGame[0])
            } else {
                const createdGame = await Game.create({users: [ownId, userId]})
                const fullInfoGame = await Game.findOne({_id: createdGame._id})
                    .populate('users')
                res.status(200).send(fullInfoGame)
            }
        } catch (e) {
            res.status(400).send({message: 'Игра не создана, попробуйте позже'})
        }
    }

    async finishGame(req, res) {
        const {id} = req.query

        if (!id) {
            return res.statusCode(400).send({message: 'Не указан id игры'})
        }

        try {
            const endedGame = await Game.findByIdAndRemove(id)
            res.status(200).send(endedGame)
        } catch (error) {
            res.status(400).send({message: 'Ошибка завершения игры'})
        }

    }
}

module.exports = new GameController()
