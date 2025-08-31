import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = (value) => {
    fetch(`http://www.omdbapi.com/?s=${value}&apikey=ac3457ef`)
      .then((response) => response.json())
      .then((json) => {
        if (json.Search) {
          const filtered = json.Search.filter((movie) =>
            movie.Title.toLowerCase().includes(value.toLowerCase())
          );
          setResults(filtered);
        } else {
          setResults([]);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="py-2 px-2 w-1/2 m-auto shadow-xl rounded-xl">
      <div className="flex items-center">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Movie Search"
          className="bg-transparent font-bold focus:outline-none p-2 w-full"
          value={input}
          onChange={(e) => {
            const value = e.target.value;
            setInput(value);
            if (value.trim() !== "") {
              fetchData(value);
            } else {
              setResults([]);
            }
          }}
        />
      </div>

      {/* Display results */}
      <div className="mt-4 space-y-2">
        {results.length > 0 ? (
          results.map((movie) => (
            <Link
              to={`/movie/${movie.imdbID}`}
              key={movie.imdbID}
              className="flex items-center space-x-4 p-2 border rounded shadow-sm hover:bg-gray-100 transition"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/50"
                }
                alt={movie.Title}
                className="w-12 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{movie.Title}</h3>
                <p className="text-sm text-gray-600">{movie.Year}</p>
              </div>
            </Link>
          ))
        ) : (
          input && <p className="text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
