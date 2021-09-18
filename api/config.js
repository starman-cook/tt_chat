const path = require('path')


module.exports = {
    mongoUrl: {
        url: "mongodb://localhost/",
        db: `chat`
    },
    uploadPath: path.join(__dirname, '../api/public'),
}