const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const User = require('../models/User')
const multer = require('multer')
const {nanoid} = require('nanoid')
const config = require('../config')
const path = require('path')

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename:(req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
})
const upload = multer({storage})

router.get('/', async (req, res) => {
        try {
            const users = await User.find()
            res.send(users);
        } catch (e) {
            res.status(500).send({error: e});
        }
    });


router.post('/', upload.single('avatar'), async (req, res) => {
    const user = new User(req.body);
    if (req.file) {
        user.avatar = req.file.filename;
    } else {
        user.avatar = "default.png"
    }
    try {
        user.generationToken();
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});


router.post('/sessions', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send({ error: 'Неправильный email или пароль!' });
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
        return res.status(400).send({ error: 'Неправильный email или пароль!' });
    }
    await user.generationToken('');
    await user.save({ validateBeforeSave: false });

    res.send({ message: 'Email and password correct!', user });
})

router.delete('/sessions', auth, async (req, res) => {
    const user = req.user
    const success = { message: 'Success' }
    user.token = ''
    await user.save({ validateBeforeSave: false })
    return res.send(success)
})

module.exports = router
