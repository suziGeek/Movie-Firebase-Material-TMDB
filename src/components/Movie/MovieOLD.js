import React from "react";
import { store, useStore } from "../../constants/hookstore";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

store.state = "";

const Movie = ({ movie }) => {
  const [MovieId, movieId] = useStore("");

  console.log(movie.id);
  console.log("this is movie id");

  const poster =
    movie.poster === "N/A"
      ? DEFAULT_PLACEHOLDER_IMAGE
      : IMG_BASE_URL + movie.poster_path;

  const getMovieId = () => {
    movieId(movie.id);
  };

  // const setCounter = () => {
  //   setToggleClass((x = x + 1));
  // };

  return (
    <React.Fragment>
      <div key={movie.id}>
        <Link to='./MovieDetail' onClick={getMovieId} value={movie.id}>
          <FavoriteBorderIcon />
          <img
            className='movie'
            alt={`The movie titled: ${movie.title}`}
            src={poster}
          />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Movie;
