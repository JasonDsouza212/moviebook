import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-hot-toast';

const PlaylistMoviesdetails = ({ _id,movie ,playlistname,fetchMovieData ,isOwner ,user_id ,setLoading , setError ,setIsOwner ,setMovies  }) => {
  const {user}= useAuthContext()
  async function handlePlaylistDelete(id){
    try {
      const response = await fetch(`http://localhost:4000/api/playlists/deletefromplaylist/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${user.token}`
        },
        body: JSON.stringify({ title:playlistname, user_id }),
      });

      if (response.ok) {
        toast.success('Movie Deleted')
        fetchMovieData(_id,setError,setLoading,user,setIsOwner,setMovies)
        console.log('Playlist deleted successfully.');
      } else {
        console.error('Error deleting playlist.');
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
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
        {isOwner && <button className="delete-button" onClick={() => handlePlaylistDelete(movie._id)}> Delete</button>}
      </div>
    </div>
  );
};

export default PlaylistMoviesdetails;
