import React from "react";
import Menu from "../Menu/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import Aforizm from "../Aforizmlar/Aforizmlar";
import Carousel from "../Carousel/Carousel";
import Staff from "../Staffs/staffIndex";
import ProgLang from "../proglang/proglang";
import Video from "../Videos/Videos";
import Login from "../Login/Login";
import About from "../about/AboutIndex";
import Kurslar from "../courses/courses";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Menu />
      <Router>
        <Switch>
          <Route path="/aforizmlar" component={Aforizm} />
          <Route path="/carousel" component={Carousel} />
          <Route path="/staff" component={Staff} />
          <Route path="/proglang" component={ProgLang} />
          <Route path="/videos" component={Video} />
          <Route exact path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/kurslar" component={Kurslar} />
        </Switch>
      </Router>
      <div
        style={{
          marginLeft: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "300px",
        }}
      >
        <p
          style={{
            fontSize: "40px",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          CodemyUz Web sayti Admin Paneli
        </p>
      </div>
    </div>
  );
};

export default Home;
