import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import BlogCategory from "./components/BlogCategory";
import Index from "./components/Index";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import BlogList from "./components/BlogList";
import BlogCategoryList from "./components/BlogCategoryList";
import Blog from "./components/Blog";
import EditBlogcat from "./components/EditBlogCat";
import EditBlog from "./components/EditBlog";
import BusinessAnalysis from "./components/BusinessAnalysis";
import TextEditor from "./components/TextEditor";
import AddUsers from "./components/AddUsers";
import UsersList from "./components/UsersList";
import AddAmount from "./components/AddAmount";
import WithdrawAmount from "./components/WithdrawAmount";
import TransactionHistory from "./components/TransactionHistory";

const App = () => {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        >
          {/* <Route path="blog-category" element={<BlogCategory />} />
          <Route path="blog-category-list" element={<BlogCategoryList />} />
          <Route path="blog-category-edit/:blog_id" element={<EditBlogcat />} />
          <Route path="edit-blog/:blog_id" element={<EditBlog />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog-list" element={<BlogList />} /> */}
          <Route path="dash_board" element={<BusinessAnalysis />} />
          <Route path="add-user" element={<AddUsers />} />
          <Route path="transaction-history" element={<TransactionHistory />} />
          <Route path="user/:user_id" element={<AddAmount />} />
          <Route path="users-list" element={<UsersList />} />
          <Route path="user/:user_id/withdraw" element={<WithdrawAmount />} />
        </Route>
        <Route path="ckeditor" element={<TextEditor />} />
      </Routes>
    </UserAuthContextProvider>
  );
};

export default App;
