import React, { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import "./BusinessAnalysis.css";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import init from "../firebase";
import { Link } from "react-router-dom";
import UsersList from "./UsersList";

const BusinessAnalysis = () => {
  const [merchant, setMerchant] = useState();
  const { user } = useUserAuth();
  const merchant_id = user.uid;
  const getSingleDocumentHandler = async () => {
    try {
      console.log(`fetching document data  for merchant Id ${merchant_id}`);
      const res = await getDoc(doc(init.db, "merchants", merchant_id));
      setMerchant(res.data());
    } catch (error) {
      console.log(`Error ${error} `);
    }
  };
  useEffect(() => {
    getSingleDocumentHandler();
  }, [merchant_id]);

  const [box, setBox] = useState([
    {
      title: "Add User",
      quatity: "70",
      url: "https://img.icons8.com/office/256/booking.png",
      href: "/dashboard/add-user",
    },
    {
      title: "All Users",
      quatity: "343",
      url: "https://cdn-icons-png.flaticon.com/512/5702/5702664.png",
      href: "/dashboard/users-list",
    },
    {
      title: "Transaction History",
      quatity: "343",
      url: "https://cdn.iconscout.com/icon/premium/png-256-thumb/impression-2634419-2187376.png",
      href: "/dashboard/transaction-history",
    },
  ]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Function to fetch users from Firestore
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(init.db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.log("Error fetching users: ", error);
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="card">
          <div className="card-body ">
            <div className="d-md-flex align-items-center">
              <h4 className="card-title">Welcome Admin</h4>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  {box.map((cur, index) => {
                    return (
                      <div className="col-md-3 col-6" key={index}>
                        <div className=" p-10  text-center total_card shadow-sm ">
                          <div className="data d-flex justify-content-around">
                            <img
                              src={cur.url}
                              className="dash_icon"
                              alt="Itgenix Softech Solutions Pvt. Ltd"
                            />
                            {/* <h4 className="">{cur.quatity}</h4> */}
                          </div>
                          <Link to={cur.href}>
                            <p className=" p-2">{cur.title}</p>{" "}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card shadow-sm">
                      <div className="card-header">
                        <div className="row">
                          <div className="col-md-6">
                            <center>
                              <h4 className="">Users List</h4>
                            </center>
                          </div>
                          <div className="col-md-6">
                            <div className="">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead className="bg-secondary  text-white">
                              <tr>
                                <th className="text-white">S.</th>
                                <th className="text-white">Name</th>
                                <th className="text-white">Mobile Number</th>
                                <th className="text-white">Amount</th>
                                <th className="text-white">Deposit</th>
                                <th className="text-white">Withdraw</th>
                                <th className="text-white">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                  <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.mobno || "N/A"}</td>
                                    <td>{user.amount}</td>
                                    <td>
                                      {
                                        <Link to={`/dashboard/user/${user.id}`}>
                                          <div className="btn-sm btn-success btn text-white">
                                            Deposit
                                          </div>
                                        </Link>
                                      }
                                    </td>
                                    <td>
                                      {
                                        <Link
                                          to={`/dashboard/user/${user.id}/withdraw`}
                                        >
                                          <div className="btn-sm btn-danger btn text-white">
                                            Withdraw
                                          </div>
                                        </Link>
                                      }
                                    </td>
                                    <td>{user.status}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="5" className="text-center">
                                    No users found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalysis;
