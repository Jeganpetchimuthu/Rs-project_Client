import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loading, fetchData } from "../ReduxFeature/MockSlice";
import "../StyleComponents/ViewEmployee.css";

function GetEmployee() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading, value: employee } = useSelector(
    (state) => state.mockApiReducer
  );

  const URL = `http://localhost:8085/api/employees/${id}`;

  useEffect(() => {
    const fetchEmployee = async () => {
      dispatch(loading());
      try {
        const res = await axios.get(URL);
        console.log("API Response: ", res.data);
        dispatch(fetchData(res.data));
      } catch (error) {
        console.error("Error fetching employee: ", error);
      }
    };
    fetchEmployee();
  }, [dispatch, URL]);

  return (
    <div className="viewEmployeeContainers">
      <div className="HeaderEmployeeDetails">
        <h2 className="employeeHeadName">Employee</h2>
        <input
          className="viewEmployeeInput"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
        <span className="ViewsearchIcon">
          <i className="bi bi-search"></i>
        </span>
        <Link to={"/create"}>
          <Button className="custom-blue-button" size="lg" active>
            <span>
              <i className="bi bi-plus-circle"></i>
            </span>
            Add New Employee
          </Button>
        </Link>
      </div>

      <Table className="employeeTableWrap">
        <thead>
          <tr className="employeeTable">
            <th className="th1">Employee Name</th>
            <th className="th2"></th>
            <th className="th3">Employee ID</th>
            <th className="th4">Department</th>
            <th className="th5">Designation</th>
            <th className="th6">Project</th>
            <th className="th7">Type</th>
            <th className="th8">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="8" className="text-center">
                Loading...
              </td>
            </tr>
          ) : employee ? (
            <tr key={employee._id} className="employeetrContainer">
              <td className="employeeNameContainer">{employee.employeeName}</td>
              <td>
                {employee.image ? (
                  <img
                    className="imageContainers"
                    src={`http://localhost:8085/uploads/${employee.image}`}
                    alt="Employee"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="EmployeeIdContainer">{employee.employeeId}</td>
              <td className="EmpoyeeDepartmentsContainer">
                {employee.department}
              </td>
              <td className="EmployeeDesignation">{employee.designation}</td>
              <td className="EmployeeProject">{employee.project}</td>
              <td className="EmployeeType">{employee.type}</td>
              <td className="EmployeeStatus">{employee.status}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default GetEmployee;
