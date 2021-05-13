import classnames from "classnames";
import moment from "moment";
import React, { useState } from "react";
import { Button, FormGroup, Table } from "reactstrap";
import { PageModel, UserModel } from "../../../models";

export interface SearchFormValues {
  email: string;
}

export interface ListProps {
  data: PageModel;
  onContinueWithSelected: (values: UserModel) => void;
  onCreateNew: () => void;
}

const List = ({
  data,
  onContinueWithSelected,
  onCreateNew,
}: ListProps): React.ReactElement => {
  const [selected, setSelected] = useState<UserModel | null>(null);
  const list = data && data.content ? data.content : ([] as Array<UserModel>);
  return (
    <>
      {list.length > 0 && (
        <>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Email Address</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {list.map((values: UserModel, index: number) => (
                <tr
                  key={`${index}`}
                  onClick={() => {
                    if (values === selected) {
                      setSelected(null);
                    } else {
                      setSelected(values);
                    }
                  }}
                  className={classnames({
                    "bg-secondary": selected === values,
                  })}
                >
                  <td>
                    {values.firstName} {values.lastName}
                  </td>
                  <td>{values.emailAddress}</td>
                  <td>{moment(values.dateOfBirth).format("D/M/YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <FormGroup className="text-right mb-1">
            <Button
              type="button"
              color="primary"
              disabled={!selected}
              onClick={() => {
                if (selected) {
                  onContinueWithSelected(selected);
                }
              }}
            >
              Continue With This Patient
            </Button>
          </FormGroup>
          <FormGroup className="text-right mb-1">OR</FormGroup>
        </>
      )}
      <FormGroup className="text-right">
        <Button
          type="button"
          color="primary"
          onClick={() => {
            onCreateNew();
          }}
        >
          Create New One
        </Button>
      </FormGroup>
    </>
  );
};

export default List;
