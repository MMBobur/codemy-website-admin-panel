import React from "react";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Menu from "./Components/Menu/Menu";
import Aforizm from "./Components/Aforizmlar/Aforizmlar";
import Carousel from "./Components/Carousel/Carousel";
import Staff from "./Components/Staffs/staffIndex";
import ProgLang from "./Components/proglang/proglang";
import Video from "./Components/Videos/Videos";
import About from "./Components/about/AboutIndex";
import Kurslar from "./Components/courses/courses";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import GuardedRoute from "./Components/util/GuardedRoute";

import { initAuth } from "./Components/store/actions";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  dispatch(initAuth());

  const loggedIn = useSelector((state) => state.loggedIn);

  return (
    <BrowserRouter>
      <div>
        <Menu auth={loggedIn} />
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <GuardedRoute path="/home" exact auth={loggedIn} component={Home} />
          <GuardedRoute
            path="/aforizmlar"
            exact
            auth={loggedIn}
            component={Aforizm}
          />
          <GuardedRoute path="/staff" exact auth={loggedIn} component={Staff} />
          <GuardedRoute
            path="/carousel"
            exact
            auth={loggedIn}
            component={Carousel}
          />
          <GuardedRoute
            path="/progLang"
            exact
            auth={loggedIn}
            component={ProgLang}
          />
          <GuardedRoute
            path="/videos"
            exact
            auth={loggedIn}
            component={Video}
          />
          <GuardedRoute
            path="/kurslar"
            exact
            auth={loggedIn}
            component={Kurslar}
          />
          <GuardedRoute path="/about" exact auth={loggedIn} component={About} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
