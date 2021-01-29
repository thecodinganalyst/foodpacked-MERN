import React, { useState, useEffect } from "react";
import ListingDataService from "../services/ListingDataService";

const EditListing = (props) => {
  const initialListingState = {
    id: null,
    shopName: "",
    itemName: "",
    price: 0,
    available: false,
  };

  const [currentListing, setCurrentListing] = useState(initialListingState);
  const [message, setMessage] = useState("");

  const getListing = (id) => {
    ListingDataService.retrieveById(id)
      .then((response) => {
        setCurrentListing(response.data);
        console.log("Retrieving individual tutorial", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListing(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    console.log("hi", currentListing);
  }, [currentListing]);

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

  const updateListing = () => {
    ListingDataService.update(currentListing.id, currentListing)
      .then((response) => {
        console.log("updateListing response.data", response.data);
        setMessage("Listing updated successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div>
      {currentListing ? (
        <div className="container-edit">
          <div className="intro-text">
            <h5>
              Editing: <br /> abcdefg
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
            </div>
            <div className="form-group">
              <label>Item name:</label>
              <input
                type="text"
                className="form-control"
                id="itemName"
                name="itemName"
                value={currentListing.itemName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Price: </label>
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  name="price"
                  value={currentListing.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* make a handler */}
            <div className="form-group">
              <label>Availability: </label>
              <select
                className="form-control"
                // default value does not work here, doesn't change the shown value accordingly...i wonder why?
                value={
                  currentListing.available === true
                    ? "available"
                    : "unavailable"
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
            </div>

            <p> {message}</p>

            <br />

            <button className="btn-submit" onClick={updateListing}>
              Update
            </button>
            <button className="btn-submit" onClick={deleteListing}>
              {" "}
              Delete{" "}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p> Please click on a listing! </p>
        </div>
      )}
      ;{/* make it to 2dp only later on */}
      {/* <input
                  type="number"
                  placeholder="Price"
                  min="1"
                  step="0.10"
                  data-number-to-fixed="2"
                />
              </div>
            </div>
          </div>
        </div>{" "}
        */}
    </div>
  );
};

export default EditListing;
