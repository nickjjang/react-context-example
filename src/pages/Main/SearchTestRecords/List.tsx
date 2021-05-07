import classnames from "classnames";
import moment from "moment";
import React, { useState } from "react";
import { Button, FormGroup, Table } from "reactstrap";
import { PatientModel } from "../../../models";

export interface ListProps {
  data: Array<PatientModel>;
  onContinueWithSelected: (values: PatientModel) => void;
  onCreateNew: () => void;
}

const List = ({
  data,
  onContinueWithSelected,
  onCreateNew,
}: ListProps): React.ReactElement => {
  const [selected, setSelected] = useState<PatientModel | null>(null);
  return (
    <>
      {data.length > 0 && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Email Address</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {data.map((values: PatientModel, index: number) => (
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
                  <td>{values.email}</td>
                  <td>{moment(values.dateOfBirth).format("D/M/YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <FormGroup className="text-right">
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
            <br />
            OR
            <br />
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
      )}
    </>
  );
};

export default List;
