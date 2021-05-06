import { Formik } from "formik";
import React from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import * as Yup from "yup";

export interface SearchFormValues {
  email: string;
}

export interface SearchFormProps {
  onSubmit: (values: SearchFormValues) => void;
}

const SearchSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email address field is invalid.")
    .required("Email address field is required."),
});

const SearchForm = ({ onSubmit }: SearchFormProps): React.ReactElement => {
  const initialValues: SearchFormValues = { email: "" };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SearchSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <h4 className="text-center">
            <strong>Enter the patient email address below</strong>
          </h4>
          <FormGroup>
            <Label for="loginEmail">Email Address</Label>
            <Input
              type="text"
              name="email"
              id="loginEmail"
              value={values.email}
              onChange={handleChange}
              invalid={touched.email && !!errors.email}
            />
            <FormFeedback>{errors.email}</FormFeedback>
          </FormGroup>
          <FormGroup className="text-right">
            <Button color="primary" type="submit">
              Search
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
