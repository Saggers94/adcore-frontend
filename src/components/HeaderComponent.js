import React from "react";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg navbar-dark static-top">
        <div class="container">
          <Link
            class="nav-link"
            style={{ color: "6DA7FA", fontSize: "24px", paddingLeft: "0" }}
            to="/"
          >
            <b>ADCORE (Exam)</b>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <Link class="nav-link" to="/data">
                  Node-Collection
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/create">
                  Create-Node
                </Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default HeaderComponent;
