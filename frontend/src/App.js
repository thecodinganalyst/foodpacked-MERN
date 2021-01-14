import "./App.css";
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ListingsAndUpload from "./components/ListingsAndUpload";
import ListingOnly from "./components/ListingOnly";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* change to a landing page for path "/" later */}
          <Route exact path={["/", "listings"]} component={ListingsAndUpload} />
          <Route path="/listings/:id" component={ListingOnly} />
        </Switch>
      </div>

      //<div className="App"></div>;
    );
  }
}

export default App;
