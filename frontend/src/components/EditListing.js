import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import ListingDataService from "../services/listingDataService";

const EditListing = (props) => {
  const initialListingState = {
    id: null,
    shopName: "",
    itemName: "",
    price: 0,
    available: false,
  };

  const [currentListing, setCurrentListing] = useState(initialListingState);
  const [editItem, setEditItem] = useState("");
  const history = useHistory();

  useEffect(() => {
    getListing(props.match.params.id);
  }, [props.match.params.id]);

  const getListing = (id) => {
    ListingDataService.retrieveById(id)
      .then((response) => {
        setCurrentListing(response.data);
        setEditItem(response.data.itemName);
        console.log("Retrieving individual tutorial", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // also updating whole object tho, although only one property
    // replacing the entire state also
    setCurrentListing({ ...currentListing, [name]: value });
    console.log("Current listing after handleInputChange", currentListing);
  };

  //fix later. the value is set as inverse of expected
  // const updateAvailability = (value) => {
  // var data = {
  //   available: value === "available" ? true : false,
  // };
  //   ListingDataService.update(currentListing.id, currentListing.available)
  //     .then((response) => {
  //       // set state outside promise because there is a time de
  //       // does not immediately change state even after setState is called
  //       console.log("currentListing after update", currentListing);
  //       // huh backend here shows the opposite availability
  //       setMessage(
  //         `Listing now ${
  //           currentListing.available ? "available" : "unavailable"
  //         }!`
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const validateInput = () => {
    if (
      currentListing.shopName === "" ||
      currentListing.itemName === "" ||
      currentListing.price === "" ||
      currentListing.price === "0" ||
      currentListing.price === 0
    ) {
      return true;
    }
    return false;
  };

  const updateListing = () => {
    if (validateInput() === true) {
      alert("Error: One or more fields are invalid. Please check!");
    } else {
      ListingDataService.update(currentListing.id, currentListing)
        .then((response) => {
          alert("Listing updated successfully!");
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteListing = () => {
    ListingDataService.delete(currentListing.id)
      .then((response) => {
        console.log("deleteListing response.data", response.data);
        props.history.push("/listings");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-form">
      <div className="form-card">
        <div className="intro-text">
          <h5>
            Editing: <br /> {editItem}
          </h5>
        </div>

        <div>
          <div className="form-group">
            <label>Shop name: </label>
            <input
              type="text"
              className="form-control"
              id="shopName"
              name="shopName"
              value={currentListing.shopName}
              onChange={handleInputChange}
            />

            <label>Item name:</label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              name="itemName"
              required
              value={currentListing.itemName}
              onChange={handleInputChange}
            />
          </div>

          <label>Price: </label>
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              step="0.01"
              required
              value={currentListing.price}
              onChange={handleInputChange}
            />
          </div>
          {/* make a handler */}

          <label>Availability: </label>
          <select
            className="form-control"
            value={
              currentListing.available === true ? "available" : "unavailable"
            }
            onChange={(e) => {
              // setState is async but should be instant
              // if prob with async then will not be consistently giving opp values
              console.log("e.target.value", e.target.value);
              setCurrentListing({
                ...currentListing,
                available: e.target.value === "available" ? true : false,
              });
              // logging before the state is updated!
              // 28/1 check: React event loop, state updating?
              console.log("currentListing", currentListing);
            }}
          >
            {" "}
            {/* can only pass in string here, not boolean. but what you want to pass in is boolean! */}
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <div className="btn-submit-container">
            <button className="btn-submit" onClick={updateListing}>
              Update
            </button>
            <button className="btn-submit" onClick={deleteListing}>
              {" "}
              Delete
            </button>
          </div>
          <div className="btn-submit-container">
            {" "}
            <Link to={"/listings"} className="btn-custom">
              Back
            </Link>{" "}
          </div>
        </div>
      </div>
      {/* make price to 2dp only later on */}
    </div>
  );
};

export default EditListing;
