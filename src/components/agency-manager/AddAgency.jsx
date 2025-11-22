import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Agency name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  gst: Yup.string()
    // .matches(/^[0-9A-Z]{15}$/, "GST must be 15 characters (alphanumeric)")
    .required("GST number is required"),
  address: Yup.string().required("Address is required"),
});

const AddAgency = () => {
  const initialValues = {
    name: "",
    email: "",  
    phone: "",
    gst: "",
    address: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitted Agency Data:", values);
    alert("Agency details submitted successfully!");
    resetForm();
  };

  return (
    <div className="container mt-2" >
      <div className="fw-bold m-2 ">Add Agency</div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="border p-4 rounded shadow-sm bg-light">
            <div className="d-flex justify-content-between gap-3 mb-3">
              <div className="flex-fill">
                <label className="form-label">Agency Name</label>
                <Field
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter agency name"
                />
                <ErrorMessage
                  name="name"
                  component={"div"}
                  className="text-danger small mt-1"
                />
              </div>

              <div className="flex-fill">
                <label className="form-label">GST Number</label>
                <Field
                  type="text"
                  name="gst"
                  className="form-control"
                  placeholder="Enter GST number"
                />
                <ErrorMessage
                  name="gst"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>
            </div>

            <div className="d-flex gap-3 mb-3">
              <div className="flex-fill">
                <label className="form-label">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="flex-fill">
                <label className="form-label">Phone Number</label>
                <Field
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <Field

                name="address"
                className="form-control"
                rows="3"
                placeholder="Enter agency address"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-danger small mt-1"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAgency;
