const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const mongoose = require('mongoose')
const users = require('./routers/user')
const config = require('./config')


mongoose.connect(config.mongoUrl.url + config.mongoUrl.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Mongo connected")
    })
    .catch(err => {
        console.log(err)
    })


app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/users', users)

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});

// const run = async () => {
//     await mongoose.connect(`${config.mongoUrl.url}${config.mongoUrl.db}`, {useNewUrlParser: true, useUnifiedTopology: true});
//
//     app.use('/users', users);
//     // app.use('/photos', photos);
//
//
//     app.listen(port, () => {
//         console.log("server runs on " + port);
//     });
//     console.log('mongoose connected');
// };
//
// run().catch((err) => {console.log(err)});

