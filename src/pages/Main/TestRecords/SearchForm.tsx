import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
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

export interface SearchFormValues {
  collectorCode?: string;
  patientName?: string;
  email?: string;
  testDateRange?: string;
}

export interface SearchFormProps {
  onSubmit: (values: SearchFormValues) => void;
}

const SearchSchema = Yup.object().shape({});

const SearchForm = ({ onSubmit }: SearchFormProps): React.ReactElement => {
  const initialValues: SearchFormValues = {
    collectorCode: "",
    patientName: "",
    email: "",
    testDateRange: "",
  };
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const toggleQRScanner = () => {
    setIsQRScannerOpen(!isQRScannerOpen);
  };

  const handleQRScanned = (qr: string | null) => {
    formik.setFieldValue("collectorCode", qr);
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: SearchSchema,
    onSubmit,
  });

  return (
    <>
      {(() => {
        const { errors, touched, values, handleSubmit, handleChange } = formik;
        return (
          <Form onSubmit={handleSubmit}>
            <h4 className="text-center">
              <strong>Enter information below to search test records</strong>
            </h4>
            <Row form>
              <Col sm={12}>
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
                  <FormFeedback
                    className={classNames({
                      "d-block":
                        touched.collectorCode && !!errors.collectorCode,
                    })}
                  >
                    {errors.collectorCode}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="searchTestRecordsEmail">Patient Name</Label>
                  <Input
                    type="text"
                    name="patientName"
                    id="searchTestRecordsPatientName"
                    value={values.patientName}
                    onChange={handleChange}
                    invalid={touched.patientName && !!errors.patientName}
                  />
                  <FormFeedback>{errors.patientName}</FormFeedback>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="searchTestRecordsEmail">Email Address</Label>
                  <Input
                    type="text"
                    name="email"
                    id="searchTestRecordsEmail"
                    value={values.email}
                    onChange={handleChange}
                    invalid={touched.email && !!errors.email}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>
              </Col>
              <Col sm={12}>
                <FormGroup>
                  <Label for="searchTestRecordsTestDateRange">
                    Test Date Range
                  </Label>
                  <Input
                    type="select"
                    name="testDateRange"
                    id="searchTestRecordsTestRange"
                    value={values.testDateRange}
                    onChange={handleChange}
                    invalid={touched.testDateRange && !!errors.testDateRange}
                  >
                    <option>-Please select-</option>
                    <option>Last 7 Days</option>
                    <option>Last 15 Days</option>
                    <option>A Month Ago</option>
                    <option>3 Months Ago</option>
                  </Input>
                  <FormFeedback>{errors.testDateRange}</FormFeedback>
                </FormGroup>
              </Col>
              <Col sm={12}>
                <FormGroup className="text-right">
                  <Button color="secondary" type="button" className="mr-2">
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Search
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        );
      })()}
      <QRScannerModal
        isOpen={isQRScannerOpen}
        toggle={toggleQRScanner}
        onQRScanned={handleQRScanned}
      />
    </>
  );
};

export default SearchForm;
