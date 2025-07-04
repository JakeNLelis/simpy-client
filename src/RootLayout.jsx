import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import Widgets from "./component/Widgets";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="main">
        <div className="container main__container">
          <Sidebar />
          <Outlet />
          <Widgets />
        </div>
      </main>
    </>
  );
}

export default RootLayout;
