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
        console.log('Playlist deleted successfully.');
        fetchPlaylistDataforpage(user, setPlaylists ,setError ,setLoading); 
      } else {
        console.error('Error deleting playlist.');
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
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
        console.log('Playlist deleted successfully.');
        fetchPlaylistData2(setError,setLoading,user,setPlaylists);
      } else {
        console.error('Error deleting playlist.');
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
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