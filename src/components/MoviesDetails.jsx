import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMoviesDetails } from "../services/api";
import { ArrowLeft, ArrowUpLeftSquareIcon } from "lucide-react";

export default function MoviesDetails() {
    const { id } = useParams(); // Get movie ID from the URL
    const [movie, setMovie] = useState(null); // Store movie details
    const navigate = useNavigate();

    const HandleBackClick = () =>{
        navigate("/");
    }

    useEffect(() => {
        async function getMovieDetails() {
            const movieData = await fetchMoviesDetails(id);
            setMovie(movieData);
        }
        getMovieDetails();
    }, [id]);

    if (!movie) return <p className="text-center text-white">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <button onClick={HandleBackClick}
            className="border-2 rounded-2xl cursor-pointer hover:bg-amber-50 hover:text-black"><ArrowLeft size={45}/></button>
            <div className="max-w-6xl mx-auto mt-9 ">
            <div className="flex flex-col text-center sm:text-left  sm:flex-row">
                  {/* Movie Poster */}
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                     alt={movie.title} className="rounded-lg mt-4 h-[400px] w-[400px] mx-auto object-contain border-4" />
            <div className="description sm:ml-20 mt-6 ">
                <h1 className="text-4xl font-bold ">{movie.title}</h1>
                <p className="text-gray-400 mt-6">{movie.overview}</p>
                 {/* Genres */}
                 <div className="flex mt-8 gap-2 items-center justify-center sm:justify-start  ">
                    {movie.genres.map(genre => (
                        <span key={genre.id} className="bg-gray-700 px-5 py-3 rounded-full mr-2 font-bold">{genre.name}</span>
                    ))}
                </div>
                

                {/* Ratings */}
                <p className="flex mt-8  justify-center sm:justify-start text-2xl font-extrabold mr-6 ">⭐ {movie.vote_average} / 10</p>

                </div>
              
            

               
                </div>

                {/* Cast */}
                <h2 className="text-3xl font-bold mt-8 ">Cast:</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4 ">
                    {movie.credits.cast.slice(0, 6).map(actor => (
                        <div key={actor.id} className="text-center">
                            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                                 alt={actor.name} className="rounded-full mx-auto w-30"/>
                            <p className="text-md mt-4">{actor.name}</p>
                        </div>
                    ))}
                </div>

                {/* Trailer */}
                {movie.videos.results.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-3xl font-bold">Trailer:</h2>
                        <iframe 
                            className=" w-full sm:w-[80%] h-[300px] sm:h-[400px] md:h-[500px] rounded-xl mt-6 mx-auto "
                            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`} 
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
}
