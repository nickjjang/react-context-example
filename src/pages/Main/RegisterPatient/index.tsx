import { Formik } from "formik";
import React from "react";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import * as Yup from "yup";
import {
  ETHNICITY_LIST,
  GENDER_LIST,
  RACE_LIST,
} from "../../../configs/constants";
import { PatientModel } from "../../../models";

const RegisterPatientSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name field is required."),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last Name field is required."),
  dateOfBirth: Yup.string().required("Date of Birth field is required."),
  gender: Yup.string(),
  race: Yup.string(),
  ethnicity: Yup.string(),
  email: Yup.string()
    .email("Email Address field is invalid.")
    .required("Email Address field is required."),
  phoneNumber: Yup.string().required("Phone Number field is required."),
  streetAddress1: Yup.string(),
  streetAddress2: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  zipCode: Yup.string(),
  password: Yup.string().required("Password field is required."),
  confirmPassword: Yup.string().when("password", {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Confirm Password need to be the same as password"
    ),
  }),
});

const RegisterPatient = (): React.ReactElement => {
  const initialValues: PatientModel = {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    race: "",
    ethnicity: "",
    email: "",
    phoneNumber: "",
    streetAddress1: "",
    city: "",
    state: "",
    zipCode: "",
    password: "",
    confirmPassword: "",
  };
  const history = useHistory();

  const handleRegister = (values: PatientModel) => {
    console.log(values);
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <>
      <Helmet>
        <title>Register Patient - Aptitude</title>
        <meta name="description" content="Register Patient" />
        <body className="page-register-patient" />
      </Helmet>
      <Card>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterPatientSchema}
            onSubmit={handleRegister}
          >
            {({ errors, touched, values, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <h4 className="text-center text-bold">
                  <strong>Enter the patient information below</strong>
                </h4>
                <FormGroup>
                  <Label for="registerFirstName">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="registerFirstName"
                    value={values.firstName}
                    onChange={handleChange}
                    invalid={touched.firstName && !!errors.firstName}
                  />
                  <FormFeedback>{errors.firstName}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerMiddleName">Middle Name</Label>
                  <Input
                    type="text"
                    name="middleName"
                    id="registerMiddleName"
                    value={values.middleName}
                    onChange={handleChange}
                    invalid={touched.middleName && !!errors.middleName}
                  />
                  <FormFeedback>{errors.middleName}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerLastName">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="registerLastName"
                    value={values.lastName}
                    onChange={handleChange}
                    invalid={touched.lastName && !!errors.lastName}
                  />
                  <FormFeedback>{errors.lastName}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerDateOfBirth">Date of Birth</Label>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    id="registerDateOfBirth"
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    invalid={touched.dateOfBirth && !!errors.dateOfBirth}
                  />
                  <FormFeedback>{errors.dateOfBirth}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerGender">Gender</Label>
                  <Input
                    type="select"
                    name="gender"
                    id="registerGender"
                    value={values.gender}
                    onChange={handleChange}
                    invalid={touched.gender && !!errors.gender}
                  >
                    <option>-Please select-</option>
                    {GENDER_LIST.map(({ label, value }) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Input>
                  <FormFeedback>{errors.gender}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerRace">Race</Label>
                  <Input
                    type="select"
                    name="race"
                    id="registerRace"
                    value={values.race}
                    onChange={handleChange}
                    invalid={touched.race && !!errors.race}
                  >
                    <option>-Please select-</option>
                    {RACE_LIST.map(({ label, value }) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Input>
                  <FormFeedback>{errors.race}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerEthnicity">Ethnicity</Label>
                  <Input
                    type="select"
                    name="ethnicity"
                    id="registerEthnicity"
                    value={values.ethnicity}
                    onChange={handleChange}
                    invalid={touched.ethnicity && !!errors.ethnicity}
                  >
                    <option>-Please select-</option>
                    {ETHNICITY_LIST.map(({ label, value }) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Input>
                  <FormFeedback>{errors.ethnicity}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerEmail">Email Address</Label>
                  <Input
                    type="text"
                    name="email"
                    id="registerEmail"
                    value={values.email}
                    onChange={handleChange}
                    invalid={touched.email && !!errors.email}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerPhoneNumber">phoneNumber</Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    id="registerPhoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    invalid={touched.phoneNumber && !!errors.phoneNumber}
                  />
                  <FormFeedback>{errors.phoneNumber}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerStreetAddress1">Street Address 1</Label>
                  <Input
                    type="text"
                    name="streetAddress1"
                    id="registerStreetAddress1"
                    value={values.streetAddress1}
                    onChange={handleChange}
                    invalid={touched.streetAddress1 && !!errors.streetAddress1}
                  />
                  <FormFeedback>{errors.streetAddress1}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerStreetAddress2">Street Address 2</Label>
                  <Input
                    type="text"
                    name="streetAddress2"
                    id="registerStreetAddress2"
                    value={values.streetAddress2}
                    onChange={handleChange}
                    invalid={touched.streetAddress2 && !!errors.streetAddress2}
                  />
                  <FormFeedback>{errors.streetAddress2}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerCity">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="registerCity"
                    value={values.city}
                    onChange={handleChange}
                    invalid={touched.city && !!errors.city}
                  />
                  <FormFeedback>{errors.city}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerState">State</Label>
                  <Input
                    type="text"
                    name="state"
                    id="registerState"
                    value={values.state}
                    onChange={handleChange}
                    invalid={touched.state && !!errors.state}
                  />
                  <FormFeedback>{errors.state}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerZipCode">Zip Code</Label>
                  <Input
                    type="text"
                    name="zipCode"
                    id="registerZipCode"
                    value={values.zipCode}
                    onChange={handleChange}
                    invalid={touched.zipCode && !!errors.zipCode}
                  />
                  <FormFeedback>{errors.zipCode}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerPassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="registerPassword"
                    value={values.password}
                    onChange={handleChange}
                    invalid={touched.password && !!errors.password}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="registerConfirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="registerConfirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    invalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  />
                  <FormFeedback>{errors.confirmPassword}</FormFeedback>
                </FormGroup>
                <FormGroup className="text-right">
                  <Button
                    type="button"
                    color="secondary"
                    className="mr-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button color="primary">Submit</Button>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default RegisterPatient;
