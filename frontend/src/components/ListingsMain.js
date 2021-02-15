import React, { useEffect, useState } from "react";
import ListingDataService from "../services/ListingDataService";
import Listing from "./Listing";

const ListingsMain = () => {
  const [listings, setListings] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    retrieveListings();
  }, []);

  const retrieveListings = () => {
    ListingDataService.retrieve()
      .then((response) => {
        setListings(response.data);
        setFilteredListings(response.data);
        console.log("saved entries here", response.data);
      })
      .catch((err) => console.log(err));
  };

  const searchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const submitSearch = () => {
    const keyword = searchValue.toLowerCase();
    const filtered = listings.filter(
      (listing) =>
        listing.shopName.toLowerCase().includes(keyword) ||
        listing.itemName.toLowerCase().includes(keyword)
    );
    setFilteredListings(filtered);
  };

  return (
    <div className="wrapper">
      <div className="search-container">
        <input
          className="form-control"
          list="datalistOptions"
          id="searchbar"
          placeholder="Search a shop or item name"
          value={searchValue}
          onChange={searchChange}
        />
        <datalist id="datalistOptions">
          {/* extract last 3 listings */}
          {filteredListings.slice(-3).map((listing, key) => (
            <option key={key} value={listing.itemName} />
          ))}
        </datalist>

        <button type="button" className="btn-custom">
          <span onClick={submitSearch}> Search!</span>
        </button>
        <button className="btn-custom">
          {" "}
          <span onClick={retrieveListings}> Clear search</span>
        </button>
      </div>
      <div className="header-text">
        <h1>Your uploads</h1>
      </div>
      <div className="uploads-scroll">
        {filteredListings.map((listing, index) => (
          <Listing key={index} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingsMain;
