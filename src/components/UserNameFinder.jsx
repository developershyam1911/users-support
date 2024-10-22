import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import init from "../firebase"; // Ensure Firebase is initialized properly
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserNameFinder = ({ user_id }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserAmount = async () => {
      try {
        const userDoc = doc(init.db, "users", user_id);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUser(userSnapshot.data().name || ""); // Set current amount
        } else {
          toast.error("User not found.");
        }
      } catch (error) {
        console.log("Error fetching user data: ", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUserAmount();
  }, [user_id]);
  return <div>{user}</div>;
};

export default UserNameFinder;
