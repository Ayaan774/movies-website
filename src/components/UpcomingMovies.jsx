import React, { useEffect, useState } from 'react'
import { fetchUpcomingMovies } from '../services/api';

const UpcomingMovies = ({handleMovieClick}) => {
    const [upcomingMovies, setUpcomingMovies] = useState([]); //store list of upcoming Movies
     useEffect(() => {
       
        //call fetchUpcoming
        const getUpComingMovies = async () => {
          const upComingMovieData = await fetchUpcomingMovies();
          setUpcomingMovies(upComingMovieData);
        };
    
        
        getUpComingMovies();
      }, []);
    
  return (
    <>
     {/* Display Upcoming Movies */}
        <h2 className="text-3xl text-center font-bold text-yellow-500 my-10">
          Top Upcoming Movies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-8 gap-4 mt-4">
          {upcomingMovies.slice(0,8).map((movie) => (
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
    </>
  )
}

export default UpcomingMovies