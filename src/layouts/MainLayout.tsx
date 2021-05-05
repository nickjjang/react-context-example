import React from "react";
import { Container } from "reactstrap";

export interface MainLayoutProps {
  children?: any;
}

const PortalLayout = (props: MainLayoutProps) => {
  const { children } = props;
  return (
    <div className="main-layout">
      <Container>
          {children}
      </Container>
    </div>
  );
};

export default PortalLayout;  
