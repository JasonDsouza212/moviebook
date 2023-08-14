import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { onAddToPlaylist } from '../apicalls/postcalls';

const MovieCard = ({ movie, playlists }) => {
  const poster = movie.Poster === 'N/A' ? 'https://external-preview.redd.it/LxmS9sZAnmKmtTCbNNGJRlADYv-9xwsOlvhWnUI-lEs.jpg?auto=webp&s=befb86a2df7d8a0609bf17b275e3a0aadf5dd1c7' : movie.Poster;
  const {user} = useAuthContext()
  const [showModal, setShowModal] = useState(false)

  const handlePlaylistSelection = (playlist) => {
    onAddToPlaylist(playlist, movie,user); 
    setShowModal(false); 
  };

  const handleAddToPlaylistClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="movie-card">
      <img src={poster} alt={movie.Title} className="movie-poster" />
      <div className="movie-details">
        <h2 className="movie-title">{movie.Title.length>25? movie.Title.slice(0,20)+"..." :movie.Title.slice(0,23)}</h2>
        <p className="movie-year">{movie.Year}</p>
        {user&&(
          <button className="add-to-playlist-btn close-modal-btn" onClick={handleAddToPlaylistClick}>
               Add to Playlist
          </button>
        )}
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
