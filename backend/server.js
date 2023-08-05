require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require('./routes/user')
const playlistRoutes = require('./routes/playlist')

const app = express()

app.use(express.json());

app.use('/api/playlists', playlistRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
