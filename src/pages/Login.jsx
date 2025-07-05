import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle user's input changes
  const changInputHandler = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit login handler
  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    // Send login request to the server
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        userData
      );
      if (response.statusText == "OK") {
        dispatch(userActions.changeCurrentUser(response.data));
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="register">
      <div className="container register__container">
        <h2>Sign In</h2>
        <form onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={changInputHandler}
            disabled={isLoading}
          />
          <div className="password__controller">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={changInputHandler}
              disabled={isLoading}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
            </span>
          </div>
          <p>
            Already have an account? <Link to="/register">Sign Up</Link>
          </p>
          <button type="submit" className="btn primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
