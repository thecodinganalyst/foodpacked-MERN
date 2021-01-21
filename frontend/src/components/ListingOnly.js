import React, { useState, useEffect } from "react";
import ListingDataService from "../services/ListingDataService";

const ListingOnly = (props) => {
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
    ListingDataService.retrieve(id)
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentListing({ ...currentListing, [name]: value });
    console.log("Current listing after handleInputChange", currentListing);
  };

  const updatePublished = (status) => {
    var data = {
      published: status,
    };

    ListingDataService.update(currentListing.id, data)
      .then((response) => {
        setCurrentListing({ ...currentListing, published: status });
        console.log("current listing after clicking update", currentListing);
        console.log("response.data from clicking update", response.data);

        setMessage(
          `Listing ${
            currentListing.published ? "unpublished" : "published"
          } successfully!`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <div className="container-input">
        <div className="intro-text">
          <h5>
            Editing: <br /> abcdefg
          </h5>
        </div>
        <div>
          <form>
            <div className="form-group">
              <label>Shop name: </label>
              <input
                type="text"
                className="form-control"
                id="shopName"
                placeholder="Shop name"
              />
            </div>
            <div className="form-group">
              <label>Item name:</label>
              <input
                type="text"
                className="form-control"
                id="itemName"
                placeholder="Item name"
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
                />
              </div>
            </div>

            <div className="form-group">
              <label>Availability: </label>
              <select className="form-control">
                <option selected>Select...</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            <br />

            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        </div>

        {/* <div className="inputs">
          <div className="name-input">
            <div id="shopName">
              <label> Shop name: </label>
              <input type="text" placeholder="Shop name" />
            </div>
          </div>

          <div className="name-input">
            <div id="itemName">
              <label> Item name: </label>
              <input type="text" placeholder="Item name" />
            </div>
          </div>

          <div className="name-input">
            <div id="price">
              <label> Price: </label>
              <div className="badge-input">
                {" "}
                <span>$</span>
                {/* make it to 2dp only later on */}
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
    </div>
  );
};

export default ListingOnly;
