import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { useAuthContext } from '../hooks/useAuthContext';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('Marvel'); // Search term state
  const [val, setVal] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/playlists/myplaylists/${user.id}`);
        const data = await response.json();
        if (data) {
          // Map through the playlists and extract the titles into a new array
          const playlistTitles = data.map((playlist) => playlist.title);
          setPlaylists(playlistTitles);
          console.log(playlistTitles);
        } else {
          setError('No playlist found.');
        }
      } catch (error) {
        setError('Oops! Something went wrong.');
      }
    };

    fetchPlaylistData();
  }, []);

  useEffect(() => {
    const fetchMovieData = async () => {
      setError(null);
      setLoading(true);
      try {  
        const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${process.env.REACT_APP_APIKEY}`);
        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setError('No movies found.');
        }
      } catch (error) {
        setError('Oops! Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [searchTerm]);

  // Function to handle the search button click
  const handleSearchButtonClick = () => {
    setSearchTerm(val);
  };

  // Function to handle the search input change
  const handleSearchInputChange = (event) => {
    setVal(event.target.value.trim());
  };

  return (
    <div className='MoviesPage'>
      {/* Search bar */}
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
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
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
