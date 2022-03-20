import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { Hotel } from "../apollo/generated/schema";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 180,
  },
});

interface HotelProps {
  hotel: Hotel;
}

export const CardHotel = ({ hotel }: HotelProps) => {
  const classes = useStyles();

  return (
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
          <Typography variant="body2" color="textSecondary" component="p">
            {hotel.address}, {hotel.addressNumber}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
