import React, { useEffect, useState } from "react";
import {
  Dialog,
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { userReactiveVar } from "../apollo/variables/user";
import { useGetAllHotelsQuery } from "../apollo/generated/schema";

import { CustomButton } from "../components/custom-button";
import { ModalCreateHotel } from "../components/modal-create-hotel";
import { CardHotel } from "../components/card-hotel";

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    height: "90vh",
    width: "100vw",
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(0),
  },
  subtitle: {
    marginBottom: theme.spacing(2),
  },
  cardContainer: {
    marginTop: theme.spacing(5),
  },
}));

export const Dashboard = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  userReactiveVar.use();

  const navigate = useNavigate();

  const user = userReactiveVar.get();

  const { data, loading, refetch } = useGetAllHotelsQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (loading) {
    return (
      <>
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      </>
    );
  }

  return (
    <Grid container className={classes.container}>
      <Grid item sm={12}>
        <Typography variant="h4" className={classes.title}>
          Olá, {user?.user.firstName}
        </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          Aqui você pode gerenciar seus hóteis
        </Typography>
        <CustomButton
          text={"Criar um Hotel"}
          onClick={() => setOpenModal(true)}
        />

        <Dialog fullWidth open={openModal} onClose={() => setOpenModal(false)}>
          <ModalCreateHotel
            refetch={refetch}
            onClose={() => setOpenModal(false)}
          />
        </Dialog>
      </Grid>

      <Grid item md={12} className={classes.cardContainer}>
        <Grid container spacing={3}>
          {data &&
            data?.hotels?.map((hotel, idx) => (
              <Grid item md={3} key={idx}>
                <CardHotel hotel={hotel} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
