import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Login from "./Login";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  // if no user (not logged in)
  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
