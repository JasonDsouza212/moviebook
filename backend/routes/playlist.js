const express = require('express')
const {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  deletePlaylist,
  updatePlaylist,
  AddtoPlaylist,
  DeletefromPlaylist,
  getMyPlaylists
} = require('../controllers/playlistController')
const requireAuth = require("../middleware/requireAuth")


const router = express.Router()

// require auth 
router.use(requireAuth)

// GET all Playlist
router.get('/all/:_id', getPlaylists)

router.delete('/deletefromplaylist', DeletefromPlaylist)

//GET a single Playlist
router.get('/:id', getPlaylist)

//GET only users playlist Playlist
router.get('/myplaylists/:_id', getMyPlaylists)

// POST a new Playlist
router.post('/', createPlaylist)

// POST a new movie to Playlist
router.post('/addtoplaylist', AddtoPlaylist)

// DELETE a Playlist
router.delete('/:id', deletePlaylist)

// DELETE from a Playlist
router.delete('/deletefromplaylist/:_id', DeletefromPlaylist)

// UPDATE a Playlist
router.patch('/:id', updatePlaylist)


module.exports = router