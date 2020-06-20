import React, { useState, useEffect } from "react";

const Genres = props => {
  const [data, setData] = useState([]);
  const [Genre, genreValue] = useState("");

  //console.log({ Genre });
  //console.log({ genreValue });

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
    // genreValue(e.target.value);
    props.genre(e.target.value);
  };

  return (
    <div className='genre-wrap'>
      <ul className=''>
        <h3>Genres</h3>
        {data.map(genre => (
          <li
            className=''
            type='button'
            id='seewho2'
            key={genre.id}
            data={Genre}
            onClick={setGenreValue}
            value={genre.id}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Genres;
