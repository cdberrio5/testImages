import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';

import "./App.scss";

function App() {
  return (
    <Router>
      <Navbar />
      
      <div className='body'>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
