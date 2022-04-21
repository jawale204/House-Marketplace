import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import visibility from "../assets/svg/visibilityIcon.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, name, password } = { ...formData };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <>
      <div className="pageContainer compressed">
        <header>
          <div className="pageHeader">Welcome Back</div>
        </header>

        <form className="">
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            className="nameInput"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            className="emailInput"
            onChange={handleChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              value={password}
              className="passwordInput"
              onChange={handleChange}
            />
            <img
              src={visibility}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword(!showPassword)}
            ></img>
          </div>
          <Link to="/forget-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
