import React from "react";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
function Contact() {
  const [landlord, setLandlord] = useState(null);
  const params = useParams();
  const [message, setMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", params.UserId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    };

    getUser();
  }, []);

  const handleChange = (e) => {
    console.log("uo");
    setMessage(e.target.value);
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact landlord</p>
      </header>
      {landlord === null ? (
        <Spinner />
      ) : (
        <div>
          <main>
            <div className="contactLandlord">
              <p className="landLordName">Contact {landlord?.name}</p>
            </div>
            <form className="messageForm">
              <div className="messageDiv">
                <label htmlFor="message" className="messageLabel">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  className="textarea"
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
            </form>
          </main>
          <a
            href={`mailto:${landlord.email}?Subject=${searchParams.get(
              "listingName",
            )}&body=${message}`}
          >
            <button type="button" className="primaryButton">
              Send Message
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default Contact;
