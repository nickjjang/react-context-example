import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import data from "../../../data";
import { PatientModel, TestModel } from "../../../models";
import List from "./List";
import SearchForm, { SearchFormValues } from "./SearchForm";

const SearchTestRecords = (): React.ReactElement => {
  const history = useHistory();
  const [testRecords, setTestRecords] = useState<Array<TestModel>>([]);

  const handleSearch = (values: SearchFormValues) => {
    console.log(values);
    setTestRecords(data.testRecords);
  };

  const handleViewDetail = (values: TestModel) => {
    console.log(values);
    history.push(`patient-to-collector/${values.CollectorId}`);
  };

  return (
    <>
      <Helmet>
        <title>Search Test Records - Aptitude</title>
        <meta name="description" content="Search Test Records" />
        <body className="page-patients" />
      </Helmet>
      <Card>
        <CardBody>
          <SearchForm onSubmit={handleSearch} />
          <List data={testRecords} />
        </CardBody>
      </Card>
    </>
  );
};

export default SearchTestRecords;
