import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import data from "../../../data";
import { PatientModel } from "../../../models";
import List from "./List";
import SearchForm, { SearchFormValues } from "./SearchForm";

const SearchPatients = (): React.ReactElement => {
  const history = useHistory();
  const [patients, setPatients] = useState<Array<PatientModel>>([]);

  const handleSearch = (values: SearchFormValues) => {
    console.log(values);
    setPatients(data.patients);
  };

  const handleContinueWithSelected = (values: PatientModel) => {
    console.log(values);
    history.push(`collector/${values.id}`);
  };

  const handleCreateNew = () => {
    history.push("/register-patient");
  };

  return (
    <>
      <Helmet>
        <title>Search Patients - Aptitude</title>
        <meta name="description" content="Search Patients" />
        <body className="page-search-patients" />
      </Helmet>
      <Card>
        <CardBody>
          <SearchForm onSubmit={handleSearch} />
          <List
            data={patients}
            onContinueWithSelected={handleContinueWithSelected}
            onCreateNew={handleCreateNew}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default SearchPatients;
