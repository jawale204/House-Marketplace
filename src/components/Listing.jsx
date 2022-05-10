import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
import { getAuth } from "firebase/auth";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
function Listing() {
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    const getListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnapShot = await getDoc(docRef);
      if (docSnapShot.exists()) {
        setListing(docSnapShot.data());
        setLoading(false);
      } else {
        toast.error("Listing not found");
        setLoading(false);
      }
    };
    getListing();
    return () => {};
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <title>{listing.name}</title>
      <div className="shareIconDiv">
        <img
          src={shareIcon}
          alt="share Icon"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setLinkCopied(true);
            setTimeout(() => {
              setLinkCopied(false);
            }, 1000);
          }}
        />
      </div>
      {linkCopied && <p className="linkCopied">link copied</p>}
      <div className="listingDetails">
        <p className="listingName">
          {listing.name}- $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            $
            {(listing.regularPrice - listing.discountedPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        )}
        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `Bedrooms ${listing.bedrooms}`
              : `Bedroom 1`}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </li>
          <li>{listing.parking && "Parking Spot"}</li>
          <li>{listing.furnished && "Furnished"}</li>
        </ul>
        <div className="leafletContainer">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></TileLayer>
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${auth.currentUser.uid}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Contact owner
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
