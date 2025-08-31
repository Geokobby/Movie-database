import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Home = () => {
  const [catalogue, setCatalogue] = useState([]);
  const [loading, setLoading] = useState(true);

  // Some random seed search terms
  const searchTerms = ["batman", "spider", "love", "war", "star", "king", "dark", "light", "dream", "hero"];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      // Pick a random search term
      const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

      try {
        const res = await fetch(`http://www.omdbapi.com/?s=${randomTerm}&apikey=ac3457ef`);
        const data = await res.json();

        if (data.Search) {
          // Fetch details for each movie to get imdbRating
          const detailedMovies = await Promise.all(
            data.Search.map((movie) =>
              fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=ac3457ef`).then((res) => res.json())
            )
          );

          // Filter movies with rating >= 6
          const filtered = detailedMovies.filter(
            (movie) => parseFloat(movie.imdbRating) >= 6
          );

          setCatalogue(filtered);
        } else {
          setCatalogue([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); // runs every time homepage mounts

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Search bar on top */}
      <SearchBar />

      {/* Movie Catalogue */}
      <h2 className="text-2xl font-bold mt-8 mb-4">🎬 Movie Catalogue (Rating 6+)</h2>
      {loading ? (
        <p className="text-gray-500">Loading movies...</p>
      ) : catalogue.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {catalogue.map((movie) => (
            <Link
              to={`/movie/${movie.imdbID}`}
              key={movie.imdbID}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition cursor-pointer"
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
                alt={movie.Title}
                className="w-full h-64 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold">{movie.Title}</h3>
                <p className="text-sm text-gray-500">{movie.Year}</p>
                <p className="text-yellow-600 font-bold">⭐ {movie.imdbRating}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No movies found. Try refreshing!</p>
      )}
    </div>
  );
};

export default Home;
