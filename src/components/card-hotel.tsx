import React from "react";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { Room } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { Hotel } from "../apollo/generated/schema";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 180,
  },
  addressLine: {
    display: "flex",
    marginTop: theme.spacing(1),
    alignItems: "center",
  },
  address: {
    margin: 0,
  },
  card: {
    textDecoration: "none",
  },
}));

type HotelProps = {
  hotel: Hotel;
};

export const CardHotel = ({ hotel }: HotelProps) => {
  const classes = useStyles();

  return (
    <Link to={`/hotel/${hotel.slug}`} className={classes.card}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={hotel.thumbnail}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {hotel.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {hotel.summary}
            </Typography>
            <div className={classes.addressLine}>
              <Room fontSize="small" />
              <Typography
                className={classes.address}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {hotel.address}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
