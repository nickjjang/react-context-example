import classNames from "classnames";
import React, { useContext } from "react";
import { PuffLoader } from "react-spinners";
import AppContext from "../AppContext";
import "./LoadingTent.scss";

const LoadingTent = (): React.ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <div
      className={classNames({
        "app-loading-tent": true,
        "d-none": !state.loading,
      })}
    >
      <div className="loading-indicator">
        <PuffLoader color={"green"} loading={true} />
      </div>
    </div>
  );
};

export default LoadingTent;
