import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import AppContext from "../../../AppContext";
import { PageModel, UserModel } from "../../../models";
import * as User from "../../../services/User";
import List from "./List";
import SearchForm, { SearchFormValues } from "./SearchForm";

const SearchPatients = (): React.ReactElement => {
  const history = useHistory();
  const [page, setPage] = useState<PageModel>({} as PageModel);
  const { dispatch } = useContext(AppContext);

  const handleSearch = async (values: SearchFormValues) => {
    try {
      const page = await User.findAll(dispatch, values);
      setPage(page);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinueWithSelected = (values: UserModel) => {
    console.log(values);
    history.push(`patient-to-collector/${values.emailAddress}`);
  };

  const handleCreateNew = () => {
    history.push("/register-patient");
  };

  return (
    <>
      <Helmet>
        <title>Search Patients - Aptitude</title>
        <meta name="description" content="Search Patients" />
        <body className="page-patients" />
      </Helmet>
      <Card>
        <CardBody>
          <SearchForm onSubmit={handleSearch} />
          <List
            data={page}
            onContinueWithSelected={handleContinueWithSelected}
            onCreateNew={handleCreateNew}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default SearchPatients;
