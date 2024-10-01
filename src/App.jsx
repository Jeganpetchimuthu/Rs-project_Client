import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewEmployee from "./Components/ViewEmployee";
import CreateEmployee from "./Components/CreateEmployee";
import UpdateEmployee from "./Components/UpdateEmployee";
import Header from "./HeaderComponents/Header";
import SideBar from "./HeaderComponents/SideBar";
import GetEmployee from "./Components/GetEmployee";

function App() {
  return (
    <Router>
      <Header />
      <SideBar />
      <Routes>
        <Route path="/" element={<ViewEmployee />} />
        <Route path="/create" element={<CreateEmployee />} />
        <Route path="/get/:id" element={<GetEmployee />} />
        <Route path="/edit/:id" element={<UpdateEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
