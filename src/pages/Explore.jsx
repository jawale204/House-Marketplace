import React from "react";
import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";

function Explore() {
  return (
    <>
      <div className="explore">
        <header>
          <p className="pageHeader">Explore</p>
        </header>
        <main>
          <p className="exploreCategoryHeading">Category</p>
          <div className="exploreCategories">
            <Link to="/category/rent">
              <img
                src={rentCategoryImage}
                alt="Rent Category"
                className="exploreCategoryImg"
              />
              <p className="exploreCategoryName">Place for rent</p>
            </Link>
            <Link to="/category/sell">
              <img
                src={sellCategoryImage}
                alt="Sell Category"
                className="exploreCategoryImg"
              />
              <p className="exploreCategoryName">Place for sell</p>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export default Explore;
