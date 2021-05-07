import {
  faCircleNotch,
  faQrcode,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
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
  InputGroup,
  InputGroupAddon,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import ChangeNotifyInput from "../../../components/ChangeNotifyInput";
import QRScannerModal from "../../../components/QRScannerModal";
import { READER_STATUS } from "../../../configs/enums";
import data from "../../../data";
import { PatientModel, ReaderModel } from "../../../models";

interface CollectorToReaderFormValues {
  collectorCode: string;
  readerCode: string;
}

const CollectorToReaderSchema = Yup.object().shape({
  collectorCode: Yup.string().required("Collector code is required."),
  readerCode: Yup.string().required("Reader code is required."),
});

const CollectorToReader = (): React.ReactElement => {
  // States
  const [patient, setPatient] = useState<PatientModel | null>(null);
  const [reader, setReader] = useState<ReaderModel | null>(null);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [collectorCode, setCollectorCode] = useState("");
  const [readerCode, setReaderCode] = useState("");
  const [selected, setSelected] = useState("collectorCode");

  // History for routing
  const history = useHistory();

  // Handle collecting done
  const handleDone = async (values: CollectorToReaderFormValues) => {
    console.log(values);
  };

  // Handle cancel
  const handleCancel = () => {
    history.push("/");
  };

  const toggleQRScannerForField = (field: string) => {
    return () => {
      setSelected(field);
      toggleQRScanner();
    };
  };

  const toggleQRScanner = () => {
    setIsQRScannerOpen(!isQRScannerOpen);
  };

  const handleCollectorSearch = () => {
    setPatient(data.patients[0]);
  };

  const handleReaderSearch = () => {
    setReader({
      id: "1",
      status: "Online",
    });
  };

  const handleQRScanned = async (qr: string | null) => {
    await formik.setFieldValue(selected, qr);
    switch (selected) {
      case "collectorCode":
        handleCollectorSearch();
        break;
      case "readerCode":
        handleReaderSearch();
        break;
      default:
        break;
    }
  };

  // Collector Formik Initial Values
  const initialValues: CollectorToReaderFormValues = {
    collectorCode: "",
    readerCode: "",
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: CollectorToReaderSchema,
    onSubmit: handleDone,
  });

  useEffect(() => {
    if (collectorCode) {
      setPatient(data.patients[0]);
    }
    if (readerCode) {
      setReader({ id: "1", status: "online" });
    }
  }, [collectorCode, readerCode]);

  return (
    <>
      <Helmet>
        <title>Collector to Reader - Aptitude</title>
        <meta name="description" content="Collector to Reader" />
        <body className="page-collector-to-reader" />
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
                    <ChangeNotifyInput
                      name="collectorCode"
                      id="collectorCode"
                      value={values.collectorCode}
                      onChange={handleChange}
                      onInputChanged={handleCollectorSearch}
                      invalid={touched.collectorCode && !!errors.collectorCode}
                    />
                    <InputGroupAddon addonType="append">
                      <Button
                        type="button"
                        onClick={toggleQRScannerForField("collectorCode")}
                      >
                        <FontAwesomeIcon icon={faQrcode} />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <FormFeedback
                    className={classNames({
                      "d-block":
                        touched.collectorCode && !!errors.collectorCode,
                    })}
                  >
                    {errors.collectorCode}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="readerCode">Reader Code</Label>
                  <InputGroup>
                    <ChangeNotifyInput
                      name="readerCode"
                      id="readerCode"
                      value={values.readerCode}
                      onChange={handleChange}
                      onInputChanged={handleReaderSearch}
                      invalid={touched.readerCode && !!errors.readerCode}
                    />
                    <InputGroupAddon addonType="append">
                      <Button
                        type="button"
                        onClick={toggleQRScannerForField("readerCode")}
                      >
                        <FontAwesomeIcon icon={faQrcode} />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <FormFeedback
                    className={classNames({
                      "d-block": touched.readerCode && !!errors.readerCode,
                    })}
                  >
                    {errors.readerCode}
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
                {reader && (
                  <FormGroup>
                    <Label>Reader Status</Label>
                    <p>
                      {reader.status === READER_STATUS.ONLINE ? (
                        <FontAwesomeIcon icon={faCircleNotch} color="green" />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} color="red" />
                      )}
                      <span className="ml-2">{reader.status}</span>
                    </p>
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
                  <Button
                    type="submit"
                    color="primary"
                    disabled={!patient || !reader}
                  >
                    Start Test
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

export default CollectorToReader;
