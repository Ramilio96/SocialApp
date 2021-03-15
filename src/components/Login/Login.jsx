import React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export const Login = ({ isAuth, errorMsg, captchaUrl, logIn }) => {
  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }

  const onLogin = (values, { setSubmitting }) => {
    logIn(values.email, values.password, values.rememberMe, values.captcha);
    setSubmitting(false);
  };

  const errorColor = {
    color: "red",
  };

  const fontButton = {
    fontSize: "18px",
    fontWeight: "bold",
  };
  return (
    <div>
      <Formik
        onSubmit={onLogin}
        initialValues={{
          email: "",
          password: "",
          rememberMe: true,
          captcha: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          }

          return errors;
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Container className="my-5">
            <Row className="justify-content-center">
              <Col xs={12} lg={6}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      className="py-4"
                      placeholder="Почта"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <p style={errorColor}>
                      {" "}
                      {errors.email && touched.email && errors.email}
                    </p>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      className="py-4"
                      placeholder="Пароль"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <p style={errorColor}>
                      {" "}
                      {errors.password && touched.password && errors.password}
                    </p>
                  </Form.Group>

                  {captchaUrl && <Image src={captchaUrl} />}
                  {captchaUrl && (
                    <Form.Control
                      name="captcha"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                  <p style={errorColor}>{errorMsg}</p>
                  <Button
                    style={fontButton}
                    className="w-100 py-3"
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Войти
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    </div>
  );
};

Login.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
  captchaUrl: PropTypes.string,
  logIn: PropTypes.func.isRequired,
};
