import {
  faCircleNotch,
  faQrcode,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useFormik } from "formik";
import moment from "moment";
import React, { useContext, useState } from "react";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
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
import AppContext from "../../../AppContext";
import ChangeNotifyInput from "../../../components/ChangeNotifyInput";
import QRScannerModal from "../../../components/QRScannerModal";
import { READER_STATUS } from "../../../configs/enums";
import ENV from "../../../configs/env";
import { DeviceDataModel, ReaderModel } from "../../../models";
import * as Data from "../../../services/Data";

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
  const [collector, setCollector] = useState<DeviceDataModel | null>(null);
  const [reader, setReader] = useState<DeviceDataModel | null>(null);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [selected, setSelected] = useState("collectorCode");
  const { dispatch } = useContext(AppContext);
  const { state } = useContext(AppContext);

  // History for routing
  const history = useHistory();

  // Handle collecting done
  const handleStartTest = async (values: CollectorToReaderFormValues) => {
    try {
      const params = {
        deviceDataModelId: ENV.COLLECTOR_DEVICE_DATA_MODEL_ID,
        devicePropertySetId: ENV.DEVICE_PROPERTY_SET_ID,
        data: {
          CollectorId: values.collectorCode,
          ReaderId: values.readerCode,
          TestStartDate: moment().format("YYYY-MM-DDTHH:mm:ss.sssZ"),
          TestRunBy: state.auth.data.userId,
          TestComplete: false,
        },
      };
      await Data.deviceData(dispatch, params);
      toast.success("The reader associated with collector successfully.");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
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

  const handleCollectorSearch = async (value: string) => {
    const params = {
      deviceDataModelId: ENV.COLLECTOR_DEVICE_DATA_MODEL_ID,
      devicePropertyCodes: ["CollectorId"],
      deviceCriteria: [
        {
          key: "CollectorId",
          operator: "Equal",
          value,
        },
      ],
    };
    const collector = await Data.deviceDataAdvancedOwner(dispatch, params);
    setCollector(collector);
  };

  const handleReaderSearch = async (value: string) => {
    const params = {
      deviceDataModelId: ENV.READER_DEVICE_DATA_MODEL_ID,
      devicePropertyCodes: ["ReaderId", "Status", "HeartbeatReceivedOn"],
      deviceCriteria: [
        {
          key: "ReaderId",
          operator: "Equal",
          value,
        },
      ],
    };
    const reader = await Data.deviceDataAdvancedOwner(dispatch, params);
    setReader(reader);
  };

  const handleQRScanned = async (qr: string | null) => {
    formik.setFieldValue(selected, qr);
    switch (selected) {
      case "collectorCode":
        handleCollectorSearch(qr as string);
        break;
      case "readerCode":
        handleReaderSearch(qr as string);
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
    onSubmit: handleStartTest,
  });

  const readerData = reader?.data as ReaderModel;

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
            const { errors, touched, values, handleSubmit, handleChange } =
              formik;
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
                      onInputChanged={(event) => {
                        handleCollectorSearch(event.target.value);
                      }}
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
                      onInputChanged={(event) => {
                        handleReaderSearch(event.target.value);
                      }}
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
                {collector && (
                  <FormGroup>
                    <Row>
                      <Col sm={12} md={4}>
                        <Label>Patient Name</Label>
                        <p>{collector.ownerName}</p>
                      </Col>
                      <Col sm={12} md={4}>
                        <Label>Email Address</Label>
                        <p>{collector.owner?.emailAddress}</p>
                      </Col>
                      <Col sm={12} md={4}>
                        <Label>Date of Birth</Label>
                        <p>
                          {moment(collector.owner?.dateOfBirth).format(
                            "M/D/YYYY"
                          )}
                        </p>
                      </Col>
                    </Row>
                  </FormGroup>
                )}
                {reader && (
                  <FormGroup>
                    <Label>Reader Status</Label>
                    <p>
                      {readerData &&
                      readerData.Status?.value === READER_STATUS.ONLINE ? (
                        <FontAwesomeIcon icon={faCircleNotch} color="green" />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} color="red" />
                      )}
                      <span className="ml-2">
                        {readerData && readerData.Status?.value}
                      </span>
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
                    // disabled={!collector || !reader}
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
