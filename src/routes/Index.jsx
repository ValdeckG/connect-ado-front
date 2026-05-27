import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { ConnectRedirect } from "./ConnectRedirect";
import { PrivateRoute } from "./PrivateRoute";

// Public Routes

import InstitutionSignup from "../views/InstitutionSignup/InstitutionSignup";
import AdopterSignup from "../views/AdopterSignup/AdopterSignup";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";

//Private Routes

import HomeAdopter from "../views/HomeAdopter/HomeAdopter";
import HomeInstitution from "../views/HomeInstitution/HomeInstitution";
import HomeChild from "../views/HomeChild/HomeChild";
import { Footer } from "../components/Footer/Footer";
import ChildAdopterList from "../views/ChildAdopterList/ChildAdopterList";
import { FAQ } from "../views/FAQ/FAQ";

function IndexRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* // Public Routes */}
        <Route
          path="/institution-signup"
          element={
            <ConnectRedirect>
              <InstitutionSignup />
            </ConnectRedirect>
          }
        />
        <Route
          path="/adopter-signup"
          element={
            <ConnectRedirect>
              <AdopterSignup />
            </ConnectRedirect>
          }
        />
        <Route
          path="/login"
          element={
            <ConnectRedirect>
              <Login />
            </ConnectRedirect>
          }
        />
        <Route
          path="/"
          element={
            <ConnectRedirect>
              <Home />
            </ConnectRedirect>
          }
        />
        <Route path="/faq" element={<FAQ />} />

        {/* //Private Routes 'Roles'*/}
        <Route element={<PrivateRoute allowedRoles={["ADOPTER"]} />}>
          <Route path="/adopter" element={<HomeAdopter />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["INSTITUTION"]} />}>
          <Route path="/institution" element={<HomeInstitution />} />
          <Route path="/child-adopter-list" element={<ChildAdopterList />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["CHILD"]} />}>
          <Route path="/child" element={<HomeChild />} />
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default IndexRoutes;
