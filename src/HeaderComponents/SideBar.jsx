import React from "react";
import "../StyleComponents/SideBar.css";
import { Link } from "react-router-dom";
function SideBar() {
  return (
    <div className="SideBarContainers">
      <h4 className="   SideBarDashboard">
        <span>
          <i className="bi bi-grid"></i>
        </span>
        Dashboard
      </h4>
      <Link to={"/"} className="EmployeeLink">
        <h3 className="   SideBarDashboard">
          <span>
            <i className="bi bi-person"></i>
          </span>
          Empoyee
        </h3>
      </Link>
      <h3 className="   SideBarDashboard">
        <span>
          <i className="bi bi-calendar"></i>
        </span>
        Calenter
      </h3>

      <h3 className="   SideBarDashboard">
        <span>
          <i class="bi bi-chat-square-text"></i>
        </span>
        Message
      </h3>
    </div>
  );
}

export default SideBar;
