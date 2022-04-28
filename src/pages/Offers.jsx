import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";

function Offers() {
  const [listings, setlistings] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const getListings = async () => {
      try {
        const q = query(
          collection(db, "listings"),
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        const result = await getDocs(q);
        let listings = [];
        result.forEach((listing) =>
          listings.push({ id: listing.id, data: listing.data() })
        );
        setlistings(listings);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch listings");
      }
    };

    getListings();
  }, []);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {isLoading ? (
        <Spinner />
      ) : listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <>
          <p>No offers found</p>
        </>
      )}
    </div>
  );
}

export default Offers;
