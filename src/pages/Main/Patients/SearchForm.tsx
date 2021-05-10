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
  emailAddress: string;
}

export interface SearchFormProps {
  onSubmit: (values: SearchFormValues) => void;
}

const SearchSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email("Email address field is invalid.")
    .required("Email address field is required."),
});

const SearchForm = ({ onSubmit }: SearchFormProps): React.ReactElement => {
  const initialValues: SearchFormValues = { emailAddress: "" };
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
            <Label for="userEmail">Email Address</Label>
            <Input
              type="text"
              name="emailAddress"
              id="userEmail"
              value={values.emailAddress}
              onChange={handleChange}
              invalid={touched.emailAddress && !!errors.emailAddress}
            />
            <FormFeedback>{errors.emailAddress}</FormFeedback>
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
