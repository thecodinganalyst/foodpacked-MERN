import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListingDataService from "../services/listingDataService";

// fix to allow only 2 dp max for price
// consider using inbuilt mongo function to round req data to 2 dp and store in 2 dp
// same for EditListing.js

const AddListing = () => {
  const initialListingState = {
    id: null,
    shopName: "",
    itemName: "",
    price: 0,
    available: true,
  };

  const [listing, setListing] = useState(initialListingState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setListing({ ...listing, [name]: value });
  };

  const newListing = () => {
    setListing(initialListingState);
    setSubmitted(false);
  };

  const validateInput = () => {
    if (
      listing.shopName === "" ||
      listing.itemName === "" ||
      listing.price === "" ||
      listing.price === "0" ||
      listing.price === 0
    ) {
      return true;
    }
    return false;
  };
  const saveNewListing = (e) => {
    if (validateInput() === true) {
      alert("Error: One or more fields are invalid. Please check!");
    } else {
      const data = {
        shopName: listing.shopName,
        itemName: listing.itemName,
        price: listing.price,
        available: true,
      };

      ListingDataService.create(data)
        .then((response) => {
          setListing({
            id: response.data.id,
            shopName: response.data.shopName,
            itemName: response.data.itemName,
            price: response.data.price,
            available: response.data.available,
          });
          setSubmitted(true);
          console.log("createListing response.data", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {submitted ? (
        <div className="container-form">
          <div className="form-card">
            <div className="intro-text">
              <h5> Submitted successfully! </h5>
            </div>
            <button
              className="btn-submit"
              style={{ width: "150px" }}
              onClick={newListing}
            >
              {" "}
              Add new listing!{" "}
            </button>
            <div className="btn-submit-container">
              <Link to={"/listings"} className="btn-custom">
                Back
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-form">
          <div className="form-card">
            <div className="intro-text">
              <h5> Adding new listing:</h5>
            </div>

            <div className="form-group">
              <label> Shop name: </label>
              {/* required attribute specifies that 
          an input field must be filled out before submitting the form. */}
              <input
                type="text"
                className="form-control"
                id="shopName"
                name="shopName"
                required
                value={listing.shopName}
                onChange={handleInputChange}
              />
              <label> Item name: </label>
              <input
                type="text"
                className="form-control"
                id="itemName"
                name="itemName"
                required
                value={listing.itemName}
                onChange={handleInputChange}
              />
              <label> Price: </label>
              <div className="input-group-prepend">
                <div className="input-group-text">$</div>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  step="0.01"
                  value={listing.price}
                  onChange={handleInputChange}
                />
              </div>
              {/* future feature to remove listings when purchased and
          show unavailable when there are 0 left */}
              <fieldset disabled>
                <label htmlFor="disabledSelect" className="form-label">
                  {" "}
                  Availability:{" "}
                </label>
                <select
                  type="text"
                  id="disabledSelect"
                  className="form-control"
                >
                  <option> Available (default)</option>
                </select>
              </fieldset>

              <div className="btn-submit-container">
                <button
                  type="submit"
                  className="btn-submit"
                  onClick={saveNewListing}
                >
                  Add!{" "}
                </button>
              </div>

              <div className="btn-submit-container">
                {" "}
                <Link to={"/listings"} className="btn-custom">
                  Back
                </Link>{" "}
              </div>
              {/* did not opt for form with onSubmit handler here: want to check all fields are filled before submitting */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddListing;
