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
              element={!user?<Signup />:<Playlists/>} 
            />
            <Route 
              path="/playlists/:_id" 
              element={!user?<Signup />:<PlaylistMovies/>} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
