import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
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
import QRScannerModal from "../../../components/QRScannerModal";
import data from "../../../data";
import { PatientModel } from "../../../models";

interface PatientToCollectorFormValues {
  collectorCode: string;
}

const PatientToCollectorSchema = Yup.object().shape({
  collectorCode: Yup.string().required("Collector Code field is required."),
});

const PatientToCollector = (props: any): React.ReactElement => {
  // States
  const [patient, setPatient] = useState<PatientModel | null>(null);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  // History for routing
  const history = useHistory();

  // Handle collecting done
  const handleDone = async (values: PatientToCollectorFormValues) => {
    console.log(values);
  };

  // Handle cancel
  const handleCancel = () => {
    history.push("/");
  };

  const toggleQRScanner = () => {
    setIsQRScannerOpen(!isQRScannerOpen);
  };

  const handleQRScanned = (qr: string | null) => {
    formik.setFieldValue("collectorCode", qr);
  };

  // Collector Formik Initial Values
  const initialValues: PatientToCollectorFormValues = {
    collectorCode: "",
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: PatientToCollectorSchema,
    onSubmit: handleDone,
  });

  useEffect(() => {
    console.log(props);
    setPatient(data.patients[0]);
  }, [props]);

  return (
    <>
      <Helmet>
        <title>Patient to Collector - Aptitude</title>
        <meta name="description" content="Patient to Collector" />
        <body className="page-patient-to-collector" />
      </Helmet>
      <Card>
        <CardBody>
          {(() => {
            const {
              errors,
              touched,
              values,
              handleSubmit,
              handleChange,
            } = formik;
            return (
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
                      <Button type="button" onClick={toggleQRScanner}>
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
            );
          })()}
        </CardBody>
      </Card>
      <QRScannerModal
        isOpen={isQRScannerOpen}
        toggle={toggleQRScanner}
        onQRScanned={handleQRScanned}
      />
    </>
  );
};

export default PatientToCollector;
