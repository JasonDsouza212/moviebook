const Playlist = require('../models/playlistModel')
const mongoose = require('mongoose')

// get all Playlist
const getPlaylists = async (req, res) => {
  try {
    const _id = req.params._id; 
    console.log(_id+ "this is id")
    const playlists = await Playlist.find({
      $or: [
        { private: false }, 
        { $and: [{ private: true }, { user_id: _id }] }
      ]
    }).sort({ title: -1 });

    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
const getnonuserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ private: false }).sort({ title: -1 });
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const getMyPlaylists = async (req, res) => {
  try {
    const _id = req.params._id; // Assuming the user ID is available in the request body
    console.log(_id+ "this is id")
    const playlists = await Playlist.find({ user_id: _id }).sort({ title: -1 });

    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// get a single Playlist
const getPlaylist = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Playlist'})
  }

  const playlist = await Playlist.findById(id)

  if (!playlist) {
    return res.status(404).json({error: 'No such Playlist'})
  }
  
  res.status(200).json(playlist)
}


// get a single Playlist
const getPlaylistfornonlogin = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Playlist'})
  }

  const playlist = await Playlist.findById(id)

  if (!playlist) {
    return res.status(404).json({error: 'No such Playlist'})
  }
  
  res.status(200).json(playlist)
}


const createPlaylist = async (req, res) => {
  const { title, user_id , private } = req.body;
  const movies = []; // Initialize movies as an empty array

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!user_id) {
    emptyFields.push('user_id');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }
  

  // add doc to db
  try {
    const playlist = await Playlist.create({ title, private, user_id, movies });
    res.status(200).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// add to playlist
const AddtoPlaylist = async (req, res) => {
    const { movie_title, Released,imageURL,imdb,type, title , _id } = req.body;
  
    // Check if any of the required fie ,lds is missing
    const errors = [];
    if (!movie_title) {
      errors.push('Movie title is required');
    }
    if (!Released) {
      errors.push('Released is required');
    }
    if (!imageURL) {
      errors.push('imageURL is required');
    }
    if (!type) {
      errors.push('type is required');
    }
    if (!imdb) {
      errors.push('imdb is required');
    }
    if (!title) {
      errors.push('Playlist title is required');
    }
    if (!_id) {
      errors.push('_id title is required');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', errors });
    }
  
    try {
      // Find the playlist based on the title
      const playlist = await Playlist.findOne({ title, user_id: _id });
  
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }
  
      // Construct the movie object
      const movie = {
        movie_title,
        Released,
        imageURL,
        type,
        imdb
      };
  
      // Add the movie to the playlist (using addToSet to avoid duplicates)
      playlist.movies.addToSet(movie);
  
      // Save the updated playlist to the database
      const updatedPlaylist = await playlist.save();
      res.status(200).json(updatedPlaylist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  
  // Delte from playlist
  const DeletefromPlaylist = async (req, res) => {
    const { _id } = req.params
    const { title , user_id } = req.body;
  
    // Check if any of the required fields is missing
    const errors = [];
    if (!title) {
      errors.push('Playlist title is required');
    }
    if (!user_id) {
      errors.push('Playlist user_id is required');
    }
    if (!_id) {
      errors.push('_id of the movie to delete is required');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', errors });
    }
  
    try {
      // Find the playlist based on the title
      const playlist = await Playlist.findOne({ title , user_id });
  
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }
  
      // Remove the movie with the specified _id from the playlist
      playlist.movies.pull({ _id });
  
      // Save the updated playlist to the database
      const updatedPlaylist = await playlist.save();
      res.status(200).json(updatedPlaylist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  
// Delte playlist
  const deletePlaylist = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid Playlist ID' });
    }
  
    try {
      const playlist = await Playlist.findByIdAndDelete(id);
  
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }
  
      res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };



// update a Playlist
const updatePlaylist = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Invalid playlist ID'})
  }

  const playlist = await Playlist.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!playlist) {
    return res.status(400).json({error: 'No such Playlist'})
  }
  res.status(200).json(playlist)
}


module.exports = {
  getPlaylists,
  getPlaylist,
  createPlaylist,
  deletePlaylist,
  updatePlaylist,
  AddtoPlaylist,
  DeletefromPlaylist,
  getMyPlaylists,
  getnonuserPlaylists,
  getPlaylistfornonlogin
}