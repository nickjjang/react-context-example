import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import data from "../../../data";
import { PatientModel } from "../../../models";

interface CollectorFormValues {
  collectorCode: string;
}

const CollectorSchema = Yup.object().shape({
  collectorCode: Yup.string().required("Collector Code field is required."),
});

const Collector = (props: any): React.ReactElement => {
  const initialValues: CollectorFormValues = { collectorCode: "" };
  const [patient, setPatient] = useState<PatientModel | null>(null);
  const history = useHistory();
  const handleDone = async (values: CollectorFormValues) => {
    console.log(values);
  };

  useEffect(() => {
    console.log(props);
    setPatient(data.patients[0]);
  }, [props]);

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login" />
        <body className="page-login" />
      </Helmet>
      <Card>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={CollectorSchema}
            onSubmit={handleDone}
          >
            {({ errors, touched, values, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <h4 className="text-center">
                  <strong>Scan or type in the collector code below</strong>
                </h4>
                <FormGroup>
                  <Label for="collectorCode">Collector Code</Label>
                  <InputGroup>
                    <Input
                      name="collectorCode"
                      id="collectorCode"
                      value={values.collectorCode}
                      onChange={handleChange}
                      invalid={touched.collectorCode && !!errors.collectorCode}
                    />
                    <InputGroupAddon addonType="append">
                      <Button type="button">
                        <FontAwesomeIcon icon={faQrcode} />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <FormFeedback className="d-block">
                    {errors.collectorCode}
                  </FormFeedback>
                </FormGroup>
                {patient && (
                  <FormGroup>
                    <Row>
                      <Col sm={12} md={4}>
                        <Label>Patient Name</Label>
                        <p>
                          {patient.firstName} {patient.lastName}
                        </p>
                      </Col>
                      <Col sm={12} md={4}>
                        <Label>Email Address</Label>
                        <p>
                          {patient.firstName} {patient.lastName}
                        </p>
                      </Col>
                      <Col sm={12} md={4}>
                        <Label>Date of Birth</Label>
                        <p>{moment(patient.dateOfBirth).format("M/D/YYYY")}</p>
                      </Col>
                    </Row>
                  </FormGroup>
                )}
                <FormGroup className="text-right">
                  <Button
                    type="button"
                    color="secondary"
                    className="mr-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default Collector;
