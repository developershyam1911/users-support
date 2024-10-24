import React, { useState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import init from "./firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
} from "firebase/firestore";
const Login = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email === "") {
      toast.error("Email field is required");
    } else if (password === "") {
      toast.error("Password field is required");
    } else {
      const auth = init.auth;
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        const document_id = user.user.uid;
        const res = await getDoc(doc(init.db, "admins", document_id));
        const response = res.data();
        if (response) {
          toast.success("successfully logged in");
          navigate("/dashboard/dash_board");
        } else {
          toast.error("User is not admin");
        }
      } catch (error) {
        toast.error(error.message);
        setData({
          email: "",
          password: "",
        });
      }
    }
  };
  return (
    <>
      <div
        className="main-wrapper"
        style={{ height: "100vh", backgroundColor: "#f6fbff" }}
      >
        <div className="  auth-wrapper d-flex no-block justify-content-center align-items-center  ">
          <div className="auth-box  border-top border-secondary">
            <div id="loginform">
              <div className="text-center pt-3 pb-3">
                <span className="db">
                  {/* <img
                    src="https://eventplanet.in/assets/home/logo_main.png"
                    style={{ height: "150px", width: "260px" }}
                  /> */}
                </span>
              </div>
              <form className="form-horizontal mt-3" onSubmit={loginHandler}>
                <div className="row pb-4">
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-danger text-white h-100"
                          id="basic-addon1"
                        >
                          <MdEmail />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Email Address"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        required
                        name="email"
                        onChange={formHandler}
                        value={data.email}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-warning text-white h-100"
                          id="basic-addon2"
                        >
                          <MdPassword />
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        required
                        name="password"
                        onChange={formHandler}
                        value={data.password}
                      />
                    </div>
                  </div>
                </div>
                <div className="row border-top border-secondary">
                  <div className="col-12">
                    <div className="form-group">
                      <div className="pt-3 d-grid">
                        <button
                          className="btn btn-block btn-lg btn-info"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
