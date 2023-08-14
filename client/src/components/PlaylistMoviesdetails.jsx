import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { handlePlaylistsMovieDelete } from '../apicalls/deletecalls';

const PlaylistMoviesdetails = ({ _id,movie ,playlistname,fetchMovieData ,isOwner ,user_id ,setLoading , setError ,setIsOwner ,setMovies  }) => {
  const {user}= useAuthContext()
  return (
    <div className="movie-card">
      <img src={movie.imageURL} alt={movie.imageURL} className="movie-poster" />
      <div className="movie-details">
        <h2 className="movie-title">{movie.movie_title}</h2>
        <p className="movie-year">{movie.Released}</p>
        <p className="movie-year">{movie.genre}</p>
        <p className="movie-year">{movie.Actors}</p>
        {isOwner && <button className="delete-button" onClick={() => handlePlaylistsMovieDelete(movie._id,user ,playlistname,fetchMovieData,user_id ,_id,setError,setLoading,setIsOwner,setMovies)}> Delete</button>}
      </div>
    </div>
  );
};

export default PlaylistMoviesdetails;
