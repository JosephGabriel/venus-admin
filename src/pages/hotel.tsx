import React from "react";
import {
  Grid,
  ImageList,
  ImageListItem,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import { useGetHotelBySlugQuery } from "../apollo/generated/schema";
import { Loader } from "../components/loader";
import {
  Star,
  StarBorderOutlined,
  Map as MapIcon,
  Room,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  thumbnail: {
    width: "100%",
    height: "50vh",
    objectFit: "cover",
  },
  logo: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    marginRight: theme.spacing(2),
  },
  detailsContainer: {
    padding: theme.spacing(4),
    paddingBottom: 0,
    display: "flex",
  },
  descriptionContainer: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    display: "flex",
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

export const HotelPage = () => {
  const classes = useStyles();

  const { slug } = useParams<string>();

  const navigate = useNavigate();

  const { data, loading, error } = useGetHotelBySlugQuery({
    variables: {
      slug: slug!,
    },
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid container>
      <Grid item md={12}>
        <img
          src={data?.hotelBySlug.thumbnail}
          alt={data?.hotelBySlug.name}
          className={classes.thumbnail}
        />
      </Grid>

      <Grid item md={6}>
        <Grid container>
          <Grid item md={12} className={classes.detailsContainer}>
            <img
              src={data?.hotelBySlug.logo}
              alt={data?.hotelBySlug.name}
              className={classes.logo}
            />
            <div>
              <Typography variant="h6">{data?.hotelBySlug.name}</Typography>
              <Typography variant="body1">
                {data?.hotelBySlug.summary}
              </Typography>
              {[1, 2, 3, 4, 5].map((item) => {
                if (data?.hotelBySlug.rating! < item) {
                  return <StarBorderOutlined />;
                } else {
                  return <Star />;
                }
              })}
            </div>
          </Grid>

          <Grid item md={12} className={classes.descriptionContainer}>
            <Typography variant="body1">
              {data?.hotelBySlug.description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={6}>
        <Map
          mapboxAccessToken="pk.eyJ1IjoiY3Jvbm9zcmFnZWpnIiwiYSI6ImNrdGFpYnZ5ejFtNnEzMnI1OG5mYjJuMmMifQ.tHJjTwdne11dTBnG0TLS4w"
          initialViewState={{
            longitude: data?.hotelBySlug.longitude,
            latitude: data?.hotelBySlug.latitude,
            zoom: 1,
          }}
          attributionControl={false}
          style={{
            width: "80%",
            height: "80%",
            padding: "2rem",
            margin: "auto",
            overflow: "hidden",
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker
            longitude={data?.hotelBySlug.longitude}
            latitude={data?.hotelBySlug.latitude}
          >
            <Room fontSize="small" />
          </Marker>
        </Map>
      </Grid>

      <Grid item md={12} className={classes.descriptionContainer}>
        <ImageList cols={3}>
          {data?.hotelBySlug.images?.map((item, idx) => (
            <ImageListItem key={idx}>
              <img src={item} alt={`${idx}`} />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>

      <Grid item md={12} className={classes.descriptionContainer}>
        <Grid container spacing={4}>
          <Grid item sm={3}>
            <Paper className={classes.paper}>oiii</Paper>
          </Grid>

          <Grid item sm={3}>
            <Paper className={classes.paper}>oiii</Paper>
          </Grid>

          <Grid item sm={3}>
            <Paper className={classes.paper}>oiii</Paper>
          </Grid>

          <Grid item sm={3}>
            <Paper className={classes.paper}>oiii</Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
