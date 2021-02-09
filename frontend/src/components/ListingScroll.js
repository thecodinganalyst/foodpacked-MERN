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
    <div className="wrapper">
      <div>
        <input
          className="form-control"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Search an item name..."
        />
        <datalist id="datalistOptions">
          {/* extract last 3 listings */}
          {listings.slice(-3).map((listing, key) => (
            <option key={key} value={listing.itemName} />
          ))}
        </datalist>
      </div>
      <div className="header-text">
        <h1>Your uploads</h1>
      </div>
      <div className="uploads-scroll">
        {listings.map((listing, index) => (
          <Listing key={index} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingsMain;
