import React from "react";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const navigator = useNavigate();
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      navigator("/sign-in");
    }
  }, [auth.currentUser]);
  return user == null ? (
    <div>Not Logged in</div>
  ) : (
    <div>{user.displayName}</div>
  );
}

export default Profile;
