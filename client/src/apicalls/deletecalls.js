import { toast } from 'react-hot-toast';
import { fetchPlaylistData2 } from './getcall';
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

  async function handlePlaylistDelete2(id , user , setPlaylists ,setError ,setLoading) {
    try {
      const response = await fetch(`http://localhost:4000/api/playlists/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        toast.success('Playlist Deleted')
        // Playlist was deleted successfully, you may choose to update the UI or fetch updated playlists list
        console.log('Playlist deleted successfully.');
        // Perform any additional actions or show success message here
        fetchPlaylistData2(setError,setLoading,user,setPlaylists);
      } else {
        console.error('Error deleting playlist.');
        // Perform any error handling or show error message here
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
      // Handle any network or other errors here
    }
  }

  async function handlePlaylistsMovieDelete(id ,user ,playlistname,fetchMovieData,user_id ,_id,setError,setLoading,setIsOwner,setMovies){
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
        fetchMovieData(_id, setError ,setLoading, user, setIsOwner, setMovies)
        console.log('Playlist deleted successfully.');
      } else {
        console.error('Error deleting playlist.');
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  }


  
  export {
    handlePlaylistDelete,
    handlePlaylistDelete2,
    handlePlaylistsMovieDelete
  }