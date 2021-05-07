import {
  faBurn,
  faCloudUploadAlt,
  faSearch,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";

const Intro = (): React.ReactElement => {
  const history = useHistory();

  const handleRegistePatient = () => {
    history.push("/patients");
  };
  const handleStartATest = () => {
    history.push("/collector-to-reader");
  };
  const handleSearchTestRecords = () => {
    history.push("/test-records");
  };
  const handleBulkUpload = () => {
    history.push("/bulk-upload");
  };
  return (
    <>
      <Helmet>
        <title>Intro - Aptitude</title>
        <meta name="description" content="Helmet" />
        <body className="page-helmet" />
      </Helmet>
      <Row>
        <Col xs={12}>
          <h3 className="text-center">
            <strong>Choose from options below</strong>
          </h3>
        </Col>
        <Col xs={12} sm={6}>
          <Button
            block
            className="p-3 p-md-5 my-md-3 my-2"
            color="primary"
            onClick={handleRegistePatient}
          >
            <FontAwesomeIcon icon={faUserPlus} /> Register a Patient
          </Button>
        </Col>
        <Col xs={12} sm={6}>
          <Button
            block
            className="p-3 p-md-5 my-md-3 my-2"
            color="primary"
            onClick={handleStartATest}
          >
            <FontAwesomeIcon icon={faBurn} /> Start a Test
          </Button>
        </Col>
        <Col xs={12} sm={6}>
          <Button
            block
            className="p-3 p-md-5 my-md-3 my-2"
            color="primary"
            onClick={handleSearchTestRecords}
          >
            <FontAwesomeIcon icon={faSearch} /> Search Test Records
          </Button>
        </Col>
        <Col xs={12} sm={6}>
          <Button
            block
            className="p-3 p-md-5 my-md-3 my-2"
            color="primary"
            onClick={handleBulkUpload}
          >
            <FontAwesomeIcon icon={faCloudUploadAlt} /> Bulk upload
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Intro;
