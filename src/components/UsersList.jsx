import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import init from "../firebase"; // Ensure Firebase is initialized properly
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deletebtnHandler = async (user_id, authId) => {
    const choice = window.confirm("Are you sure you want to delete this user?");
    if (choice) {
      try {
        const user = await init.auth.getUser(authId);

        // Delete the user from Firebase Authentication
        await deleteUser(user);

        // Now delete the user from Firestore
        await deleteDoc(doc(init.db, "users", user_id));

        // Refresh the user list
        fetchUsers();
        toast.success("User deleted successfully.");
      } catch (error) {
        console.error("Error deleting user: ", error);
        toast.error("Failed to delete user.");
      }
    }
  };

  const updateActiveUserHandler = async (user_id, currentActiveUser) => {
    const newActiveUser = prompt(
      "Enter the number of active users:",
      currentActiveUser
    );

    if (newActiveUser !== null) {
      try {
        const userDoc = doc(init.db, "users", user_id);
        await updateDoc(userDoc, { activeUser: Number(newActiveUser) });
        toast.success("Active user count updated successfully.");
        fetchUsers(); // Fetch updated data
      } catch (error) {
        console.log("Error updating active user count: ", error);
        toast.error("Failed to update active user count.");
      }
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
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="text-white">S. No</th>
                        <th className="text-white">Name</th>
                        <th className="text-white">Email</th>
                        <th className="text-white">Mobile Number</th>
                        <th className="text-white">Amount</th>
                        <th className="text-white">Deposit</th>
                        <th className="text-white">Withdraw</th>
                        <th className="text-white">Status</th>
                        <th className="text-white">Password</th>
                        <th className="text-white">Active Users</th>
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
                              <Link to={`/dashboard/user/${user.id}`}>
                                <div className="btn-sm btn-success btn text-white">
                                  Deposit
                                </div>
                              </Link>
                            </td>
                            <td>
                              <Link to={`/dashboard/user/${user.id}/withdraw`}>
                                <div className="btn-sm btn-danger btn text-white">
                                  Withdraw
                                </div>
                              </Link>
                            </td>
                            <td>{user.status}</td>
                            <td>{user.password}</td>
                            <td>
                              {user.activeUser || 0}
                              <button
                                className="btn btn-sm btn-primary ml-2"
                                onClick={() =>
                                  updateActiveUserHandler(
                                    user.id,
                                    user.activeUser || 0
                                  )
                                }
                              >
                                Update
                              </button>
                            </td>

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
                                  onClick={() =>
                                    deletebtnHandler(user.id, user.authId)
                                  }
                                />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="11" className="text-center">
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
