import { useState } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email send successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="profileContainer compressed">
      <header>
        <div className="pageHeader">Forgot password</div>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            value={email}
            className="emailInput"
          />
          <Link to="/sign-in" className="forgotPasswordLink">
            Sign In
          </Link>

          <div className="signInBar">
            <div className="signInText">Send reset email</div>
            <button type="submit" className="signInButton">
              <ArrowRightIcon />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
