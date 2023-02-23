import React from "react";
import AddProductPage from "./pages/AddProductPage";
import ExplorePage from "./pages/ExplorePage";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import { Route, Routes } from "react-router-dom";
import MySchedulesPage from "./pages/MySchedulesPage";
import AddProduct from "./components/ProductsFunctions/AddProduct";
import AddSupplier from "./components/AddSupplier";
import SchedulePage from "./pages/SchedulePage";
import TopBar from "./components/Navbar/TopBar";

function App() {
  return (
    <>
      <div>
        {/*Website Header*/}
        <TopBar />
      </div>
      <div>
        {/*Website Body - render as per route*/}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/addproduct" element={<AddProductPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/schedules" element={<MySchedulesPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/addsupplier" element={<AddSupplier />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
