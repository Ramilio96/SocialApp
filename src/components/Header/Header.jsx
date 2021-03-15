import React from "react";
import { Container, Row, Col, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link, Switch, Route } from "react-router-dom";
import ProfileContainer from "../Profile/ProfileContainer";
import UsersContainer from "../Users/UsersContainer";
import LoginContainer from "../Login/LoginContainer";
import Weather from "./Weather/Weather";
import UsersProfileContainer from "../Users/UsersProfile/UsersProfileContainer";
import HeaderProfileContainer from "./HeaderProfile/HeaderProfileContainer";
import TodoContainer from "../Todo/TodoContainer";
import PropTypes from "prop-types";

export const Header = ({ isAuth, login, logout }) => {
  const styleFont = {
    fontWeight: "bold",
    color: "black",
  };
  const styleDropdown = {
    background: "none",
    border: "none",
    color: "gray",
  };

  const styleLink = {
    color: "#000000",
    textDecoration: "none",
  };

  const styleLogo = {
    color: "#007bff",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div>
      <Container>
        <Row className="my-2">
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Weather />
          </Col>
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <h1 style={styleLogo} className="text-center">
              Social App
            </h1>
          </Col>
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <div>
              {isAuth ? (
                <Dropdown>
                  <Dropdown.Toggle
                    className="d-flex align-items-center"
                    style={styleDropdown}
                    id="dropdown-basic"
                  >
                    <span style={styleFont}>{login}</span>
                    <HeaderProfileContainer />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link
                      className="dropdown-item"
                      to="/profile"
                      href="/profile"
                      style={styleLink}
                    >
                      Мой профиль
                    </Link>

                    <Dropdown.Item onClick={logout}>Выйти</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link to="/login" as={Link} className="mx-5" href="/login">
                  Войти
                </Nav.Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link
              to="/profile"
              as={Link}
              className="mx-5 text-center"
              href="/profile"
            >
              Профиль
            </Nav.Link>
            <Nav.Link
              to="/users"
              as={Link}
              className="mx-5 text-center"
              href="/users"
            >
              Френды
            </Nav.Link>
            <Nav.Link
              to="/todo"
              as={Link}
              className="mx-5 text-center"
              href="/todo"
            >
              Список дел
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        <Switch>
          <Route exact path="/" component={ProfileContainer} />
          <Route exact path="/profile" component={ProfileContainer} />
          <Route
            exact
            path="/profile/:userId?"
            component={UsersProfileContainer}
          />
          <Route exact path="/users" component={UsersContainer} />
          <Route exact path="/todo" component={TodoContainer} />
          <Route exact path="/login" component={LoginContainer} />
        </Switch>
      </div>
    </div>
  );
};

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  login: PropTypes.string,
  logout: PropTypes.func,
};
