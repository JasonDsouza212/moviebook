import { toast } from 'react-hot-toast';
import { fetchPlaylistDataforpage } from './getcall';

const handleFormSubmit = async (event ,newPlaylistTitle ,isPrivate , user , setPlaylists ,setError ,setLoading ,setShowForm , setNewPlaylistTitle ,setIsPrivate ,setBtn ) => {
    event.preventDefault();
    const playlistData = {
      title: newPlaylistTitle,
      private: isPrivate,
      user_id: user.id,
    };
    try {
      const response = await fetch('http://localhost:4000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(playlistData),
      });

      if (response.ok) {
        toast.success("Playlist created successfully")
        // Playlist created successfully
        console.log('Playlist created successfully.');
        // Fetch the updated playlists
        fetchPlaylistDataforpage(user, setPlaylists ,setError ,setLoading);
      } else {
        // Handle error response
        console.error('Error creating playlist.');
        // Perform any error handling or show error message here
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      // Handle any network or other errors here
    }

    setShowForm(false);
    setNewPlaylistTitle('');
    setIsPrivate(false);
    setBtn('Create New Playlist');
  };

  const onAddToPlaylist = async (playlist, movie ,user) => {
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
          'Authorization':`rer ${user.token}`
        },
        body: JSON.stringify(topush),
      });

      
      const json = await response.json();
      console.log(json)


      if (response.ok) {
        toast.success("Movie added to playlist successfully")
        // Perform any additional actions or show success message here
      } else {
        toast.error("Movie added to playlist successfully")
        console.error('Error adding movie to playlist');
      }
    } catch (error) {
      console.error('Error adding movie to playlist:', error);
      // Handle any network or other errors here
    }
  };
  

  export{
    handleFormSubmit,
    onAddToPlaylist
  }