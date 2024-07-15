import './App.css';
import Home from './Components/Home';
import Questions from './Components/Questions';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div >
      <Router>
      <Routes>
        <Route path="/questions" element={<Questions />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
