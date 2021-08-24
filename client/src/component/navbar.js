import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img alt="not found" src="https://mergeasy.com/dist/images/logo_final_2020.png" height="50px"></img></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/sheets/"><h5>Sheets</h5></NavLink>
               </NavItem>
            <NavItem>
              <NavLink href="/sign/"><h5>Sign</h5></NavLink>
            </NavItem>
            <NavItem>
              {/* <NavLink href="/autoSign/"><h5>autosign</h5></NavLink> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;