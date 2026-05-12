import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

// Public Routes

import InstitutionSignup from "../views/InstitutionSignup/InstitutionSignup";
import AdopterSignup from "../views/AdopterSignup/AdopterSignup";
import Login from "../views/Login/Login";

//Private Routes

import HomeAdopter from "../views/HomeAdopter/HomeAdopter";
import HomeInstitution from "../views/HomeInstitution/HomeInstitution";

function IndexRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* // Public Routes */}
        <Route path="/institution-signup" element={<InstitutionSignup />} />
        <Route path="/adopter-signup" element={<AdopterSignup />} />
        <Route path="/login" element={<Login />} />

        {/* //Private Routes */}
        <Route path="/adopter" element={<HomeAdopter />} />
        <Route path="/institution" element={<HomeInstitution />} />
      </Routes>
    </Router>
  );
}

export default IndexRoutes;
