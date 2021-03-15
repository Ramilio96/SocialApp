import React from "react";
import { Formik } from "formik";
import { Image, InputGroup, FormControl, Button } from "react-bootstrap";

export const AddMessageForm = ({ ws, profile }) => {
  let onAddMessage = (values, { setSubmitting }) => {
    if (!values.message) {
      return;
    }
    ws.send(values.message);

    setSubmitting(false);
    values.message = "";
  };
  return (
    <>
      <Formik initialValues={{ message: "" }} onSubmit={onAddMessage}>
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
          <form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Image
                src={
                  profile.photos.large ||
                  "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                }
                width="35px"
                height="35px"
                className="mx-2"
                roundedCircle
              />
              <FormControl
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="text"
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />

              <InputGroup.Append>
                <Button
                  variant="outline-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Отправить
                </Button>
              </InputGroup.Append>
              {errors.message && touched.message && errors.message}
            </InputGroup>
          </form>
        )}
      </Formik>
    </>
  );
};
