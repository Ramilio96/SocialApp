import React from "react";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const UsersSearchForm = ({ onFilterChanged }) => {
  const onSubmit = (values, { setSubmitting }) => {
    onFilterChanged(values.term);
    setSubmitting(false);
  };
  return (
    <div>
      <Formik onSubmit={onSubmit} initialValues={{ term: "" }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFriend" className="d-flex">
              <Form.Control
                type="text"
                name="term"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.term}
              />
              <Button
                variant="outline-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Найти
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </div>
  );
};

UsersSearchForm.propTypes = {
  onFilterChanged: PropTypes.func,
};
