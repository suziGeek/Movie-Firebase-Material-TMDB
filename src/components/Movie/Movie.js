import React from "react";
import { store, useStore } from "../../constants/hookstore";
import { Link } from "react-router-dom";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebase";
import { auth } from "../../firebase";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    height: 50,
    backgroundColor: theme.palette.background.paper
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },

  contphot: {
    margin: "5px 25px 10px 25px"
  },
  photo: {
    width: 300,
    transition: ".3s ease-in-out",

    "&:hover": {
      transform: "scale(0.99)",
      opacity: 0.5
    }
  },

  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, " +
      "rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
}));

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";
let userId = null;
let userFav = "test";
store.state = "";

const Movie = ({ movie }) => {
  const classes = useStyles();
  const [MovieId, movieId] = useStore("");
  const user = auth.currentUser;
  const [starFill, setStarFill] = React.useState(false);
  let db = firebase.firestore();
  let favorite = movie.original_title;
  const [open, setOpen] = React.useState(false);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userId = user.uid;
      userFav = user.favorites;
      !userFav ? (userFav = "test") : (userFav = user.favorites);
      console.log(userFav);
    } else {
      console.log("no user logged in");
    }
  });

  console.log(movie.id);
  console.log("this is movie id");

  const poster =
    movie.poster === "N/A"
      ? DEFAULT_PLACEHOLDER_IMAGE
      : IMG_BASE_URL + movie.poster_path;

  const getMovieId = () => {
    movieId(movie.id);
  };

  const addFavorite = () => {
    if (user && !starFill) {
      setStarFill(true);
      db.collection("users")
        .doc(userId)
        .update({
          favorites: firebase.firestore.FieldValue.arrayUnion(favorite)
        });
    }
    if (user && starFill) {
      setStarFill(false);
      console.log(starFill, "starfil");
      db.collection("users")
        .doc(userId)
        .update({
          favorites: firebase.firestore.FieldValue.arrayRemove(favorite)
        });
    }
    if (!user) {
      console.log("user needs to login");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // user && user.favorites.includes(favorite)
  //   ? setStarFill(true)
  //   : setStarFill(false);

  return (
    <React.Fragment>
      <div className={classes.contphot}>
        <GridListTile
          key={movie.id}

          // cols={movie.featured ? 3 : 1}
          // rows={movie.featured ? 3 : 1}
        >
          <Link to='./MovieDetail' onClick={getMovieId} value={movie.id}>
            <img className={classes.photo} src={poster} alt={movie.title} />
          </Link>
          <button onClick={addFavorite}>
            {user ? (
              userFav.includes(movie.original_title) ? (
                <StarIcon />
              ) : (
                <StarBorderIcon />
              )
            ) : (
              "login"
            )}
          </button>
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id='transition-modal-title'>
                  Favorites List <StarBorderIcon />
                </h2>
                <p id='transition-modal-description'>
                  Login or Create an account to create a favorites list!
                </p>
              </div>
            </Fade>
          </Modal>
        </GridListTile>
      </div>
    </React.Fragment>
  );
};

export default Movie;

// <GridListTileBar
//             title={movie.title}
//             actionIcon={
//               <IconButton
//                 aria-label={`star ${movie.title}`}
//                 className={classes.icon}
//                 onClick={addFavorite}
//               >
//                 {starFill && <StarIcon />}
//                 {!starFill && <StarBorderIcon />}
//               </IconButton>
//             }
//             titlePosition='bottom'
//             actionPosition='left'
//             className={classes.titleBar}
//           />
