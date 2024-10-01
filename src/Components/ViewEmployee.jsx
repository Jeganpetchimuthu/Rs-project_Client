import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loading, fetchData, deleteEmployee } from "../ReduxFeature/MockSlice";
import { useNavigate, Link } from "react-router-dom";
import "../StyleComponents/ViewEmployee.css";

function ViewEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, value: employee } = useSelector(
    (state) => state.mockApiReducer
  );
  const URL = "http://localhost:8085/api/employees";

  useEffect(() => {
    const fetchEmployees = async () => {
      dispatch(loading());
      try {
        const res = await axios.get(URL);
        dispatch(fetchData(res.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployees();
  }, [dispatch]);

  const handleCreate = () => {
    navigate("/create");
  };

  const handleDelete = async (id) => {
    const deleteURL = `http://localhost:8085/api/employees/${id}`;
    try {
      await axios.delete(deleteURL);
      dispatch(deleteCustomer(id));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="viewEmployeeContainers">
      <div className="HeaderEmployeeDetails">
        <h2 className="employeeHeadName">Employee</h2>
        <input
          className="viewEmployeeInput"
          placeholder="       Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
        <span className="ViewsearchIcon">
          <i className="bi bi-search"></i>
        </span>
        <Link to={"/create"}>
          <Button
            className="custom-blue-button"
            size="lg"
            active
            onClick={handleCreate}
          >
            <span>
              <i class="bi bi-plus-circle"></i>
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
            <th className="th9">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="9" className="text-center">
                Loading...
              </td>
            </tr>
          ) : employee && employee.length > 0 ? (
            employee.map((emp) => (
              <tr key={emp.id} className="employeetrContainer">
                <td className="employeeNameContainer">{emp.employeeName}</td>
                <td>
                  {emp.image ? (
                    <img
                      className="imageContainers"
                      src={`http://localhost:8085/uploads/${emp.image}`}
                      alt="Employee"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="EmployeeIdContainer">{emp.employeeId}</td>
                <td className="EmpoyeeDepartmentsContainer">
                  {emp.department}
                </td>
                <td className="EmployeeDesignation">{emp.designation}</td>
                <td className="EmployeeProject">{emp.project}</td>
                <td className="EmployeeType">{emp.type}</td>
                <td className="EmployeeStatus">{emp.status}</td>
                <td className="buttonContainer">
                  <i
                    className="bi bi-eye text-info mx-2"
                    onClick={() => navigate(`/get/${emp.id}`)}
                    style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    title="View"
                  ></i>
                  <i
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/edit/${emp.id}`)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </i>
                  <i
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(emp.id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewEmployee;
