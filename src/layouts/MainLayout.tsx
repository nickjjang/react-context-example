import {
  faIdBadge,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap";
import { AppContext } from "../App";
import logo from "../assets/img/logo.png";
import ActionTypes from "../reducers/ActionTypes";
import "./MainLayout.scss";

export interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps): React.ReactElement => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const handleLogout = async () => {
    await dispatch({ type: ActionTypes.SET_AUTH, payload: null });
    history.push("/login");
  };
  return (
    <div className="main-layout">
      <Navbar color="dark" dark expand>
        <NavbarBrand to="/" className="mr-auto" tag={NavLink}>
          <img src={logo} />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <div className="text-center text-white w-100">
            Aptitude ACE Portal
          </div>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar className="dropdown-profile">
              <DropdownToggle nav caret className="btn btn-primary">
                <FontAwesomeIcon icon={faUser} />
              </DropdownToggle>
              <DropdownMenu right>
                <div className="profile-username">Abbas Dhilawala</div>
                <div className="profile-user-role">Site administrator</div>
                <DropdownItem>
                  <FontAwesomeIcon icon={faIdBadge} /> Profile
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </DropdownItem>
              </DropdownMenu>{" "}
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
      <Container className="py-4">{children}</Container>
    </div>
  );
};

export default MainLayout;
