import { Formik } from "formik";
import React, { useContext } from "react";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
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
import AppContext from "../../../AppContext";
import {
  ETHNICITY_LIST,
  GENDER_LIST,
  RACE_LIST,
} from "../../../configs/constants";
import ENV from "../../../configs/env";
import { UserModel } from "../../../models";
import * as User from "../../../services/User";

const RegisterPatientSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name field is required."),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last Name field is required."),
  dateOfBirth: Yup.string().required("Date of Birth field is required."),
  gender: Yup.string().required("Gender is required."),
  race: Yup.string().required("Race is required."),
  ethnicity: Yup.string().required("Ethnicity is required."),
  emailAddress: Yup.string()
    .email("Email Address field is invalid.")
    .required("Email Address field is required."),
  phoneNumber: Yup.string().required("Phone Number field is required."),
  streetAddress1: Yup.string(),
  streetAddress2: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  zipcode: Yup.string(),
  password: Yup.string()
    .required("Password field is required.")
    .matches(
      /(?=.*[A-Z])/g,
      "Password must contains at least one uppercase letter."
    )
    .matches(/(?=.{8,})/g, "Password must have at least 8 letters."),
  confirmPassword: Yup.string()
    .required("Confirm Password field is required.")
    .when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Confirm Password need to be the same as password"
      ),
    }),
});

const RegisterPatient = (): React.ReactElement => {
  const initialValues: UserModel = {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    race: "",
    ethnicity: "",
    emailAddress: "",
    phoneNumber: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    zipcode: "",
    password: "",
    confirmPassword: "",
  };
  const history = useHistory();
  const { dispatch } = useContext(AppContext);

  const handleRegister = async (values: UserModel) => {
    const {
      firstName,
      middleName,
      lastName,
      emailAddress,
      streetAddress1,
      streetAddress2,
      city,
      state,
      zipcode,
      phoneNumber,
      gender,
      dateOfBirth,
      password,
    } = values;

    // values.userId = "abcdef";
    const data = {
      user: {
        firstName,
        middleName,
        lastName,
        emailAddress,
        contactInfo: {
          streetAddress1,
          streetAddress2,
          city,
          state,
          country: null,
          zipcode,
          primaryPhone: phoneNumber,
          secondaryPhone: null,
          primaryPhoneVerified: false,
        },
        gender,
        dateOfBirth,
        roles: [
          {
            role: ENV.PATIENT_ROLE,
            practice: {
              practiceId: ENV.PRACTICE_ID,
            },
            defaultRole: true,
          },
        ],
        tenant: {
          tenantId: ENV.TENANT_ID,
        },
      },
      password,
      customData: [
        {
          field: {
            fieldId: ENV.RACE_FIELD_ID,
            area: ENV.CUSTOM_FIELD_AREA_USER_PROFILE,
          },
          fieldData: values.race,
        },
        {
          field: {
            fieldId: ENV.ETHNICITY_FIELD_ID,
            area: ENV.CUSTOM_FIELD_AREA_USER_PROFILE,
          },
          fieldData: values.ethnicity,
        },
      ],
    };
    try {
      await User.store(dispatch, data);
      toast.success("Patient registered successfully.");
      history.push(`/patient-to-collector/${values.emailAddress}`);
    } catch (error) {
      console.log(JSON.stringify(error.message));
    }
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
                    name="emailAddress"
                    id="registerEmail"
                    value={values.emailAddress}
                    onChange={handleChange}
                    invalid={touched.emailAddress && !!errors.emailAddress}
                  />
                  <FormFeedback>{errors.emailAddress}</FormFeedback>
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
                  <Label for="registerZipcode">Zip Code</Label>
                  <Input
                    type="text"
                    name="zipcode"
                    id="registerZipcode"
                    value={values.zipcode}
                    onChange={handleChange}
                    invalid={touched.zipcode && !!errors.zipcode}
                  />
                  <FormFeedback>{errors.zipcode}</FormFeedback>
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
