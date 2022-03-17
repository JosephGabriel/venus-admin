import React from "react";

import {
  Container,
  Paper,
  Grid,
  makeStyles,
  TextField,
  Snackbar,
  Typography,
  LinearProgress,
  IconButton,
} from "@material-ui/core";

import faker from "faker";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";

import { LOGIN_USER } from "../apollo/mutations/user";
import { CustomButton } from "../components/custom-button";
import { LoginVariables, User } from "../types/user";
import { Close } from "@material-ui/icons";
import { userReactiveVar } from "../apollo/variables/user";

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
  const navigate = useNavigate();

  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<any>("");

  userReactiveVar.use();

  faker.setLocale("pt_BR");

  const [loginMutation, { loading, data, error, reset }] = useMutation<
    { loginUser: User },
    LoginVariables
  >(LOGIN_USER);

  const formik = useFormik({
    initialValues: {
      email: "cronosrage.jg@gmail.com",
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
    onSubmit: (values) => {
      loginMutation({
        variables: {
          data: {
            email: values.email,
            password: values.password,
          },
        },
        onError: (error) => {
          setMessage(error?.message);
          setOpen(true);
          reset();
        },
        onCompleted: (data) => {
          formik.resetForm();
          setMessage("Login feito com sucesso");
          setOpen(true);
          userReactiveVar.set(data.loginUser);
          setTimeout(() => navigate("/dashboard"), 3000);
        },
      });
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item sm={12} className={classes.gridItem}>
        <Container className={classes.container}>
          <Paper>
            {(loading && !data) || (loading && !error) ? (
              <LinearProgress />
            ) : null}
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

              <CustomButton
                text={loading ? "Fazendo login" : "Entrar"}
                onClick={() => formik.submitForm()}
              />

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
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={message}
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <Close fontSize="small" />
              </IconButton>
            </>
          }
        />
      </Grid>
    </Grid>
  );
};
