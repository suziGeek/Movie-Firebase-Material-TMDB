import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { store, useStore } from "../../constants/hookstore";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 280,
    flexGrow: 1
  },
  media: {
    height: 100,
    paddingTop: "100%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

store.state = "";

export default function Movie({ movie }) {
  const [spacing, setSpacing] = React.useState(2);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container className={classes.root} spacing={10}>
      <Grid item xs={15}>
        <Grid container justify='center' mx={10} spacing={spacing}>
          <Card className={classes.root} mx={10}>
            <CardMedia
              className={classes.media}
              image={poster}
              title={movie.title}
              key={movie.id}
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                <Link to='./MovieDetail' onClick={getMovieId} value={movie.id}>
                  {movie.title}{" "}
                </Link>
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label='add to favorites'>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label='share'>
                <ShareIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label='show more'
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography paragraph>text</Typography>

                <Typography>some text</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
