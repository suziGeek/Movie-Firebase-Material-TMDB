import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { store, useStore } from "../../constants/hookstore";
// import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import firebase from "../../firebase";

const Favorites = (props) => {
  // const [spells, setSpells] = useState([]);
  const user = firebase.auth().currentUser;
  const userId = firebase.auth().currentUser.uid;
  let db = firebase.firestore();
  let favoritesRef = db.collection("users").doc(userId);
  const [MovieId, movieId] = useStore("");

  const onDelete = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value, "this is ondelete");
    favoritesRef.update({
      favorites: firebase.firestore.FieldValue.arrayRemove(value),
    });
  };

  const favVal = [{ title: user.favorites, id: user.id }];

  const getMovieId = (e) => {
    const value = e.target.value;
    MovieId(value);
    console.log("add to movie id", e);
  };

  console.log(favVal);

  return (
    <ul>
      {favVal.map((key) => {
        return key.title.map((title, index) => (
          <li>
            <p>
              <Link
                to='./MovieDetail'
                onClick={getMovieId}
                value={key.id[index]}
              >
                {title}
              </Link>
              <button
                size='small'
                color='primary'
                value={title}
                onClick={onDelete}
              >
                {console.log("this is id", key.title[index])}
                {console.log("this is key", key.id[index])}
                Delete
              </button>
            </p>
          </li>
        ));
      })}
    </ul>
  );
};

export default Favorites;
