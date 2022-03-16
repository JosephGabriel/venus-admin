import React from "react";

import {
  Container,
  Paper,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

import { useFormik } from "formik";
import faker from "faker";
import * as Yup from "yup";
import { CustomButton } from "../components/custom-button";
import { Link } from "react-router-dom";

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

export const SignupPage: React.VFC = () => {
  const classes = useStyles();

  faker.setLocale("pt_BR");

  const formik = useFormik({
    initialValues: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLowerCase(),
      userName: faker.internet.userName(),
      password: "Daredevil95!",
      passwordConfirm: "Daredevil95!",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "O nome dever ter 3 caracteres ou mais")
        .required("Requer um nome"),
      lastName: Yup.string()
        .min(3, "O sobrenome dever ter 3 caracteres ou mais")
        .required("Requer um sobrenome"),
      email: Yup.string()
        .email("O email deve ser um endereço válido")
        .required("Requer um email válido"),
      userName: Yup.string()
        .min(3, "O nome de usuário dever ter 3 caracteres ou mais")
        .required("Requer um nome de usuário"),
      password: Yup.string()
        .min(8, "A senha dever ter 8 caracteres ou mais")
        .required("Requer um nome de usuário"),
      passwordConfirm: Yup.string()
        .min(8, "A senha dever ter 8 caracteres ou mais")
        .oneOf([Yup.ref("password")], "As senha não coincidem")
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
              <Typography variant="h5">Cadastro</Typography>

              <Typography variant="body1" className={classes.subtitle}>
                Cadastre-se para ter acesso ao sistema
              </Typography>

              <Grid container className={classes.inputGrid} spacing={2}>
                <>
                  <Grid item md={6} sm={12}>
                    <TextField
                      label="Nome"
                      variant="outlined"
                      fullWidth
                      error={!!formik.errors.firstName}
                      helperText={formik.errors.firstName}
                      name="firstName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      className={classes.input}
                    />
                  </Grid>

                  <Grid item md={6} sm={12}>
                    <TextField
                      label="Sobrenome"
                      variant="outlined"
                      fullWidth
                      error={!!formik.errors.lastName}
                      helperText={formik.errors.lastName}
                      name="lastName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      className={classes.input}
                    />
                  </Grid>

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
                      label="Nome de usuário"
                      variant="outlined"
                      fullWidth
                      error={!!formik.errors.userName}
                      helperText={formik.errors.userName}
                      name="userName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                      className={classes.input}
                    />
                  </Grid>

                  <Grid item md={6} sm={12}>
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

                  <Grid item md={6} sm={12}>
                    <TextField
                      label="Confirmar senha"
                      variant="outlined"
                      fullWidth
                      error={!!formik.errors.passwordConfirm}
                      helperText={formik.errors.passwordConfirm}
                      name="passwordConfirm"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.passwordConfirm}
                      className={classes.input}
                    />
                  </Grid>
                </>
              </Grid>

              <CustomButton text={"Cadastrar"} />

              <div>
                <Typography variant="caption">
                  Não tem uma conta?{" "}
                  <Link to="/login">
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
