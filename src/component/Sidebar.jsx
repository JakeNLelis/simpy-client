import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa";
import { PiPaintBrushBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { uiSliceActions } from "../store/ui-slice";

function Sidebar() {
  const dispatch = useDispatch();
  const openThemeModal = () => {
    dispatch(uiSliceActions.openThemeModal());
  };

  return (
    <menu className="sidebar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "sidebar__item active" : "sidebar__item"
        }
      >
        <i className="sidebar__icon">
          <AiOutlineHome />
        </i>
        <p>Home</p>
      </NavLink>
      <NavLink
        to="/messages"
        className={({ isActive }) =>
          isActive ? "sidebar__item active" : "sidebar__item"
        }
      >
        <i className="sidebar__icon">
          <GoMail />
        </i>
        <p>Messages</p>
      </NavLink>
      <NavLink
        to="/bookmarks"
        className={({ isActive }) =>
          isActive ? "sidebar__item active" : "sidebar__item"
        }
      >
        <i className="sidebar__icon">
          <FaRegBookmark />
        </i>
        <p>Bookmarks</p>
      </NavLink>
      <a className="sidebar__item" onClick={openThemeModal}>
        <i className="sidebar__icon">
          <PiPaintBrushBold />
        </i>
        <p>Themes</p>
      </a>
    </menu>
  );
}

export default Sidebar;
