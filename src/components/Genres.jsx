import React, { useEffect, useState } from "react";
import { fetchGenres } from "../services/api";

const Genres = ({ selectedGenre, setSelectedGenre }) => {
  const [genres, setGenres] = useState([]); //store list of genres
  useEffect(() => {
    const getGenres = async () => {
      const genreData = await fetchGenres();
      setGenres(genreData);
    };

    getGenres();
  }, []);

  //toggle Genres
  const toggleGenre = (genreId) => {
    setSelectedGenre(
      (prevSelected) =>
        prevSelected.includes(genreId)
          ? prevSelected.filter((id) => id !== genreId) // Remove if already selected
          : [...prevSelected, genreId] // Add if not selected
    );
  };

  return (
    <>
      {/* Genre Filtering  */}
      <div className="flex gap-6 flex-wrap justify-evenly mt-4 overflow-auto">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => toggleGenre(genre.id)}
            className={`w-[140px] px-4 py-2 rounded cursor-pointer ${
              selectedGenre.includes(genre.id) ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Genres;
