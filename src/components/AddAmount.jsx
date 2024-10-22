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

const AddAmount = () => {
  const { user_id } = useParams(); // Get user ID from URL
  const navigate = useNavigate(); // For navigation
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchUserAmount = async () => {
      try {
        const userDoc = doc(init.db, "users", user_id);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setAmount(userSnapshot.data().amount || ""); // Set current amount
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

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDoc = doc(init.db, "users", user_id);
      const userSnapshot = await getDoc(userDoc);
      const currentAmount = userSnapshot.data().amount || 0;

      // Update user's amount
      const newAmount = parseFloat(currentAmount) + parseFloat(amount);
      await updateDoc(userDoc, { amount: newAmount }); // Update amount in Firestore

      // Create a transaction history record
      const transactionHistoryRef = collection(init.db, "transaction_history");
      await addDoc(transactionHistoryRef, {
        userId: user_id,
        amount: parseFloat(amount),
        paymentType: "credited",
        date: serverTimestamp(),
      });

      toast.success("Amount updated successfully.");
      navigate("/dashboard/users-list"); // Navigate back to users list after update
    } catch (error) {
      console.log("Error updating amount or recording transaction: ", error);
      toast.error("Failed to update amount or record transaction.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <div className="col-md-6 offset-md-3">
                <h2 className="mb-4">Add Amount</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Current Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      value={amount}
                      onChange={handleAmountChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Deposit"
                      className="btn btn-primary"
                    />
                  </div>
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAmount;
