import { Outlet } from "react-router-dom";
// import SideNavbar from "../navigation/sidenav";

import "./layout.css";

export default function RouteWrapper() {
  return (
    <div className="layout-container">
      {/* <SideNavbar /> */}
      <div className="main-content">
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
