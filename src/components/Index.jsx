import React, { useState, useEffect, Suspense } from "react";

import {
  MdDashboard,
  MdMenu,
  MdPerson2,
  MdClose,
  MdPeople,
} from "react-icons/md";
import "./style.min.css";
import Sidenavbar from "./Sidenavbar";
import Dashboard from "./Dashboard";
import Form from "./Form";
import { Link, Outlet } from "react-router-dom";
const Index = (props) => {
  const [status, setStatus] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);
  // console.log(windowDimension)
  const [isOpen, setIsOpen] = useState(true);

  const detectSize = () => {
    setWindowDimension(window.innerWidth);
    if (windowDimension < 480) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  useEffect(() => {
    if (windowDimension < 480) {
      setIsOpen(false);
    }
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);
  return (
    <>
      <div
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin5"
        data-sidebartype={`${isOpen ? "full" : "mini-sidebar"}`}
        data-sidebar-position="absolute"
        data-header-position="absolute"
        data-boxed-layout="full"
        className={`${toggle ? "show-sidebar" : ""}`}
        // {`${sidebar?'full':'mini-sidebar'}`}
      >
        <header className="topbar" data-navbarbg="skin5">
          <nav className="navbar top-navbar navbar-expand-md navbar-dark">
            <div className="navbar-header" data-logobg="skin5">
              <Link className="navbar-brand" to="/dashboard">
                <span className="logo-text ms-2">
                  <img
                    src="https://eventplanet.in/assets/home/logo_main.png"
                    alt=""
                    className="light-logo text-danger"
                    style={{
                      height: "40px",
                      object: "content",
                      marginLeft: "70px",
                    }}
                  />
                </span>
              </Link>

              <a
                className="nav-toggler waves-effect waves-light d-block d-md-none"
                href="javascript:void(0)"
                onClick={(e) => setToggle(!toggle)}
              >
                {toggle ? (
                  <MdClose size={24} className="text-white" />
                ) : (
                  <MdMenu size={24} className="text-white" />
                )}
              </a>
            </div>

            <div
              className="navbar-collapse collapse"
              id="navbarSupportedContent"
              data-navbarbg="skin5"
            >
              <ul className="navbar-nav float-start me-auto">
                <li
                  className="nav-item d-none d-lg-block"
                  onClick={(e) => setSidebar(!sidebar)}
                >
                  {/* {sidebar?'true':'false'} */}
                  <a
                    className="nav-link sidebartoggler waves-effect waves-light"
                    href="javascript:void(0)"
                    data-sidebartype="mini-sidebar"
                  >
                    <MdMenu size={24} />
                  </a>
                </li>

                <li className="nav-item search-box">
                  <a
                    className="nav-link waves-effect waves-dark"
                    href="javascript:void(0)"
                  >
                    <i className="mdi mdi-magnify fs-4"></i>
                  </a>
                  <form className="app-search position-absolute">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search &amp; enter"
                    />
                    <a className="srh-btn">
                      <i className="mdi mdi-window-close"></i>
                    </a>
                  </form>
                </li>
              </ul>

              <ul className="navbar-nav float-end">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-bell font-24"></i>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle waves-effect waves-dark"
                    href="#"
                    id="2"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="font-24 mdi mdi-comment-processing"></i>
                  </a>
                  <ul
                    className="
                    dropdown-menu dropdown-menu-end
                    mailbox
                    animated
                    bounceInDown
                  "
                    aria-labelledby="2"
                  >
                    <ul className="list-style-none">
                      <li>
                        <div className="">
                          <a
                            href="javascript:void(0)"
                            className="link border-top"
                          >
                            <div className="d-flex no-block align-items-center p-10">
                              <span
                                className="
                                btn btn-success btn-circle
                                d-flex
                                align-items-center
                                justify-content-center
                              "
                              >
                                <i className="mdi mdi-calendar text-white fs-4"></i>
                              </span>
                              <div className="ms-2">
                                <h5 className="mb-0">Event today</h5>
                                <span className="mail-desc">
                                  Just a reminder that event
                                </span>
                              </div>
                            </div>
                          </a>

                          <a
                            href="javascript:void(0)"
                            className="link border-top"
                          >
                            <div className="d-flex no-block align-items-center p-10">
                              <span
                                className="
                                btn btn-info btn-circle
                                d-flex
                                align-items-center
                                justify-content-center
                              "
                              >
                                <i className="mdi mdi-settings fs-4"></i>
                              </span>
                              <div className="ms-2">
                                <h5 className="mb-0">Settings</h5>
                                <span className="mail-desc">
                                  You can customize this template
                                </span>
                              </div>
                            </div>
                          </a>

                          <a
                            href="javascript:void(0)"
                            className="link border-top"
                          >
                            <div className="d-flex no-block align-items-center p-10">
                              <span
                                className="
                                btn btn-primary btn-circle
                                d-flex
                                align-items-center
                                justify-content-center
                              "
                              >
                                <i className="mdi mdi-account fs-4"></i>
                              </span>
                              <div className="ms-2">
                                <h5 className="mb-0">Pavan kumar</h5>
                                <span className="mail-desc">
                                  Just see the my admin!
                                </span>
                              </div>
                            </div>
                          </a>

                          <a
                            href="javascript:void(0)"
                            className="link border-top"
                          >
                            <div className="d-flex no-block align-items-center p-10">
                              <span
                                className="
                                btn btn-danger btn-circle
                                d-flex
                                align-items-center
                                justify-content-center
                              "
                              >
                                <i className="mdi mdi-link fs-4"></i>
                              </span>
                              <div className="ms-2">
                                <h5 className="mb-0">Luanch Admin</h5>
                                <span className="mail-desc">
                                  Just see the my new admin!
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </li>
                    </ul>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="
                    nav-link
                    dropdown-toggle
                    text-muted
                    waves-effect waves-dark
                    pro-pic
                  "
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <MdPerson2 size={27} style={{ color: "white" }} />
                    {/* <img
                    src="#"
                    alt="user"
                    className="rounded-circle"
                    width="31"
                  /> */}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end user-dd animated"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="javascript:void(0)">
                      <i className="mdi mdi-account me-1 ms-1"></i> My Profile
                    </a>
                    <a className="dropdown-item" href="javascript:void(0)">
                      <i className="mdi mdi-wallet me-1 ms-1"></i> My Balance
                    </a>
                    <a className="dropdown-item" href="javascript:void(0)">
                      <i className="mdi mdi-email me-1 ms-1"></i> Inbox
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="javascript:void(0)">
                      <i className="mdi mdi-settings me-1 ms-1"></i> Account
                      Setting
                    </a>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/dashboard/logout">
                      <i className="fa fa-power-off me-1 ms-1"></i> Logout
                    </Link>
                    <div className="dropdown-divider"></div>
                    <div className="ps-4 p-10">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-sm btn-success btn-rounded text-white"
                      >
                        View Profile
                      </a>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <Sidenavbar />
        {/* <Dashboard /> */}
        {/* <Form /> */}
        <Outlet />
        <footer className="footer text-center">
          All Rights Reserved by Itgenix Softech Solutions Pvt. Ltd. Designed
          and Developed by
          <a href="#"> Itgenix Softech Solutions Pvt. Ltd</a>.
        </footer>
      </div>
    </>
  );
};

export default Index;
