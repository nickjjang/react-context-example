import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import { TEST_RESULT_LIST } from "../../../configs/constants";
import { TEST_RESULT } from "../../../configs/enums";
import data from "../../../data";
import { TestModel } from "../../../models";

interface TestRecordUpdateFormValues {
  TestResult?: string;
  Photograph?: string | File | null;
}
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const TestRecordUpdateSchema = Yup.object().shape({
  TestResult: Yup.string().required("Collector Code field is required."),
  Photograph: Yup.mixed()
    .test(
      "fileSize",
      "Photograph file is too large.",
      (value) => value && value.size <= 1024 * 1024 * 4
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

const TestRecordDetail = (props: any): React.ReactElement => {
  // States
  const [testRecord, setTestRecord] = useState<TestModel | null>(null);

  // History for routing
  const history = useHistory();

  // Handle collecting done
  const handleDone = async (values: TestRecordUpdateFormValues) => {
    console.log(values);
  };

  // Handle cancel
  const handleCancel = () => {
    history.goBack();
  };

  // Collector Formik Initial Values
  const initialValues: TestRecordUpdateFormValues = {
    TestResult: "",
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: TestRecordUpdateSchema,
    onSubmit: handleDone,
  });

  useEffect(() => {
    console.log(props);
    setTestRecord(data.testRecords[3]);
  }, [props]);

  return (
    <>
      <Helmet>
        <title>Test Record - Aptitude</title>
        <meta name="description" content="Test Record" />
        <body className="page-test-record" />
      </Helmet>
      <Card>
        <CardBody>
          <h4 className="text-center">
            <strong>Scan or type in the collector code below</strong>
          </h4>
          {testRecord && (
            <>
              <Row>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <Label>Patient Name</Label>
                    <p>Phil Doe</p>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <Label>Email Address</Label>
                    <p>phi.doe@gmail.com</p>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <Label>Date of Birth</Label>
                    <p>04/19/2013</p>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <Label>Test Completed On</Label>
                    <p>04/22/2021 04:26:23 PST</p>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <Label>Collector Code</Label>
                    <p>A45678</p>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <Label>Reader Code</Label>
                    <p>R12345</p>
                  </FormGroup>
                </Col>
              </Row>
              {testRecord.TestResult === TEST_RESULT.NO_RESULT ? (
                (() => {
                  const {
                    errors,
                    touched,
                    values,
                    handleSubmit,
                    handleChange,
                  } = formik;
                  return (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col sm={12} md={4}>
                          <FormGroup>
                            <Label for="testResult">Test Result</Label>
                            <Input
                              type="select"
                              name="TestResult"
                              id="testResult"
                              value={values.TestResult}
                              onChange={handleChange}
                              invalid={
                                touched.TestResult && !!errors.TestResult
                              }
                            >
                              {TEST_RESULT_LIST.map(({ label, value }) => (
                                <option value={value}>{label}</option>
                              ))}
                            </Input>
                            <FormFeedback>{errors.TestResult}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={4}>
                          <FormGroup>
                            <Label for="testRecordPhotograph">Photograph</Label>
                            <CustomInput
                              type="file"
                              id="testRecordPhotograph"
                              name="Photograph"
                              invalid={
                                touched.Photograph && !!errors.Photograph
                              }
                            />
                            <FormFeedback>{errors.Photograph}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col xs={12}>
                          <FormGroup>
                            <Button type="button" color="primary">
                              Update
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  );
                })()
              ) : (
                <FormGroup>
                  <Label>Test Result</Label>
                  <p>{testRecord.TestResult}</p>
                </FormGroup>
              )}
            </>
          )}
          <FormGroup className="text-right">
            <Button type="button" color="secondary" onClick={handleCancel}>
              Back To Results
            </Button>
          </FormGroup>
        </CardBody>
      </Card>
    </>
  );
};

export default TestRecordDetail;
