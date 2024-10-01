import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../ReduxFeature/MockSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../StyleComponents/CreateEmployee.css";

function UpdateEmployee() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.mockApiReducer.value);

  const [imagePreview, setImagePreview] = useState(null);

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

  const URL = `http://localhost:8085/api/employees/${id}`;

  useEffect(() => {
    const currentEmployee = employees.find((emp) => emp._id === id);
    if (currentEmployee) {
      setImagePreview(
        `http://localhost:8085/uploads/${currentEmployee?.image}`
      );
    }
  }, [id, employees]);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("employeeName", values.employeeName);
      formData.append("employeeId", values.employeeId);
      formData.append("department", values.department);
      formData.append("designation", values.designation);
      formData.append("project", values.project);
      formData.append("type", values.type);
      formData.append("status", values.status);
      formData.append("image", values.image);

      const response = await axios.put(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(updateEmployee(response.data));
      navigate("/");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <h2 className="AddNewEmployeTitle">Edit Employee Details</h2>
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
        {({ setFieldValue }) => (
          <Form className="employee-form">
            <h3 className="PersonalInformationTitle">
              <span>
                <i className="bi bi-person"></i>
              </span>
              Personal Information
            </h3>

            <div className="form-group">
              <label>Image</label>
              <br />
              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />
              <ErrorMessage name="image" component="div" className="error" />
              {imagePreview && (
                <div className="image-preview">
                  <img
                    src={imagePreview}
                    alt="Employee"
                    style={{
                      width: "150px",
                      height: "150px",
                      marginTop: "10px",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="employeeInputContainer">
              <div className="form-group">
                <label className="employeeLable">
                  Name<span>*</span>
                </label>
                <br />
                <Field
                  type="text"
                  name="employeeName"
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
                  type="text"
                  name="employeeId"
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
                  <option value="Frontend developer">Frontend Developer</option>
                  <option value="Backend developer">Backend Developer</option>
                  <option value="Full Stack developer">
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
                  type="text"
                  name="designation"
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
                <Field type="text" name="project" className="employeeInput" />
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

            <button type="submit">Update</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdateEmployee;
