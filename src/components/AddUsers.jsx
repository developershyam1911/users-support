import React, { useState } from "react";
import {
  setDoc,
  doc,
  getDocs,
  query,
  where,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import init from "../firebase"; // Assume Firebase is initialized here
import "react-toastify/dist/ReactToastify.css";

const AddUsers = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    mobno: "",
    amount: 0,
    acviteUser: 0,
    status: "active",
    role: "user",
  });

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const btnHandler = async (e) => {
    e.preventDefault();
    const { username, password, mobno, status } = data;

    if (username !== "" && password !== "") {
      try {
        // Check if username already exists in the database
        const usersRef = collection(init.db, "users");
        const usernameQuery = query(
          usersRef,
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(usernameQuery);

        if (!querySnapshot.empty) {
          toast.error(
            "Username already exists. Please choose another username."
          );
          return;
        }

        // If username does not exist, create a new user
        const authUid = crypto.randomUUID(); // Generating a unique ID for auth_uid
        const userDocRef = doc(init.db, "users", authUid);
        await setDoc(userDocRef, {
          username,
          password,
          mobno: mobno || "N/A",
          amount: 0,
          acviteUser: 0,
          status,
          role: "user",
          createdAt: serverTimestamp(),
          auth_uid: authUid,
        });

        setData({
          username: "",
          password: "",
          mobno: "",
          status: "active",
        });
        toast.success("User data saved successfully.");
      } catch (err) {
        console.log("Error: " + err);
        toast.error("Failed to save user data.");
      }
    } else {
      toast.error("Please fill all mandatory fields.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form method="post" onSubmit={btnHandler}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Username =  like abc123"
                      className="form-control"
                      value={data.username}
                      onChange={formHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      className="form-control"
                      value={data.password}
                      onChange={formHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number (Optional)</label>
                    <input
                      type="text"
                      name="mobno"
                      placeholder="Enter Mobile Number"
                      className="form-control"
                      value={data.mobno}
                      onChange={formHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      className="form-control"
                      value={data.status}
                      onChange={formHandler}
                    >
                      <option value="active">Active</option>
                      <option value="deactive">Deactive</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Register User"
                      className="btn btn-primary"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddUsers;
