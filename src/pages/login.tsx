import React from "react";

import {
  Container,
  Paper,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { useFormik } from "formik";

import faker from "faker";

import * as Yup from "yup";

import { CustomButton } from "../components/custom-button";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiOutlinedInput-input": {
      width: "100% !important",
    },
  },
  gridContainer: {
    height: "100vh",
  },
  gridItem: {
    display: "flex",
  },
  form: {
    width: "90%",
    margin: "auto",
    padding: theme.spacing(6),
    borderRadius: 5,
  },
  title: {
    color: theme.palette.text.primary,
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
  },
  inputGrid: {},
  input: {
    marginBottom: theme.spacing(2),
  },
  caption: {
    marginTop: theme.spacing(2),
    display: "inline-block",
    fontWeight: 600,
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
}));

export const LoginPage: React.VFC = () => {
  const classes = useStyles();

  faker.setLocale("pt_BR");

  const formik = useFormik({
    initialValues: {
      email: faker.internet.email().toLowerCase(),
      password: "Daredevil95!",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("O email deve ser um endereço válido")
        .required("Requer um email válido"),
      password: Yup.string()
        .min(8, "A senha dever ter 8 caracteres ou mais")
        .required("Requer um nome de usuário"),
    }),
    onSubmit: (values) => {},
  });

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item sm={12} className={classes.gridItem}>
        <Container className={classes.container}>
          <Paper>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <Typography variant="h5">Login</Typography>

              <Typography variant="body1" className={classes.subtitle}>
                Faça login para ter acesso ao sistema
              </Typography>

              <Grid container className={classes.inputGrid} spacing={2}>
                <>
                  <Grid item md={12} sm={12}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      name="email"
                      error={!!formik.errors.email}
                      helperText={formik.errors.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      className={classes.input}
                    />
                  </Grid>

                  <Grid item md={12} sm={12}>
                    <TextField
                      label="Senha"
                      variant="outlined"
                      fullWidth
                      error={!!formik.errors.password}
                      helperText={formik.errors.password}
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      className={classes.input}
                    />
                  </Grid>
                </>
              </Grid>

              <CustomButton text={"Entrar"} onClick={() => null} />

              <div>
                <Typography variant="caption">
                  Não tem uma conta?{" "}
                  <Link to="/signup">
                    <Typography variant="caption" className={classes.caption}>
                      Clique Aqui
                    </Typography>
                  </Link>
                </Typography>
              </div>
            </form>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};
