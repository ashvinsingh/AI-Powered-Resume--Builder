import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    // ✅ Clear token from localStorage
    localStorage.removeItem("token");

    // ✅ Update Redux state
    dispatch(logout());

    // ✅ Redirect after logout
    navigate("/");
  };

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
        </Link>

        {/* Right side */}
        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <p className="max-sm:hidden">Hi, {user?.name}</p>
            <button
              onClick={logoutUser}
              className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <Link
              to="/app?state=login"
              className="border border-gray-300 px-6 py-1.5 rounded-full hover:bg-slate-50 transition-all"
            >
              Login
            </Link>
            <Link
              to="/app?state=register"
              className="bg-green-500 text-white px-6 py-1.5 rounded-full hover:bg-green-600 active:scale-95 transition-all"
            >
              Sign up
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
