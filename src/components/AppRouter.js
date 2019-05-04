import React, { Component } from "react";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";
import Header from "./Header";

import FireBaseAdd from "./FireBaseAdd";
import FireBaseList from "./FireBaseList";
import BookPage from "./BookPage";

class AppRouter extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/add" component={FireBaseAdd} />
              <Route path="/book/:id" component={BookPage} />

              <Route path="/list" exact component={FireBaseList} />
              <Route component={PageNotFound} />
            </Switch>
          </div>

          {/* <HomePage />
        <BookPage />
        <AboutPage /> */}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
