import React from "react";
import { Link } from "react-router-dom";

const Listing = ({ listing }) => {
  const currformatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "SGD",
  });

  return (
    <div className="container-listing">
      <div className="card">
        <div className="listing-image">
          <img src="https://picsum.photos/250/180" alt="" className="img" />
          <img src="https://picsum.photos/250/180" alt="" className="bg" />
        </div>
        <div className="listing-star">
          <i className="bx bx-star"></i>
        </div>
        <div className="listing-text">
          <h3>{listing.shopName}</h3>
          <p>{listing.itemName}</p>
          {listing.available ? (
            <p>Available</p>
          ) : (
            <p style={{ color: "red", fontWeight: "bold" }}>Unavailable!</p>
          )}
        </div>
        <div className="listing-price">
          {currformatter.format(listing.price)}
        </div>
        <Link to={"/listings/" + listing.id} className="btn-edit">
          Edit
        </Link>{" "}
      </div>
    </div>
  );
};

export default Listing;
