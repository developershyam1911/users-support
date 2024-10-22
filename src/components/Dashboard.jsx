import React, { Link, useState, useEffect } from "react";
import Form from "./Form";
import "./style.min.css";
const Dashboard = () => {
  return (
    <>
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h4 className="page-title">Dashboard</h4>
              <div className="ms-auto text-end">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Library
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            {/* <!-- Column --> */}
            <div className="col-md-6 col-lg-2 col-xlg-3">
              <div className="card card-hover">
                <div className="box bg-cyan text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-view-dashboard"></i>
                  </h1>
                  <h6 className="text-white">Dashboard</h6>
                </div>
              </div>
            </div>
            {/* <!-- Column --> */}
            <div className="col-md-6 col-lg-4 col-xlg-3">
              <div className="card card-hover">
                <div className="box bg-success text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-chart-areaspline"></i>
                  </h1>
                  <h6 className="text-white">Charts</h6>
                </div>
              </div>
            </div>
            {/* <!-- Column --> */}
            <div className="col-md-6 col-lg-2 col-xlg-3">
              <div className="card card-hover">
                <div className="box bg-warning text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-collage"></i>
                  </h1>
                  <h6 className="text-white">Widgets</h6>
                </div>
              </div>
            </div>
            {/* <!-- Column --> */}
            <div className="col-md-6 col-lg-2 col-xlg-3">
              <div className="card card-hover">
                <div className="box bg-danger text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-border-outside"></i>
                  </h1>
                  <h6 className="text-white">Tables</h6>
                </div>
              </div>
            </div>
            {/* <!-- Column --> */}
            <div className="col-md-6 col-lg-2 col-xlg-3">
              <div className="card card-hover">
                <div className="box bg-info text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-arrow-all"></i>
                  </h1>
                  <h6 className="text-white">Full Width</h6>
                </div>
              </div>
            </div>
            {/* <!-- Column --> */}
            {/* <!-- Column --> */}
            <div className="col-md-6 col-lg-4 col-xlg-3">
              <div className="card card-hover">
                <div className="box bg-danger text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-receipt"></i>
                  </h1>
                  <h6 className="text-white">Forms</h6>
                </div>
              </div>
            </div>
            {/* <!-- Column --> */}
            <div className="col-md-6 col-lg-2 col-xlg-3">
              <div className="card card-hover">
                <div className="box bg-info text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-relative-scale"></i>
                  </h1>
                  <h6 className="text-white">Buttons</h6>
                </div>
              </div>
            </div>
            {/* <!-- Column --> */}
            <div className="col-md-6 col-lg-2 col-xlg-3">
              <div className="card card-hover">
                <div className="box bg-cyan text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-pencil"></i>
                  </h1>
                  <h6 className="text-white">Elements</h6>
                </div>
              </div>
            </div>
            {/* <!-- Column --> */}
            <div className="col-md-6 col-lg-2 col-xlg-3">
              <div className="card card-hover">
                <div className="box bg-success text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-calendar-check"></i>
                  </h1>
                  <h6 className="text-white">Calnedar</h6>
                </div>
              </div>
            </div>
            {/* <!-- Column --> */}
            <div className="col-md-6 col-lg-2 col-xlg-3">
              <div className="card card-hover">
                <div className="box bg-warning text-center">
                  <h1 className="font-light text-white">
                    <i className="mdi mdi-alert"></i>
                  </h1>
                  <h6 className="text-white">Errors</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-md-flex align-items-center">
                    <div>
                      <h4 className="card-title">Site Analysis</h4>
                      <h5 className="card-subtitle">
                        Overview of Latest Month
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    {/* <!-- column --> */}
                    <div className="col-lg-9">
                      <div className="flot-chart">
                        <div
                          className="flot-chart-content"
                          id="flot-line-chart"
                        ></div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="row">
                        <div className="col-6">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-account fs-3 mb-1 font-16"></i>
                            <h5 className="mb-0 mt-1">2540</h5>
                            <small className="font-light">Total Users</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-plus fs-3 font-16"></i>
                            <h5 className="mb-0 mt-1">120</h5>
                            <small className="font-light">New Users</small>
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-cart fs-3 mb-1 font-16"></i>
                            <h5 className="mb-0 mt-1">656</h5>
                            <small className="font-light">Total Shop</small>
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-tag fs-3 mb-1 font-16"></i>
                            <h5 className="mb-0 mt-1">9540</h5>
                            <small className="font-light">Total Orders</small>
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-table fs-3 mb-1 font-16"></i>
                            <h5 className="mb-0 mt-1">100</h5>
                            <small className="font-light">Pending Orders</small>
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-web fs-3 mb-1 font-16"></i>
                            <h5 className="mb-0 mt-1">8540</h5>
                            <small className="font-light">Online Orders</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- column --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer text-center">
          All Rights Reserved by Itgenix Softech Solutions Pvt. Ltd. Designed
          and Developed by
          <a href="#">Itgenix Softech Solutions Pvt. Ltd</a>.
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
