import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import Widgets from "./component/Widgets";
import { Outlet } from "react-router-dom";
import ThemeModal from "./component/ThemeModal";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function RootLayout() {
  const { themeModalIsOpen } = useSelector((state) => state.ui);
  const { primaryColor, backgroundColor } = useSelector(
    (state) => state.ui.theme
  );
  useEffect(() => {
    document.body.className = `${primaryColor} ${backgroundColor}`;
  }, [primaryColor, backgroundColor]);
  return (
    <>
      <Navbar />
      <main className="main">
        <div className="container main__container">
          <Sidebar />
          <Outlet />
          <Widgets />
          {themeModalIsOpen && <ThemeModal />}
        </div>
      </main>
    </>
  );
}

export default RootLayout;
