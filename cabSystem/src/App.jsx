import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./common/components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
