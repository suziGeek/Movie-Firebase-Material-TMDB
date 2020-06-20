import React from "react";

import PropTypes from "prop-types";
import Favorites from "../Favorites";
import { Card, CardHeader, useScrollTrigger } from "@material-ui/core";

function UserCard(props) {
  const user = props.user;

  console.log("this is usercardFavs", user.favorites);
  return (
    <Card>
      <CardHeader
        title={`${user.firstName} ${user.lastName}`}
        subheader={user.username}
      />
      <Favorites />
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserCard;
