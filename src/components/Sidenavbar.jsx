import React, { useState, useEffect } from "react";
import {
  MdDashboard,
  MdPeople,
  MdAccountBox,
  MdOutlineBusinessCenter,
  MdOutlineLibraryAdd,
  MdOutlineViewList,
} from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./style.min.css";
import SidebarMenu from "./SidebarMenu";
const Sidenavbar = () => {
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(true);
  const detectSize = () => {
    setWindowDimension(window.innerWidth);
    if (windowDimension < 768) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  useEffect(() => {
    if (windowDimension < 768) {
      setIsOpen(false);
    }
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  const [item, setItem] = useState([
    // {
    //     title: "Blog Management",
    //     icon: <MdPeople className='my__nav__icon' />,
    //     dropDown: [
    //         {
    //             title: "Add Category",
    //             icon: < MdAccountBox className='my__nav__icon' />,
    //             href: '/dashboard/blog-category'
    //         },
    //         {
    //             title: "Blog Category List",
    //             icon: <MdOutlineLibraryAdd className='my__nav__icon' />,
    //             href: '/dashboard/blog-category-list'
    //         },
    //         {
    //             title: "Add Blog",
    //             icon: <MdOutlineViewList className='my__nav__icon' />,
    //             href: '/dashboard/blog'
    //         },
    //         {
    //             title: "Blog List",
    //             icon: <MdOutlineViewList className='my__nav__icon' />,
    //             href: '/dashboard/blog-list'
    //         },
    //     ]
    // },
  ]);
  return (
    <aside className="left-sidebar" data-sidebarbg="skin5">
      {/* <!-- Sidebar scroll--> */}
      <div className="scroll-sidebar">
        {/* <!-- Sidebar navigation--> */}
        <nav className="sidebar-nav">
          <ul id="sidebarnav" className="pt-4">
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="dash_board"
                aria-expanded="false"
              >
                <MdDashboard
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="add-user"
                aria-expanded="false"
              >
                <MdDashboard
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Add User</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="users-list"
                aria-expanded="false"
              >
                <MdDashboard
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">All Users</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="transaction-history"
                aria-expanded="false"
              >
                <MdDashboard
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Transaction History</span>
              </Link>
            </li>
            {/* {item.map((item, index) => {
              return (
                <SidebarMenu
                  title={item.title}
                  icon={item.icon}
                  dropDown={item.dropDown}
                  key={index}
                />
              );
            })} */}

            {/* <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link "
                to="/dashboard/logout"
                aria-expanded="false"
              >
                <BiLogOutCircle
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Logout</span>
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidenavbar;
