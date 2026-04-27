
import Header from "./Header";
import AddContent from "../ui/AddContent";
import Sidebar from "../ui/Sidebar";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Alert from "../ui/Alert";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    else{
      navigate("/home/dashboard")
    }
  }, []);
  return (
    <div className="bg-background relative flex flex-col ">
      <Sidebar />
      <Header />
      <Outlet/>
      <AddContent />
      <Alert />
      <ToastContainer/>
    </div>
  );
};

export default HomePage;
