const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("./config");
const User = require("./models/User");


mongoose.connect(config.mongoUrl.url + config.mongoUrl.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.once('open', async () => {
    try {
        await db.dropCollection('users')
    } catch (e) {
        console.log('Collection were not present, skipping drop...')
    }
    const [user1, user2] = await User.create({
        email: "1@1.com",
        username: "one",
        password: "1",
        avatar: "default.png",
        token: nanoid()
    }, {
        email: "2@2.com",
        username: "two",
        password: "1",
        avatar: "default.png",
        token: nanoid()
    })

    await db.close()
})