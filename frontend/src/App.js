import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ListingsMain from "./components/ListingsMain";
import EditListing from "./components/EditListing";
import AddListing from "./components/AddListing";

class App extends Component {
  render() {
    return (
      <div>
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
        </nav>

        <Switch>
          {/* change to a landing page for path "/" later */}
          {/* <Route exact path="/">
            {" "}
            <ListingsMain />
            <AddListing />
          </Route> */}
          <Route exact path={["/", "/listings"]} component={ListingsMain} />
          <Route path="/listings/:id" component={EditListing} />
          <Route path="/add" component={AddListing} />
        </Switch>
      </div>
    );
  }
}

export default App;
