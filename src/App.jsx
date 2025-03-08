
import {Routes, Route, Router} from "react-router-dom";
import Home from "./components/Home";
import MoviesDetails from "./components/MoviesDetails";



function App() {
  return (
   
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviesDetails />} />
       </Routes>
  
 );
}

export default App
