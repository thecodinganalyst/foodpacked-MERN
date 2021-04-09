import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import ListingDataService from "../services/listingDataService";
import Listing from "./Listing";

// Add filter by availability function

const ListingsMain = () => {
  const [listings, setListings] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const history = useHistory();

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

  const deleteAll = () => {
    alert("Deleted all listings!");
    ListingDataService.deleteAll().then((response) => {
      console.log(response.data);
      //push not working
      history.push("/temp");
      history.goBack();
    });
  };

  // const filterAvailable = () => {
  //   ListingDataService.retrieveAvailable()
  //     .then((response) => {
  //       console.log("retrieve available", response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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

        <button type="button" className="btn-custom" onClick={submitSearch}>
          <span> Search!</span>
        </button>
        <button className="btn-custom" onClick={retrieveListings}>
          {" "}
          <span> Clear search</span>
        </button>
      </div>
      <div className="header">
        <h1>Your uploads</h1>

        {/* <div className="btn-group dropend">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Filter
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" onClick={retrieveListings}>
                All
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={filterAvailable}>
                Available
              </a>
            </li>
            <li>
              <a className="dropdown-item">Something else here</a>
            </li>
          </ul>
        </div> */}
      </div>
      <div className="uploads-scroll">
        {filteredListings.map((listing, index) => (
          <Listing key={index} listing={listing} />
        ))}
      </div>
      <div className="delete-all">
        {listings.length === 0 ? (
          <div className="btn-submit-container">
            {" "}
            <Link to={"/add"} className="btn-custom">
              Add a new listing!
            </Link>{" "}
          </div>
        ) : (
          <Link
            to={"/listings"}
            className="btn-custom"
            id="delete-all"
            onClick={deleteAll}
          >
            Delete all listings!!
            {/* redirect to main page using link? */}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ListingsMain;
