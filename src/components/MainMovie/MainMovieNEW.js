import React, { useReducer, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
//import tileData from "./tileData";
//import Movie from "../Movie";
import Search from "../Search";
import Genres from "../Genres";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 250,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(5)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
}));

/*****MOVIE LOGIC */

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

export default function MainMovie() {
  const classes = useStyles();

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
    console.log({ Genre });
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

  /**get images */
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  //   const poster =
  //     movie.poster === "N/A"
  //       ? DEFAULT_PLACEHOLDER_IMAGE
  //       : IMG_BASE_URL + movie.poster_path;

  const { movies, errorMessage, loading } = state;

  return (
    <React.Fragment>
      <Search search={search} />
      <Genres genre={genre} />
      <div className={classes.root}>
        <GridList cellHeight={200} spacing={1} className={classes.gridList}>
          {movies.map((movie, index) => (
            <GridListTile
              key={movie.id}
              cols={movie.featured ? 1 : 2}
              rows={movie.featured ? 1 : 2}
            >
              <img src={IMG_BASE_URL + movie.poster_path} alt={movie.title} />
              <GridListTileBar
                title={movie.title}
                titlePosition='top'
                actionIcon={
                  <IconButton
                    aria-label={`star ${movie.title}`}
                    className={classes.icon}
                  >
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition='left'
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </React.Fragment>
  );
}
