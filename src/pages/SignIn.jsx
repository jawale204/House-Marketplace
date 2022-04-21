import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import visibility from "../assets/svg/visibilityIcon.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = { ...formData };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials.user) {
        navigator("/Profile");
      }
    } catch (error) {
      toast.error("Wrong credentioals");
      console.log(error);
    }
  };

  return (
    <>
      <div className="pageContainer compressed">
        <header>
          <div className="pageHeader">Welcome Back</div>
        </header>

        <form onSubmit={handleSubmit}>
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
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signUpBar">
            <p className="signUpText">Sign In</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <Link to="/sign-up" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
}

export default SignIn;
