import { Formik } from "formik";
import React, { useContext } from "react";
import Helmet from "react-helmet";
import { NavLink, useHistory } from "react-router-dom";
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
import { AppContext } from "../../App";
import PortalLayout from "../../layouts/PortalLayout";
import ActionTypes from "../../reducers/ActionTypes";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email address field is invalid.")
    .required("Email address field is required."),
  password: Yup.string().required("Password field is required."),
});

const Login = (): React.ReactElement => {
  const initialValues: LoginFormValues = { email: "", password: "" };
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const handleLogin = async (values: LoginFormValues) => {
    await dispatch({ type: ActionTypes.SET_AUTH, payload: values });
    history.push("/");
  };

  return (
    <PortalLayout title="Welcome to Aptitude ACE Portal">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login" />
        <body className="page-login" />
      </Helmet>
      <Card>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, values, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <h4 className="text-center">
                  <strong>Please login to continue</strong>
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
                <FormGroup>
                  <Label for="loginPassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="loginPassword"
                    value={values.password}
                    onChange={handleChange}
                    invalid={touched.password && !!errors.password}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                <FormGroup className="text-center">
                  <Button color="primary">Submit</Button>
                </FormGroup>
                <div className="text-center">
                  <NavLink to="/forgot">Forgot Password?</NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </PortalLayout>
  );
};

export default Login;
