import React, { useEffect, useState } from "react";
// import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import firebase from "../../firebase";

const Favorites = (props) => {
  // const [spells, setSpells] = useState([]);
  const user = firebase.auth().currentUser;
  const userId = firebase.auth().currentUser.uid;
  let db = firebase.firestore();
  let favoritesRef = db.collection("users").doc(userId);

  console.log(user.uid, "this is fav props");

  const onDelete = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value, "this is ondelete");
    favoritesRef.update({
      favorites: firebase.firestore.FieldValue.arrayRemove(value),
    });
  };

  const favVal = [{ title: user.favorites, id: user.id }];

  console.log(favVal);

  return (
    <ul>
      {favVal.map((key) => {
        return key.title.map((title, index) => (
          <li>
            <p>
              <button
                size='small'
                color='primary'
                value={title}
                onClick={onDelete}
              >
                {console.log("this is id", key.title[index])}
                {console.log("this is key", key.id[index])}
                {key.title[index]}
              </button>
            </p>
          </li>
        ));
      })}
    </ul>
  );
};

export default Favorites;
