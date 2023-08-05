const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  movie_title: {
    type: String,
    required: true,
  },
  Released: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  Actors: {
    type: String,
    required: true,
  },
});

const PlaylistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  private: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  movies: [MovieSchema], // Array of MovieSchema objects representing favorite movies
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);
