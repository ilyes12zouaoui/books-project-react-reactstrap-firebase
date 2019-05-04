import React, { Component } from "react";
import { Link, NavLink as NavReactRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        {" "}
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <NavReactRouter
              style={{ color: "black" }}
              to="/"
              className="nav-link"
              exact
            >
              Books Lovers
            </NavReactRouter>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavReactRouter to="/" className="nav-link" exact>
                  home
                </NavReactRouter>{" "}
              </NavItem>
              <NavItem>
                <NavReactRouter to="/list" className="nav-link" exact>
                  list
                </NavReactRouter>{" "}
              </NavItem>
              <NavItem>
                <NavReactRouter to="/add" className="nav-link" exact>
                  add
                </NavReactRouter>{" "}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
