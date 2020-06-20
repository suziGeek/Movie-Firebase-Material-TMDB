import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel"
];

const ITEM_HEIGHT = 48;

const Genres = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [data, setData] = useState([]);
  const [Genre, genreValue] = useState("");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=dc15dc94ad3132023e29552c1fe96161&language=en-US`
    )
      .then(response => response.json())
      .then(data => setData(data["genres"]));
  }, []);

  console.log(props);
  console.log("this is props");

  const setGenreValue = e => {
    props.genre(e.target.value);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = e => {
    props.genre(e.target.value);
    setAnchorEl(null);
  };
  // my genre logic

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <p>Genres</p> <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch"
          }
        }}
      >
        {data.map(genre => (
          <MenuItem
            key={genre.id}
            selected={genre === "Pyxis"}
            onClick={handleClose}
            value={genre.id}
            data={Genre}
          >
            {genre.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default Genres;
