import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";
// import TopBar from "../navigation/topbar";
import "./layout.css";

export default function RouteWrapper(): ReactElement {
  return (
    <div className="layout-container">
      <div className="main-content">
        {/* <TopBar /> */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
