import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function Register() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle user's input changes
  const changInputHandler = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit registration handler
  const registerUser = async (e) => {
    e.preventDefault();

    // Send registration request to the server
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        userData
      );
      if (response.statusText == "Created") navigate("/login");
      console.log(response);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <section className="register">
      <div className="container register__container">
        <h2>Sign Up</h2>
        <form onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={changInputHandler}
            autoFocus
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={changInputHandler}
          />
          <div className="password__controller">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={changInputHandler}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
            </span>
          </div>
          <div className="password__controller">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={changInputHandler}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
            </span>
          </div>
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          <button type="submin" className="btn primary">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
