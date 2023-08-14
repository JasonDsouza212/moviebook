// To get the movies based on search term 
const fetchMovieData = async (setError,setLoading,setMovies,searchTerm) => {
    setError(null);
    setLoading(true);
    try {  
      const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${process.env.REACT_APP_APIKEY}`);
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

// fetch the playlist data so they can set them their playlists 
  const fetchPlaylistData = async (user,setPlaylists) => {
    try {
      const response = await fetch(`http://localhost:4000/api/playlists/myplaylists/${user.id}`,{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      });
      const data = await response.json();
      if (data) {
        const playlistTitles = data.map((playlist) => playlist.title);
        setPlaylists(playlistTitles);
        console.log(playlistTitles);
      } else {
        setPlaylists([]);
        console.log('No playlist found.');
      }
    } catch (error) {
      console.error('Oops! Something went wrong.', error);
    }
  };


//   this request fetches data for the page for users playlist 
  const fetchPlaylistDataforpage = async (user, setPlaylists ,setError ,setLoading ) => {
    try {
      const response = await fetch(`http://localhost:4000/api/playlists/myplaylists/${user.id}`,{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setPlaylists(data);
      } else {
        setError('No playlists found.');
        setPlaylists([]); 
      }
    } catch (error) {
      setError('Oops! Something went wrong.');
      setPlaylists([]); 
    } finally {
      setLoading(false);
    }
  }

// this call fetches public playlist for non loggedin users 
  const fetchMovieDatafornonlogin = async (_id,setError,setLoading,setMovies) => {
    setError(null);
    setLoading(true);
    try {  
      const response = await fetch(`http://localhost:4000/api/playlists/movies/${_id}`);
      const data = await response.json();
      console.log(data.movies)
      if (data.movies) {
        setMovies(data.movies);
        setLoading(false); 
      } else {
        setError('No movies found.');
        setLoading(false); 
      }
    } catch (error) {
      setError('Oops! Something went wrong.');
      setLoading(false);
  };


  const fetchMovieDataindividual = async (_id, setError, setLoading, user, setIsOwner, setMovies) => {
    setError(null);
    setLoading(true);
    try {  
      const response = await fetch(`http://localhost:4000/api/playlists/${_id}`,{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      });
      const data = await response.json();
      if(data.user_id === user.id){
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
  
      if (data.movies) {
        const sortedMovies = data.movies.sort((a, b) => new Date(a.Released) - new Date(b.Released));
        setMovies(sortedMovies);
        setLoading(false); 
      } else {
        setError('No movies found.');
        setLoading(false);
      }
    } catch (error) {
      setError('Oops! Something went wrong.');
      setLoading(false); // Update the loading state in case of an error
    }
  };
  
  // the api call is for playlists page 
  const fetchPlaylistData2 = async (setError,setLoading,user,setPlaylists) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/playlists/all/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setPlaylists(data);
      } else {
        setError('No playlists found.');
        setPlaylists([]); // Set an empty array if data is not an array
      }
    } catch (error) {
      setError('Oops! Something went wrong.');
      setPlaylists([]); // Set an empty array in case of error
    } finally {
      setLoading(false);
    }
  };

// playlist data for non login users
  const fetchPlaylistDataofnonlogin = async (setError,setLoading,setPlaylists) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/playlists/all`, {});
      const data = await response.json();

      if (data) {
        setPlaylists(data);
      } else {
        setError('No playlists found.');
        setPlaylists([]); // Set an empty array if data is not an array
      }
    } catch (error) {
      setError('Oops! Something went wrong.');
      setPlaylists([]); // Set an empty array in case of error
    } finally {
      setLoading(false);
    }
  };


  

  export {
    fetchMovieData,
    fetchPlaylistData,
    fetchPlaylistDataforpage,
    fetchMovieDatafornonlogin,
    fetchMovieDataindividual,
    fetchPlaylistData2,
    fetchPlaylistDataofnonlogin
}