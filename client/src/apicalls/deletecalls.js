import { toast } from 'react-hot-toast';
async function handlePlaylistDelete(id , user , fetchPlaylistDataforpage , setPlaylists ,setError ,setLoading ) {
    try {
      const response = await fetch(`http://localhost:4000/api/playlists/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        toast.success('Playlist Deleted')
        // Playlist was deleted successfully, you may choose to update the UI or fetch updated playlists list
        console.log('Playlist deleted successfully.');
        // Perform any additional actions or show success message here
        fetchPlaylistDataforpage(user, setPlaylists ,setError ,setLoading); // Fetch the updated playlists
      } else {
        console.error('Error deleting playlist.');
        // Perform any error handling or show error message here
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
      // Handle any network or other errors here
    }
  };

  export {
    handlePlaylistDelete
  }