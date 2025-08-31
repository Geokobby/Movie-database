import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams(); // imdbID from URL
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=ac3457ef`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-xl rounded-xl mt-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        ← Back to Search
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
          alt={movie.Title}
          className="w-48 md:w-64 rounded-lg shadow"
        />
        <div>
          <h1 className="text-2xl font-bold">{movie.Title}</h1>
          <p className="text-gray-600">
            {movie.Year} • {movie.Genre}
          </p>
          <p className="mt-4">{movie.Plot}</p>
          <p className="mt-2 text-sm text-gray-500">⭐ {movie.imdbRating} / 10</p>
          <p className="mt-1 text-sm text-gray-500">Director: {movie.Director}</p>
          <p className="mt-1 text-sm text-gray-500">Actors: {movie.Actors}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
