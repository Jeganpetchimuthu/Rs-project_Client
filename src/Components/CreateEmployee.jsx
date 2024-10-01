import React from "react";
import { useDispatch } from "react-redux";
import { createEmpoyees } from "../ReduxFeature/MockSlice";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../StyleComponents/CreateEmployee.css";

function CreateEmployee() {
  const dispatch = useDispatch();
  const URL = "http://localhost:8085/api/employees";
  const validationSchema = Yup.object({
    employeeName: Yup.string().required("Employee Name is required"),
    employeeId: Yup.string().required("Employee ID is required"),
    department: Yup.string().required("Department is required"),
    designation: Yup.string().required("Designation is required"),
    project: Yup.string().required("Project is required"),
    type: Yup.string().required("Type is required"),
    status: Yup.string().required("Status is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("employeeName", values.employeeName);
    formData.append("employeeId", values.employeeId);
    formData.append("department", values.department);
    formData.append("designation", values.designation);
    formData.append("project", values.project);
    formData.append("type", values.type);
    formData.append("status", values.status);

    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await axios.post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(createEmpoyees(response.data));
      resetForm();

      navigate("/");
    } catch (error) {
      console.error("Error creating employee:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="AddNewEmployeTitle">Add New Employee</h2>
      <Formik
        initialValues={{
          employeeName: "",
          employeeId: "",
          department: "",
          designation: "",
          project: "",
          type: "",
          status: "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="employee-form">
            <h3 className="PersonalInformationTitle">
              {" "}
              <span>
                <i className="bi bi-person"></i>
              </span>
              Personal Information
            </h3>

            <div className="empoyeeContaindrs">
              <label className="employeeImage">Image</label>
              <br />
              <input
                type="file"
                name="image"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="image" component="div" className="error" />
            </div>

            <div className="employeeInputContainer">
              <div className="form-group">
                <label className="employeeLable">
                  Name<span>*</span>
                </label>
                <br />
                <Field
                  name="employeeName"
                  type="text"
                  className="employeeInput"
                />
                <ErrorMessage
                  name="employeeName"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label className="employeeLable">
                  Employee ID<span>*</span>
                </label>
                <br />
                <Field
                  name="employeeId"
                  type="text"
                  className="employeeInput"
                />
                <ErrorMessage
                  name="employeeId"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            <div className="employeeInputContainer">
              <div className="form-group">
                <label className="employeeLable">
                  Department<span>*</span>
                </label>
                <br />
                <Field as="select" name="department" className="employeeInput">
                  <option value="">Select Department</option>
                  <option value="Design Lead">Design Lead</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>
                </Field>
                <ErrorMessage
                  name="department"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label className="employeeLable">
                  Designation<span>*</span>
                </label>
                <br />
                <Field
                  name="designation"
                  type="text"
                  className="employeeInput"
                />
                <ErrorMessage
                  name="designation"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            <div className="employeeInputContainer">
              <div className="form-group">
                <label className="employeeLable">Project</label>
                <br />
                <Field name="project" type="text" className="employeeInput" />
                <ErrorMessage
                  name="project"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label className="employeeLable">
                  Type<span>*</span>
                </label>
                <br />
                <Field as="select" name="type" className="employeeInput">
                  <option value="">Select Type</option>
                  <option value="Office">Office</option>
                  <option value="Work From Home">Work From Home</option>
                  <option value="Full Time">Full Time</option>
                </Field>
                <ErrorMessage name="type" component="div" className="error" />
              </div>
            </div>

            <div className="employeeInputContainer">
              <div className="form-group">
                <label className="employeeLable">
                  Status<span>*</span>
                </label>
                <br />
                <Field as="select" name="status" className="employeeInput">
                  <option value="">Select Status</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Temporary">Temporary</option>
                </Field>
                <ErrorMessage name="status" component="div" className="error" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Confirm"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateEmployee;
