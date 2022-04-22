import React from "react";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const navigator = useNavigate();

  const onLogout = async () => {
    await auth.signOut();
    navigator("/");
  };
  return (
    <div className="profile">
      <div className="profileHeader">
        <p className="pageHeader">MyProfile</p>
        <button className="logOut" onClick={onLogout}>
          logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
