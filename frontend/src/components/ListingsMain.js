import React, { useEffect, useState } from "react";
import ListingDataService from "../services/ListingDataService";
import Listing from "./Listing";

const ListingsMain = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    retrieveListings();
  }, []);

  const retrieveListings = () => {
    ListingDataService.retrieve()
      .then((response) => {
        setListings(response.data);
        console.log("saved entries here", response.data);
        //continue here. from 27 jan
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="banner-text">
        <h1>Your uploads</h1>
      </div>
      <div className="container-scroll">
        {listings.map((listing, index) => (
          <Listing key={index} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingsMain;
