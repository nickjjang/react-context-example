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
import ActionTypes from "../../actions/ActionTypes";
import AppContext from "../../AppContext";
import PortalLayout from "../../layouts/PortalLayout";
import * as Auth from "../../services/Auth";

export interface LoginFormValues {
  emailAddress: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email("Email address field is invalid.")
    .required("Email address field is required."),
  password: Yup.string().required("Password field is required."),
});

const Login = (): React.ReactElement => {
  const initialValues: LoginFormValues = { emailAddress: "", password: "" };
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  console.log(process.env);
  const handleLogin = async (values: LoginFormValues) => {
    try {
      const data = await Auth.login(dispatch, values);
      console.log(data);
      history.push("/");
    } catch (error) {
      alert(JSON.stringify(error));
      // console.log(error);
    }
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
                    name="emailAddress"
                    id="loginEmail"
                    value={values.emailAddress}
                    onChange={handleChange}
                    invalid={touched.emailAddress && !!errors.emailAddress}
                  />
                  <FormFeedback>{errors.emailAddress}</FormFeedback>
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
