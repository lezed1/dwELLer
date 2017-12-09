import * as React from 'react';
import { Navbar, Nav, NavItem,  } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Main</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="#/log">
              Log
            </NavItem>
          </Nav>
        </Navbar>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
