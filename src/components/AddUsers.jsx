import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  setDoc,
  doc,
  serverTimestamp,
  addDoc,
  collection,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import init from "../firebase"; // Assume firebase is initialized here
import "react-toastify/dist/ReactToastify.css";

const AddUsers = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    mobno: "",
    amount: "",
    role: "user",
    acviteUser: 0,
    status: "active", // default to active
  });

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const btnHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, mobno, status } = data;

    if (name !== "" && email !== "" && password !== "") {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          init.auth,
          email,
          password
        );
        const user = userCredential.user;
        const userDocRef = doc(init.db, "users", user.uid);
        await setDoc(userDocRef, {
          name: name,
          email: email,
          password: password,
          mobno: mobno || "N/A",
          amount: 0,
          acviteUser: 0,
          status,
          role: "user",
          createdAt: serverTimestamp(),
          auth_uid: user.uid,
        });
        setData({
          name: "",
          email: "",
          password: "",
          mobno: "",
          status: "active",
        });
        toast.success("User Registered Successfully.");
      } catch (err) {
        console.log("Error: " + err);
        toast.error("Failed to register user.");
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
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      className="form-control"
                      value={data.name}
                      onChange={formHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="form-control"
                      value={data.email}
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
