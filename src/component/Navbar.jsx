/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import ProfileImage from "./ProfileImage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const {
    id: userId,
    token,
    profilePhoto,
  } = useSelector((state) => state.user?.currentUser);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <nav className="navbar">
      <div className="container navbar__container">
        <Link to="/" className="navbar__logo">
          Simphy
        </Link>
        <form className="navbar__search">
          <input type="search" name="search" placeholder="Search" />
          <button type="submit">
            <CiSearch />
          </button>
        </form>
        <div className="navbar__right">
          <Link to={`/users/${userId}`} className="navbar__profile">
            <ProfileImage image={profilePhoto} />
          </Link>
          {token ? (
            <Link to="/logout" className="navbar__logout">
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
