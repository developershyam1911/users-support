import React, { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import init from "../firebase"; // Ensure Firebase is initialized properly
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAmount from "./AddAmount";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  useEffect(() => {
    // Function to fetch users from Firestore

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const deletebtnHandler = async (user_id) => {
    const choice = window.confirm("Are you sure want to delete?");
    if (choice) {
      try {
        await deleteDoc(doc(init.db, "users", user_id));
        fetchUsers();
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-header">
                <center>
                  {" "}
                  <h2 className="mb-2">Users List</h2>
                </center>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="bg-secondary  text-white">
                      <tr>
                        <th className="text-white">S. No</th>
                        <th className="text-white">Name</th>
                        <th className="text-white">Email</th>
                        <th className="text-white">Mobile Number</th>
                        <th className="text-white">Amount</th>
                        <th className="text-white">Deposit</th>
                        <th className="text-white">Withdraw</th>
                        <th className="text-white">Status</th>
                        <th className="text-white">CreatedAt</th>
                        <th className="text-white">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
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
                            <td>
                              {dayjs(user.createdAt.seconds * 1000).format(
                                "MMM D, YYYY h:mm A"
                              )}
                            </td>
                            <td>
                              <button className="btn">
                                <MdDelete
                                  size={24}
                                  style={{ color: "red" }}
                                  onClick={() => deletebtnHandler(user.id)}
                                />
                              </button>
                            </td>
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
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
