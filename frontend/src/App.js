import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ListingsAndUpload from "./components/ListingsAndUpload";
import ListingOnly from "./components/ListingOnly";

class App extends Component {
  render() {
    return (
      <div>
        {/* <nav classNameName="navbar outline navbar-light bg-light justify-content-between">
         */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a href="/listings" className="navbar-brand mb-0 h1">
              FoodPacked
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/listings"
                >
                  Your listings
                </a>
                <a className="nav-link" href="/add">
                  Add listing
                </a>
              </div>
            </div>
          </div>

          <form className="form-inline">
            <input
              className="form-control mr-sm-2 w-100"
              type="search"
              placeholder="Search a shop name or food item... "
            />
            <button
              className="btn btn-outline-secondary my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </nav>
        <div className="container mt-3">
          <Switch>
            {/* change to a landing page for path "/" later */}
            <Route
              exact
              path={["/", "/listings"]}
              component={ListingsAndUpload}
            />
            <Route path="/listings/:id" component={ListingOnly} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
