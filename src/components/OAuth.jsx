import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import googleIcon from "../assets/svg/googleIcon.svg";
import { toast } from "react-toastify";
function OAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  const onSocialAuth = async () => {
    try {
      const auth = getAuth();
      const googleAuthProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with google authentication");
    }
  };
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/sign-in" ? "in" : "up"}</p>
      <button className="socialIconDiv" onClick={onSocialAuth}>
        <img src={googleIcon} alt="google" className="socialIconImg" />
      </button>
    </div>
  );
}

export default OAuth;
