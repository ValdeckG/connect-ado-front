import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { ConnectRedirect } from "./ConnectRedirect";

// Public Routes

import InstitutionSignup from "../views/InstitutionSignup/InstitutionSignup";
import AdopterSignup from "../views/AdopterSignup/AdopterSignup";
import Login from "../views/Login/Login";

//Private Routes

import HomeAdopter from "../views/HomeAdopter/HomeAdopter";
import HomeInstitution from "../views/HomeInstitution/HomeInstitution";
import { PrivateRoute } from "./PrivateRoute";

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

        {/* //Private Routes 'Roles'*/}
        <Route element={<PrivateRoute allowedRoles={["ADOPTER"]} />}>
          <Route path="/adopter" element={<HomeAdopter />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["INSTITUTION"]} />}>
          <Route path="/institution" element={<HomeInstitution />} />
        </Route>
        {/* <Route element={<PrivateRoute allowedRoles={["CHILD"]} />}></Route> */}
      </Routes>
    </Router>
  );
}

export default IndexRoutes;
