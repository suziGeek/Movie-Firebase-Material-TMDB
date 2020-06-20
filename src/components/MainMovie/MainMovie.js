import React, { useReducer, useEffect } from "react";
import "../../App.css";
import Grid from "@material-ui/core/Grid";
import Movie from "../Movie";
import Search from "../Search";
import Genres from "../Genres";

const MOVIE_API_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=dc15dc94ad3132023e29552c1fe96161&query=Batman";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};
// console.log({ Movie });
// console.log({ Genres });

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

//`https://api.themoviedb.org/3/movie/${movie.id}?api_key=dc15dc94ad3132023e29552c1fe96161&language=en-US`

const MainMovie = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.results
        });
      });
  }, []);

  // *************Search

  const search = searchValue => {
    console.log({ searchValue });
    console.log("searchvalue");
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=dc15dc94ad3132023e29552c1fe96161&query=${searchValue}`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        console.log("this is search");
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.results
        });
      });
  };

  // ************Genres

  const genre = Genre => {
    console.log(Genre);
    console.log("genre");
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=dc15dc94ad3132023e29552c1fe96161&language=pt-BR&with_genres=${Genre}`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        console.log("yes to genres");
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.results
        });
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <React.Fragment>
      <Search search={search} />
      <Genres genre={genre} />
      <Grid
        container
        spacing={3}
        direction='row'
        alignItems='center'
        justify='center'
        style={{ minHeight: "100vh" }}
      >
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className='errorMessage'>{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.title}`} movie={movie} />
          ))
        )}
      </Grid>
    </React.Fragment>
  );
};

export default MainMovie;
