import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { auth } from "../../firebase";
import Grid from "@material-ui/core/Grid";
import { useStore } from "../../constants/hookstore";
import { useFetch } from "../../constants/hooks";

import firebase from "../../firebase";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

let userId = null;

export default function MovieDetail(props) {
  const [name, setName] = useStore();
  const [favbut, setFavbut] = useState(true);
  const classes = useStyles();
  const MovieId = useStore();
  const movie_id = MovieId[0];
  const user = auth.currentUser;
  let db = firebase.firestore();

  console.log(userId);

  const [data] = useFetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=dc15dc94ad3132023e29552c1fe96161&language=en-US`
  );
  let favorite = data.original_title;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userId = user.uid;
    } else {
      console.log("no user logged in");
    }
  });

  //**ADD TO FAVORITES

  const onCreate = () => {
    // console.log(favbut, "button state add");
    setFavbut(false);
    db.collection("users")
      .doc(userId)
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion(favorite)
      });
  };

  const onRemove = () => {
    // console.log(favbut, "button state remove");
    setFavbut(true);
    db.collection("users")
      .doc(userId)
      .update({
        favorites: firebase.firestore.FieldValue.arrayRemove(favorite)
      });
  };

  const onLogin = () => {
    console.log("button state login");
  };

  // ****************

  const imagepath = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;

  //*end movie logic*

  return (
    <Grid
      container
      spacing={5}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={10}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component='img'
              alt='{data.original_title}'
              image={imagepath}
              title={data.original_title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {data.original_title}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {data.overview}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {user &&
              ((favbut === true && (
                <Button
                  size='small'
                  color='primary'
                  value={data.original_title}
                  onClick={onCreate}
                >
                  Add To Favorites
                </Button>
              )) || (
                <Button
                  size='small'
                  color='primary'
                  value={data.original_title}
                  onClick={onRemove}
                >
                  Remove From Favorites
                </Button>
              ))}
            {!user && (
              <Button
                size='small'
                color='primary'
                value={data.original_title}
                onClick={onLogin}
              >
                Login
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
