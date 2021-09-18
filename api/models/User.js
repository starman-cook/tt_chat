const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')

const SALT_WORK_FACTOR = 10

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: String,
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     validate: [{
    //         validator: async value => {
    //             const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //             if (!regex.test(value)) return false
    //         },
    //         message: 'Вы ввели неправильный email'
    //     }, {
    //         validator: async value => {
    //             const user = await User.findOne({ email: value })
    //             if (user) return false
    //         },
    //         message: 'Такой сотрудник уже зарегистрирован'
    //     }]
    // },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: String,
    token: {
        type: String,
        required: true
    },

})
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
})
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
})
UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
}
UserSchema.methods.generationToken = function () {
    this.token = nanoid();
}


const User = mongoose.model('User', UserSchema);
module.exports = User;