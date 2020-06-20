import React, { useEffect, useState } from "react";
// import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import firebase from "../../firebase";

const Favorites = props => {
  // const [spells, setSpells] = useState([]);
  const user = firebase.auth().currentUser;
  const userId = firebase.auth().currentUser.uid;
  let db = firebase.firestore();
  let favoritesRef = db.collection("users").doc(userId);

  console.log(user.uid, "this is fav props");

  const onDelete = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value, "this is ondelete");
    favoritesRef.update({
      favorites: firebase.firestore.FieldValue.arrayRemove(value)
    });
  };

  return (
    <ul>
      {user.favorites.map(favorite => (
        <li key={favorite}>
          <p>
            <button
              size='small'
              color='primary'
              value={favorite}
              onClick={onDelete}
            >
              {favorite}
            </button>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Favorites;
