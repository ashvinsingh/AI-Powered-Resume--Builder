import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Login from "./pages/Login";
import Preview from "./pages/Preview";
import { useDispatch } from "react-redux";
import api from "./configs/api";
import { login, setLoading } from "./app/features/authSlice";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  // ✅ Fetch user data if token is stored
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    dispatch(setLoading(true)); // start loading before fetch
    try {
      if (token) {
        // ✅ FIXED endpoint: should be `/api/users/data`
        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: token },
        });

        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
      }
    } catch (error) {
      console.log("Error fetching user data:", error?.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false)); // stop loading either way
    }
  };

  // ✅ Run only once on mount
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {/* Toast Notification */}
      <Toaster position="top-center" />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* Protected layout routes */}
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        {/* Public preview route */}
        <Route path="view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
