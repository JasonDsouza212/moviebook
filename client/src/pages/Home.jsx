import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { useAuthContext } from '../hooks/useAuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchMovieData, fetchPlaylistData } from '../apicalls/getcall';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('Marvel'); 
  const [val, setVal] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if(user) fetchPlaylistData(user,setPlaylists);
  }, []);
  

  useEffect(() => {
    fetchMovieData(setError,setLoading,setMovies ,searchTerm);
  }, [searchTerm]);

  // Function to handle the search button click
  const handleSearchButtonClick = () => {
    setSearchTerm(val.trim());
  };

  // Function to handle the search input change
  const handleSearchInputChange = (event) => {
    setVal(event.target.value);
  };

  return (
    <div className='MoviesPage'>
      <div className="search-container">
        <input
          type="text"
          id="searchInput"
          value={val}
          onChange={handleSearchInputChange}
          placeholder="Search movies..."
        />
        <button id="searchButton" onClick={handleSearchButtonClick}>Search</button>
      </div>

      {loading ? (
        <Loader/>
      ) : error ? (
         <Message message={error}/>
      ) : (
        <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            playlists={playlists}
          />
        ))}
      </div>
      )}
    </div>
  );
};

export default Movies;
