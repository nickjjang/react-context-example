import React from "react";
import Helmet from "react-helmet";

const Page404 = (): React.ReactElement => {
  return (
    <>
      <Helmet>
        <title>404 - Aptitide</title>
        <meta name="description" content="404" />
        <body className="page-404" />
      </Helmet>
      <h1 className="display-3">404</h1>
      <h1>Page not found</h1>
    </>
  );
};

export default Page404;
