import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useLoginStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingLoggedIn, setCheckingLoggedIn] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingLoggedIn(false);
    });
  }, []);
  return { loggedIn, checkingLoggedIn };
};

export default useLoginStatus;
