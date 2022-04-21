import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import visibility from "../assets/svg/visibilityIcon.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { doc, sectDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, name, password } = { ...formData };

  const navigator = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      updateProfile(user, {
        displayName: name,
      });
      var formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigator("/");
    } catch (error) {
      toast.error("Something went wrong");
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
          <Link to="/forgot-password" className="forgotPasswordLink">
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
