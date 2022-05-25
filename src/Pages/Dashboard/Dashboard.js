import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useAdmin(user);
  return (
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content ">
        {/* <!-- Page content here --> */}
        <h2 className="text-3xl">DashBoard</h2>
        <Outlet></Outlet>
        <label
          for="my-drawer-2"
          class="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <NavLink className="my-2" to="/dashboard">
              My Order
            </NavLink>
          </li>
          <li>
            <NavLink className="my-2" to="/dashboard/review">
              Review
            </NavLink>
          </li>
          <li>
            <NavLink className="my-2" to="/dashboard/myprofile">
              My Profile
            </NavLink>
          </li>
          {admin && (
            <li>
              <NavLink className="my-2" to="/dashboard/users">
                All Users
              </NavLink>
            </li>
          )}
          {admin && (
            <li>
              <NavLink className="my-2" to="/dashboard/addproducts">
                Add Products
              </NavLink>
            </li>
          )}
          {admin && (
            <li>
              <NavLink className="my-2" to="/dashboard/manageproducts">
                Manage Products
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;