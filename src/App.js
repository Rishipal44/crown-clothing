import HomePage from "./pages/HomePage/HomePage.component";
import { Routes, Route } from "react-router-dom";
import './App.css';

const HatsPage = () => {
  return(
    <div>
      <h1>Hats Page</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/hats' element={<HatsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
