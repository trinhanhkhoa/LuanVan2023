import React, { useState, useEffect } from "react";
import { useForm, Form } from "./useForm";
import { Box, Button, Grid, TextField, TextareaAutosize } from "@mui/material";

const initialFValues = {
  name: "",
  dateTime: new Date(),
  imageProduct: [""],
  imageCertificates: [""],
  description: "",
};

export default function CreateForm() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("description" in fieldValues)
      temp.description =
        fieldValues.description.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      employeeService.insertEmployee(values);
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6} >
          <TextField sx={{ margin: 2}}
            name="name"
            label="Full Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
            helperText={errors.name}
          />
          {/* <TextField
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          /> */}
          {/* <TextField
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          /> */}
          <TextField sx={{ margin: 2}}
            label="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
            helperText={errors.description}
          />

        </Grid>

        <div>
          <Button type="submit" text="Submit">
            Submit
          </Button>
          
          <Button type="submit" text="Submit" onClick={resetForm}>
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ borderRadius: "10px" }}
            // onClick={collectInfo}
          >
            Confirm
          </Button>
        </div>
      </Grid>
    </Form>
  );
}
