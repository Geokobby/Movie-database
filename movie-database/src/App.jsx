import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
