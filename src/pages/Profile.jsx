import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase.config";

function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const navigator = useNavigate();
  const { name, email } = user;

  const [editDetails, setEditDetails] = useState(false);

  const onLogout = async () => {
    await auth.signOut();
    navigator("/");
  };

  const handleEditDetailsChange = () => {
    if (editDetails) {
      updateProfileDetails();
    } else {
      setEditDetails((prev) => !prev);
    }
  };
  const updateProfileDetails = async () => {
    if (auth.currentUser.displayName != name) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });

        setEditDetails((prev) => !prev);
      } catch (err) {
        setEditDetails((prev) => !prev);
        setUser({
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
        });
        toast.error("Something went wrong while updating profile");
      }
    } else {
      setEditDetails((prev) => !prev);
    }
  };

  const handleFormDataChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="profile compressed">
      <header className="profileHeader">
        <p className="pageHeader">MyProfile</p>
        <button className="logOut" onClick={onLogout}>
          logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal details</p>
          <p
            className="changePersonalDetails"
            onClick={handleEditDetailsChange}
          >
            {editDetails ? "Save" : "Edit"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              disabled={!editDetails}
              className={editDetails ? "profileNameActive" : "profileName"}
              onChange={handleFormDataChange}
            />
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              disabled={true}
              className="profileEmail"
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
