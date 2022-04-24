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

function Category() {
  const [listings, setlistings] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const getListings = async () => {
      try {
        const q = query(
          collection(db, "listings"),
          where("type", "==", params.categoryName),
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
        <p className="pageHeader">
          Place for {params.categoryName === "rent" ? "rent" : "sale"}
        </p>
      </header>
      {isLoading ? (
        <div>Loading</div>
      ) : listings.length > 0 ? (
        <>
          <main>
            '
            <ul className="categoryListings">
              {listings.map((listing) => (
                <h3 key={listing.id}>{listing.data.name}</h3>
              ))}
            </ul>
          </main>
        </>
      ) : (
        <>
          <p>No listings for {params.categoryName}</p>
        </>
      )}
    </div>
  );
}

export default Category;
