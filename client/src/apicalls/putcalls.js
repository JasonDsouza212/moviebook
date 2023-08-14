import { toast } from 'react-hot-toast';
import { fetchPlaylistData2 } from './getcall';
async function handlePlaylistedit(modalInput,user,setError,setLoading,setPlaylists,setTempid,setShowModal,setModalInput,tempid) {
    try {
      const requestData = {
        title: modalInput,
        user_id: user.id,
      };
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(requestData)
      };
  
      const response = await fetch(`http://localhost:4000/api/playlists/updateplaylist/${tempid}`, requestOptions);
      const data = await response.json();
  
      console.log('Response:', data);
      await fetchPlaylistData2(setError,setLoading,user,setPlaylists);
      
      await toast.success("Playlist name changed successfully")
      
      
    } catch (error) {
      setError('Playlist name change failed');
    }finally{
      setTempid('');
      setShowModal(false);
      setModalInput("");
    }
  }

  const handleSubmit = async (e,user,currentPassword,newPassword,confirmPassword,setError,setIsLoading) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      setIsLoading(true);
      const requestData = {
        email: user.email,
        user_id: user.id,
        newPassword: newPassword
      };

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${user.token}`
        },
        body: JSON.stringify(requestData)
      };
      
      fetch("http://localhost:4000/api/user/forgotpassword", requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Response:', data);
          toast.success("Password reset succesfful")
          window.location.href = '/';
        })

    } catch (error) {
      setError('Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  export{
    handlePlaylistedit,
    handleSubmit
  }