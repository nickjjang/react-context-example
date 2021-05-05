import React from "react";
import { Container } from "reactstrap";
import logo from "../assets/img/logo.png";
import './PortalLayout.scss';

export interface PortalLayoutProps {
  title: string;
  children: object;
}

const PortalLayout = (props: PortalLayoutProps) => {
  const { title, children } = props;
  return (
    <Container className="portal-layout">
      <div className="portal-heading">
        <img src={logo} alt="logo" className="portal-logo" />
        <h1 className="portal-heading text-center">{title}</h1>
      </div>
      <div className="portal-body">{children}</div>
    </Container>
  );
};

export default PortalLayout;
