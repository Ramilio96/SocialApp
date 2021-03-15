import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Formik } from "formik";
import PropTypes from "prop-types";

export const AddTodoForm = ({ addTodo }) => {
  let onAddTodo = (values, { setSubmitting }) => {
    addTodo(values.title);
    values.title = "";
    setSubmitting(false);
  };
  return (
    <>
      <Formik initialValues={{ title: "" }} onSubmit={onAddTodo}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />

              <InputGroup.Append>
                <Button
                  variant="outline-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Добавить
                </Button>
              </InputGroup.Append>
              {errors.title && touched.title && errors.title}
            </InputGroup>
          </form>
        )}
      </Formik>
    </>
  );
};

AddTodoForm.propTypes = {
  addTodo: PropTypes.func,
};
