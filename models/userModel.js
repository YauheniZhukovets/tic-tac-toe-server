const mongoose = require('mongoose')

const userModel = mongoose.Schema(
    {
        name: {type: String, require: true, trim: true},
    },
    {
        timestamps: true
    }
)


const User = mongoose.model('User', userModel)

module.exports = User