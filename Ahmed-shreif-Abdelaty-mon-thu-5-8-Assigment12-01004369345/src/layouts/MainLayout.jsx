import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return <div>
    <Navbar />
    <ScrollRestoration />
    <Outlet />
    <Footer/>
  </div>;
}
