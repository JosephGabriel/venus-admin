import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";

import { inputType, keyType } from "../types/modal-create-hotel";

export const StepForm = ({ formik, inputs, onChange }: any) => {
  return (
    <form onSubmit={formik.handleSubmit} style={{ marginBlock: "2rem" }}>
      <Grid container spacing={2}>
        {inputs.map((input: inputType, idx: number) => {
          return (
            <Grid item md={input.columns} key={idx}>
              <>
                {input.columns !== 4 ? (
                  <TextField
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values[input.name as keyof keyType]}
                    name={input.name}
                    error={!!formik.errors[input.name as keyof keyType]}
                    helperText={formik.errors[input.name as keyof keyType]}
                    variant="outlined"
                    fullWidth
                    label={input.label}
                  />
                ) : (
                  <Button variant="contained" fullWidth component="label">
                    {input.name.toUpperCase()}
                    <input
                      hidden
                      accept="image/*"
                      multiple={input.name === "fotos"}
                      name={input.name}
                      type={"file"}
                      onChange={onChange}
                    />
                  </Button>
                )}
              </>
            </Grid>
          );
        })}
      </Grid>
    </form>
  );
};
