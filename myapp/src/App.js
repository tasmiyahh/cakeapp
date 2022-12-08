
import './App.css';
import CakeRecipe from './components/cake recipe';
import Cake from './components/cakes';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
  
   <nav>
    <Router>
    <ul>
      <li>
        <Link to="/cake recipe">CakeRecipe</Link>
      </li>
      <li>
        <Link to="/cakes">Cakes</Link>
      </li>
    </ul>
  <Routes>
   <Route path='/cake recipe' element={<CakeRecipe/>} />
   <Route path='/cakes' element={<Cake/>} />
  </Routes>
    </Router>
    
   </nav>
  
  );
}

export default App;
