import React from 'react';

const PlaylistMoviesdetails = ({ movie ,playlistname,fetchMovieData }) => {
  const poster = movie.Poster === 'N/A' ? 'https://via.placeholder.com/300' : movie.Poster;
  async function handlePlaylistDelete(id){
    try {
      const response = await fetch(`http://localhost:4000/api/playlists/deletefromplaylist/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title:playlistname }), // Convert title to JSON and pass it in the body
      });

      if (response.ok) {
        alert('Movie Deleted');
        fetchMovieData()
        // Playlist was deleted successfully, you may choose to update the UI or fetch updated playlists list
        console.log('Playlist deleted successfully.');
        // Perform any additional actions or show success message here
        // fetchPlaylistData(); // Fetch the updated playlists
      } else {
        console.error('Error deleting playlist.');
        // Perform any error handling or show error message here
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
      // Handle any network or other errors here
    }
  }

  return (
    <div className="movie-card">
      <img src={movie.imageURL} alt={movie.imageURL} className="movie-poster" />
      <div className="movie-details">
        <h2 className="movie-title">{movie.movie_title}</h2>
        <p className="movie-year">{movie.Released}</p>
        <p className="movie-year">{movie.genre}</p>
        <p className="movie-year">{movie.Actors}</p>
        <button className="create-button" onClick={() => handlePlaylistDelete(movie._id)}> Delete</button>
      </div>
    </div>
  );
};

export default PlaylistMoviesdetails;
