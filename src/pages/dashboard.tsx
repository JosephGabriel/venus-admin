import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { userReactiveVar } from "../apollo/variables/user";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

export const Dashboard = () => {
  const classes = useStyles();

  userReactiveVar.use();

  const user = userReactiveVar.get();

  return (
    <Grid container className={classes.container}>
      <Grid item sm={12}>
        <Typography variant="h5">Olá, {user?.user.firstName}</Typography>
      </Grid>
    </Grid>
  );
};
