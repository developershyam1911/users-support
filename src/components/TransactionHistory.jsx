import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import init from "../firebase"; // Ensure Firebase is initialized properly
import "./TransactionHistory.css"; // Import your CSS file
import dayjs from "dayjs";
import UserNameFinder from "./UserNameFinder";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsCollection = collection(
          init.db,
          "transaction_history"
        );
        const transactionsSnapshot = await getDocs(transactionsCollection);
        const transactionsList = transactionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(transactionsList);
      } catch (error) {
        console.error("Error fetching transaction data: ", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="card">
            <div className="card-header">
              <h4 className="">Transaction History</h4>
            </div>
            <div className="card-body">
              <div className="transaction-history-container">
                <table className="transaction-history-table">
                  <thead>
                    <tr>
                      <th>S. No</th>
                      <th>User ID</th>
                      <th>Amount</th>
                      <th>Payment Type</th>
                      <th>Payment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((transaction, index) => (
                        <tr
                          key={transaction.id}
                          className={
                            transaction.paymentType == "debited"
                              ? "withdrawal"
                              : "deposit"
                          }
                        >
                          <td>{index + 1}</td>
                          <td>
                            {<UserNameFinder user_id={transaction.userId} />}
                          </td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.paymentType}</td>
                          <td>
                            {dayjs(transaction.date.seconds * 1000).format(
                              "ddd, MMM D, YYYY h:mm A"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No transactions found
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
  );
};

export default TransactionHistory;
