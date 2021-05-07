import classNames from "classnames";
import moment from "moment";
import React from "react";
import { NavLink } from "react-router-dom";
import { Table } from "reactstrap";
import { TEST_RESULT } from "../../../configs/enums";
import { TestModel } from "../../../models";

export interface ListProps {
  data: Array<TestModel>;
}

const List = ({ data }: ListProps): React.ReactElement => {
  return (
    <>
      {data.length > 0 && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Test Completed On</th>
                <th>Patient Name</th>
                <th>Date of Birth</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((values: TestModel, index: number) => (
                <tr key={`${index}`}>
                  <td>
                    {moment(values.TestEndDate).format("DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td>John Doe</td>
                  <td>04/09/1984</td>
                  <td>
                    <span
                      className={classNames({
                        "text-success":
                          values.TestResult === TEST_RESULT.POSITIVE,
                        "text-dark": values.TestResult === TEST_RESULT.NEGATIVE,
                        "text-danger": values.TestResult === TEST_RESULT.ERROR,
                        "text-muted":
                          values.TestResult === TEST_RESULT.NO_RESULT,
                      })}
                    >
                      {values.TestResult}
                    </span>
                  </td>
                  <td>
                    <NavLink to={`/test-records/${values.Id}`}>Details</NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default List;
