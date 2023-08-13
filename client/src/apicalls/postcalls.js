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

  export{
    handleFormSubmit
  }