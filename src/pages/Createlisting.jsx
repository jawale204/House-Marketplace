import { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";
function Createlisting() {
  const isMounted = useRef(true);
  const [formData, setFormData] = useState({
    name: "",
    bathrooms: 1,
    bedrooms: 1,
    discountedPrice: 0,
    regularPrice: 0,
    furnished: false,
    imageUrls: [],
    loation: "",
    offer: false,
    parking: false,
    type: "rent",
  });

  useEffect(() => {
    if (isMounted.current) {
      const auth = getAuth();
      setFormData({ ...formData, userRef: auth.currentUser.uid });
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  return <div>Createlisting</div>;
}

export default Createlisting;
