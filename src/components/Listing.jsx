import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Listing() {
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState();
  const [linkCopied, setLinkCopied] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getListing = async () => {
      setLoading(true);
      const docRef = doc(db, "listings", params.listingId);
      const docSnapShot = await getDoc(docRef);
      if (docSnapShot.exists()) {
        console.log(docSnapShot.data());
        setListing(docSnapShot.data());
        setLoading(false);
      } else {
        toast.error("Listing not found");
        setLoading(false);
      }
    };

    getListing();
  }, [params.listingId]);
  return <div>rahu kingl</div>;
}

export default Listing;
