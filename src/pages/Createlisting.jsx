import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
function Createlisting() {
  const isMounted = useRef(true);
  const [loading, setLoading] = useState(false);
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bathrooms: 1,
    bedrooms: 1,
    discountedPrice: 0,
    regularPrice: 0,
    furnished: false,
    imageUrls: {},
    address: "",
    offer: false,
    parking: false,
    type: "rent",
    lat: "",
    long: "",
  });

  const {
    name,
    bathrooms,
    bedrooms,
    discountedPrice,
    regularPrice,
    furnished,
    imageUrls,
    address,
    offer,
    parking,
    type,
    lat,
    long,
  } = formData;

  useEffect(() => {
    if (isMounted.current) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("discounted price cannot be >= regularprice");
      return;
    }

    if (imageUrls.length > 6) {
      setLoading(false);
      toast.error("max 6 files only");
      return;
    }

    console.log(discountedPrice);

    let geolocation = {};
    let location;
    if (geoLocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );

      const data = await response.json();

      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.long = data.results[0]?.geometry.location.long ?? 0;

      location =
        data.status === "ZERO_RESULTS"
          ? undefined
          : data.results[0]?.formatted_address;

      if (location === undefined || location.includes("undefined")) {
        setLoading(false);
        toast.error("invalid address");
      }
    } else {
      geolocation.lat = lat;
      geolocation.long = long;
      location = address;
    }
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        imageUrls: e.target.files,
      }));
    }

    if (!e.target.files) {
      setFormData((prev) => ({
        ...formData,
        [e.target.id]: boolean != null ? boolean : e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="profile compressed">
      <header>
        <p className="pageHeader">Create listing</p>
      </header>
      <form onSubmit={handleSubmit}>
        <label className="formLabel"> Sell / Rent</label>
        <div className="formButtons">
          <button
            type="button"
            className={type === "sale" ? "formButtonActive" : "formButton"}
            onClick={onMutate}
            id="type"
            value="sale"
          >
            Sell
          </button>
          <button
            type="button"
            className={type === "rent" ? "formButtonActive" : "formButton"}
            onClick={onMutate}
            id="type"
            value="rent"
          >
            Rent
          </button>
        </div>
        <label className="formLabel">Name</label>
        <input
          className="formInputName"
          value={name}
          id="name"
          onChange={onMutate}
          placeholder="Name"
          maxLength={32}
          minLength={10}
          required
        />
        <div className="formRooms flex">
          <div>
            <label className="formLabel">Bedrooms</label>
            <input
              className="formInputSmall"
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onMutate}
              min="1"
              max="50"
              required
            />
          </div>
          <div>
            <label className="formLabel">Bathrooms</label>
            <input
              className="formInputSmall"
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onMutate}
              min="1"
              max="50"
              required
            />
          </div>
        </div>
        <label className="formLabel">Parking spot</label>
        <div className="formButtons">
          <button
            className={parking ? "formButtonActive" : "formButton"}
            type="button"
            id="parking"
            value={true}
            onClick={onMutate}
            min="1"
            max="50"
          >
            Yes
          </button>
          <button
            className={
              !parking && parking !== null ? "formButtonActive" : "formButton"
            }
            type="button"
            id="parking"
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div>
        <label className="formLabel">Furnished</label>
        <div className="formButtons">
          <button
            className={furnished ? "formButtonActive" : "formButton"}
            type="button"
            id="furnished"
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>
          <button
            className={
              !furnished && furnished !== null
                ? "formButtonActive"
                : "formButton"
            }
            type="button"
            id="furnished"
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div>
        <label className="formLabel">Address</label>
        <textarea
          className="formInputAddress"
          type="text"
          id="address"
          value={address}
          onChange={onMutate}
          required
        />
        <label className="formLabel">Offer</label>
        <div className="formButtons">
          <button
            className={offer ? "formButtonActive" : "formButton"}
            type="button"
            id="offer"
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>
          <button
            className={
              !offer && offer !== null ? "formButtonActive" : "formButton"
            }
            type="button"
            id="offer"
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div>

        <label className="formLabel">Regular Price</label>
        <div className="formPriceDiv">
          <input
            className="formInputSmall"
            type="number"
            id="regularPrice"
            value={regularPrice}
            onChange={onMutate}
            min="50"
            max="750000000"
            required
          />
          {type === "rent" && <p className="formPriceText">$ / Month</p>}
        </div>
        {offer && (
          <>
            <label className="formLabel">Discounted Price</label>
            <input
              className="formInputSmall"
              type="number"
              id="discountedPrice"
              value={discountedPrice}
              onChange={onMutate}
              min="50"
              max="750000000"
              required={offer}
            />
          </>
        )}
        <label className="formLabel">Images</label>
        <p className="imageInfo">The first image will be the cover (max 6).</p>
        <input
          type="file"
          className="formInputFile"
          id="images"
          onChange={onMutate}
          max="6"
          accept=".jpg,.png,.jpeg"
          multiple
          required
        />
        {!geoLocationEnabled && (
          <>
            <label className="formLabel">Geo location</label>
            <div className="formRooms">
              <label className="formLabel">Latitude</label>
              <input
                type="text"
                className="formInputName"
                id="lat"
                name="lat"
                value={lat}
                required
                onChange={onMutate}
              />
              <label className="formLabel">Longitude</label>
              <input
                type="text"
                className="formInputName"
                id="long"
                name="long"
                value={long}
                required
                onChange={onMutate}
              />
            </div>
          </>
        )}
        <button type="submit" className="primaryButton createListingButton">
          Create Listing
        </button>
      </form>
    </div>
  );
}

export default Createlisting;
