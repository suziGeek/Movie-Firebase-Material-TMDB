import React, { useEffect, useState } from "react";

import firebase from "../../firebase";

const Favorites = (props) => {
  const user = firebase.auth().currentUser;
  const userId = firebase.auth().currentUser.uid;
  let db = firebase.firestore();
  let favoritesRef = db.collection("users").doc(userId);

  let favId = [[user.favorites], [user.id]];
  console.log("this favId", favId);

  console.log(user.uid, "this is fav props");

  const onDelete = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value, "this is ondelete");
    favoritesRef.update({
      favorites: firebase.firestore.FieldValue.arrayRemove(value),
    });
  };

  return (
    <div>
      <p>this is a favorite</p>
      <ul>
        {favId.map((fav) => {
          console.log("this is fav", fav);

          fav.map((id) => {
            console.log("this is id", id);
            <li key={id}>
              <p>
                <button
                  size='small'
                  color='primary'
                  value={fav}
                  onClick={onDelete}
                >
                  {fav}
                </button>
              </p>
            </li>;
          });
        })}
      </ul>
    </div>
  );
};
export default Favorites;

//<ul>
// <li key={fav[1]}>
//           <p>
//             <button
//               size='small'
//               color='primary'
//               value={fav[1]}
//               onClick={onDelete}
//             >
//               {console.log("this is profile favorite", fav[0], fav[1])}
//               {fav}
//             </button>
//           </p>
//         </li>
//</ul>
