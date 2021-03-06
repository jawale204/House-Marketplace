import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Offers from "./pages/Offers";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./components/PrivateRoute";
import Category from "./pages/Category";
import Createlisting from "./pages/Createlisting";
import Listing from "./components/Listing";
import Contact from "./pages/Contact";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Explore />}></Route>
          <Route exact path="/offers" element={<Offers />}></Route>
          <Route
            exact
            path="/category/:categoryName"
            element={<Category />}
          ></Route>
          <Route exact path="/sign-in" element={<SignIn />}></Route>
          <Route exact path="/sign-up" element={<SignUp />}></Route>
          <Route path="/create-listing" element={<PrivateRoute />}>
            <Route
              exact
              path="/create-listing"
              element={<Createlisting />}
            ></Route>
          </Route>

          <Route
            exact
            path="/forgot-password"
            element={<ForgotPassword />}
          ></Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route exact path="/profile" element={<Profile />}></Route>
          </Route>
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          ></Route>
          <Route path={`/contact/:UserId`} element={<Contact />}></Route>
        </Routes>
        <Navbar />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
