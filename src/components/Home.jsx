import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {fetchMovies} from "../services/api";
import { useNavigate } from "react-router-dom";
import { auth, logOut, signInWithGoogle } from "../auth/firebase";
import Genres from "./Genres";
import { Search } from "lucide-react";
import Chatbot from "./Chatbot";
import TrendingMovies from "./TrendingMovies";
import UpcomingMovies from "./UpcomingMovies";

const Home = () => {
  const [query, setQuery] = useState(""); //store user input for search
  const [movies, setMovies] = useState([]); //store list of fetched movies
  const [selectedGenre, setSelectedGenre] = useState([]); //store selected genres
  const [user] = useAuthState(auth); //Tracks authentication state
  const [suggestions, setSuggestions] = useState([]);
  const [isGenreClicked, setIsGenreClicked] = useState(false);
 

  
  const navigate = useNavigate();


  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

 
  //Fetch movie based on user search
  const searchMovies = async () => {
    if (query) {
      const results = await fetchMovies(query);
      setMovies(results);
      setSuggestions([]);
    }
  };

  const fetchSearchSuggestions = async (query) => {
    if (query.length > 1) {
      const results = await fetchMovies(query);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSearchSuggestions(value);
  };

  const selectSuggestion = (movieId, movieTitle) => {
    setQuery(movieTitle);

    setSuggestions([]);
    navigate(`/movie/${movieId}`);
  };

  // Filter movies based on selected genres
  const filteredMovies =
    selectedGenre.length > 0
      ? movies.filter((movie) =>
          movie.genre_ids.some((id) => selectedGenre.includes(id))
        )
      : movies; // If no genres are selected, show all movies
      //show genre button
  const handleShowGenres = () => {
    setIsGenreClicked(!isGenreClicked);
  };

  //pagination
const [currentPage, setCurrentPage] = useState(1);
const moviesPerPage = 8; // Adjust this as needed

// Calculate total pages
const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

// Get movies for the current page
const indexOfLastMovie = currentPage * moviesPerPage;
const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

// Pagination Handlers
const nextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(prevPage => prevPage + 1);
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(prevPage => prevPage - 1);
  }
};

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        {/* Header Section */}

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-yellow-500">Movies Nation</h1>
          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300"
                crossOrigin="anonymous"
              />
              <button
                onClick={logOut}
                className="bg-red-500 px-4 py-2 rounded cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="bg-blue-500 px-4 py-2 rounded cursor-pointer"
            >
              Login
            </button>
          )}
        </div>

        {/* Search Box */}
        <div className="flex gap-3 items-baseline">
          <input
            type="text"
            placeholder="Enter Movie Name..."
            value={query}
            onChange={handleSearchInput}
            className="w-full p-2 border rounded text-black mt-4 bg-slate-50  "
          />
          {suggestions.length > 0 && (
            <ul className="absolute w-[87.2%] bg-white text-black shadow-md  mt-15 max-h-40 overflow-y-auto rounded-xl ">
              {suggestions.map((movie) => (
                <li
                  key={movie.id}
                  onClick={() => selectSuggestion(movie.id, movie.title)}
                  className="p-2 cursor-pointer hover:bg-gray-300"
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={searchMovies}
            className="w-[150px] bg-blue-500 text-white  p-2 rounded cursor-pointer flex justify-center justify-items-center gap-2  "
          >
          
            <Search size={18} />
            Search
         
          </button>
        </div>

        <Chatbot/>
        <div className="genre flex items-center justify-center">
          {filteredMovies.length > 0 && (
            <button
              onClick={handleShowGenres}
              className="bg-blue-500 my-6 w-[20%]  text-xl text-center font-bold rounded-2xl p-2 cursor-pointer"
            >
              {" "}
              {isGenreClicked
                ? "Hide Genres Selection"
                : "Select By Genres"}{" "}
            </button>
          )}
        </div>
        {isGenreClicked && (
          <Genres
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        )}

       {/* Display Movies with Pagination */}
{filteredMovies.length !== 0 ? (
  <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 lg:gap-8">
      {currentMovies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => handleMovieClick(movie.id)}
          className="cursor-pointer"
        >
          <div className="p-2 bg-gray-800 rounded">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
            />
            <h3 className="text-lg mt-2">{movie.title}</h3>
          </div>
        </div>
      ))}
    </div>

    {/* Pagination Controls */}
    <div className="flex justify-center gap-4 mt-6">
      <button 
        onClick={prevPage} 
        disabled={currentPage === 1} 
        className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-500" : "bg-blue-600"}`}
      >
        Previous
      </button>
      
      <span className="text-white">Page {currentPage} of {totalPages}</span>
      
      <button 
        onClick={nextPage} 
        disabled={currentPage === totalPages} 
        className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-500" : "bg-blue-600"}`}
      >
        Next
      </button>
    </div>
  </>
) : (
  <h3 className="text-2xl text-center italic text-yellow-500 my-10">
    {movies.length === 0
      ? "Search Movies to Display"
      : "No movies for selected genre"}
  </h3>
)}

<TrendingMovies handleMovieClick={handleMovieClick}/>

<UpcomingMovies handleMovieClick={handleMovieClick}/>


      </div>
    </>
  );
};

export default Home;
