import React from "react";

import {
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";

import { CustomButton } from "./custom-button";
import { CloseOutlined } from "@material-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import faker from "faker";

import { inputType, ModalProps } from "../types/modal-create-hotel";
import { StepForm } from "./step-form";
import { useCreateHotelMutation } from "../apollo/generated/schema";

const step1: inputType[] = [
  { name: "name", label: "Nome", columns: 6 },
  { name: "summary", label: "Resumo", columns: 6 },
  { name: "description", label: "Descrição", columns: 12 },
];

const step2: inputType[] = [
  { name: "zipCode", label: "CEP", columns: 6 },
  { name: "addressNumber", label: "Número", columns: 6 },
  { name: "address", label: "Endereço", columns: 12 },
];

const step3: inputType[] = [
  { name: "logo", label: "Logo", columns: 4 },
  { name: "thumbnail", label: "Thumbnail", columns: 4 },
  { name: "fotos", label: "Fotos", columns: 4 },
];

const steps = ["Informações básicas", "Localização", "Fotos"];

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loadingContainer: {
    margin: "4rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const ModalCreateHotel = ({ refetch, onClose }: ModalProps) => {
  const classes = useStyles();

  faker.setLocale("pt_BR");

  const [activeStep, setActiveStep] = React.useState(0);

  const [files, setFiles] = React.useState<any>({
    fotos: null,
    logo: null,
    thumbnail: null,
  });

  const formikBasic = useFormik({
    initialValues: {
      name: faker.company.companyName(),
      summary: faker.company.catchPhrase(),
      description: faker.lorem.paragraphs(3),
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "O nome dever ter 3 caracteres ou mais")
        .required("Requer um nome válido"),
      summary: Yup.string()
        .min(20, "O resumo dever ter 20 caracteres ou mais")
        .required("Requer um resumo válido"),
      description: Yup.string()
        .min(20, "A descrição dever ter 20 caracteres ou mais")
        .required("Requer uma descrição válida"),
    }),
    onSubmit: (values) => {},
  });

  const formikLocation = useFormik({
    initialValues: {
      address: `${faker.address.streetAddress()}, ${faker.address.cityName()}`,
      zipCode: faker.address.zipCode(),
      addressNumber: faker.datatype.number(5000).toString(),
    },
    validationSchema: Yup.object({
      zipCode: Yup.string()
        .min(9, "Requer um cep válido")
        .max(9, "Requer um cep válido")
        .required("Requer um cep válido"),
      addressNumber: Yup.string().required("Requer um número válido"),
      address: Yup.string()
        .max(60, "O endereço dever ter 60 caracteres ou menos")
        .required("Requer um endereço válido"),
    }),
    onSubmit: (values) => {},
  });

  const formikImages = useFormik({
    initialValues: {
      logo: "",
      thumbnail: "",
      fotos: "",
    },
    onSubmit: (values) => {},
  });

  const [createHotelMutation] = useCreateHotelMutation();

  const handleFile = (e: any) => {
    setFiles({
      ...files,
      [e.target.name]:
        e.target.name !== "fotos" ? e.target.files[0] : e.target.files,
    });
  };

  const nextSteps = async () => {
    setActiveStep(activeStep + 1);

    if (activeStep === 2) {
      formikImages.submitForm();

      createHotelMutation({
        variables: {
          data: {
            name: formikBasic.values.name,
            description: formikBasic.values.description,
            summary: formikBasic.values.summary,
            address: formikLocation.values.address,
            addressNumber: formikLocation.values.addressNumber,
            zipCode: formikLocation.values.zipCode,
            images: files.fotos,
            logo: files.logo,
            thumbnail: files.thumbnail,
            latitude: parseFloat(faker.address.latitude()),
            longitude: parseFloat(faker.address.longitude()),
          },
        },
        onCompleted: () => {
          refetch();
          onClose();
        },
        onError: (err) => {
          console.log(err);
        },
      });

      return;
    }

    // if (activeStep === 0) {
    //   await formikBasic.submitForm();

    //   if (formikBasic.isValid) {
    //   } else {
    //     return;
    //   }
    // }

    // if (activeStep === 1) {
    //   if (formikLocation.isValid) {
    //     formikLocation.submitForm();
    //     setActiveStep(activeStep + 1);
    //   } else {
    //     return;
    //   }
    // }

    // if (activeStep === 2) {
    //   if (formikImages.isValid) {
    //     formikImages.submitForm();
    //     setActiveStep(activeStep + 1);
    //   } else {
    //     return;
    //   }
    // }
  };

  const prevSteps = () => {
    if (activeStep === 0) {
      return;
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h6">Criar um hotel </Typography>
        <IconButton onClick={onClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <div className={classes.container}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          style={{
            padding: "0",
          }}
        >
          {steps.map((step, idx) => (
            <Step key={idx}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && <StepForm formik={formikBasic} inputs={step1} />}

        {activeStep === 1 && (
          <StepForm formik={formikLocation} inputs={step2} />
        )}

        {activeStep === 2 && (
          <StepForm
            formik={formikImages}
            onChange={handleFile}
            inputs={step3}
          />
        )}

        {activeStep === 3 && (
          <div className={classes.loadingContainer}>
            <CircularProgress />
            <Typography variant="body1">Carregando</Typography>
          </div>
        )}

        <Grid container>
          <Grid item md={6} className={classes.gridItem}>
            <CustomButton
              variantType="text"
              text="Anterior"
              onClick={prevSteps}
            />
          </Grid>
          <Grid item md={6} className={classes.gridItem}>
            <CustomButton
              text={activeStep === 2 ? "Cadastrar" : "Próximo"}
              onClick={nextSteps}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
