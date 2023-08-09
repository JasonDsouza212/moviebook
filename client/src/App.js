import './styles/App.css';
import { useAuthContext } from './hooks/useAuthContext'
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Playlists from './pages/Playlists';
import PlaylistMovies from './pages/PlaylistMovies';

function App() {
  const key = process.env.REACT_APP_APIKEY;
  console.log(key + " this");
  const{user} =useAuthContext()

  if(user){
    console.log(user.email + " => from the app" + user.id)
  }

  return (
    <>
    <div className='dont_display_on_smaller_screen'>This application currently works only on Desktop devices</div>
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={!user?<Login />:<Navigate to="/"/>} 
            />
          <Route 
              path="/signup" 
              element={!user?<Signup />:<Navigate to="/"/>} 
            />
             <Route 
              path="/playlists" 
              element={<Playlists/>} 
            />
            <Route 
              path="/playlists/:title/:_id" 
              element={<PlaylistMovies/>} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
