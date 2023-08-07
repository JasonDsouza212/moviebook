import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const MovieCard = ({ movie, playlists }) => {
  const poster = movie.Poster === 'N/A' ? 'https://via.placeholder.com/300' : movie.Poster;
  const {user} = useAuthContext()

  // State to manage the visibility of the playlist modal
  const [showModal, setShowModal] = useState(false);
  // console.log(movie)

  const onAddToPlaylist = async (playlist, movie) => {
    const topush = {
      movie_title: movie.Title,
      Released: movie.Year,
      imageURL: movie.Poster,
      type: movie.Type,
      imdb: movie.imdbID,
      title: playlist,
      _id : user.id
    };
    console.log("This is the POST" + JSON.stringify(topush))
    try {
      
      const response = await fetch('http://localhost:4000/api/playlists/addtoplaylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${user.token}`
        },
        body: JSON.stringify(topush),
      });

      
      const json = await response.json();
      console.log(json)


      if (response.ok) {
        alert("Movie added to playlist successfully")
        console.log('Movie added to playlist successfully.');
        // Perform any additional actions or show success message here
      } else {
        console.error('Error adding movie to playlist.gyggig');
        // Perform any error handling or show error message here
      }
    } catch (error) {
      console.error('Error adding movie to playlist:', error);
      // Handle any network or other errors here
    }
  };

  // Function to handle selecting a playlist and add the movie to the selected playlist
  const handlePlaylistSelection = (playlist) => {
    onAddToPlaylist(playlist, movie); // Call the parent component function to post the movie to the playlist
    setShowModal(false); // Close the modal
  };

  // Function to handle "Add to Playlist" button click and toggle modal visibility
  const handleAddToPlaylistClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="movie-card">
      <img src={poster} alt={movie.Title} className="movie-poster" />
      <div className="movie-details">
        <h2 className="movie-title">{movie.Title.length>25? movie.Title.slice(0,20)+"..." :movie.Title.slice(0,23)}</h2>
        <p className="movie-year">{movie.Year}</p>
        <button className="add-to-playlist-btn close-modal-btn" onClick={handleAddToPlaylistClick}>
          Add to Playlist
        </button>
        {showModal && (
          <div className="playlist-modal">
            <h3>Select a Playlist</h3>
            <ul>
              {playlists.map((playlist) => (
                <li key={playlist} onClick={() => handlePlaylistSelection(playlist)}>
                  {playlist}
                </li>
              ))}
            </ul>
            <button className="close-modal-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
