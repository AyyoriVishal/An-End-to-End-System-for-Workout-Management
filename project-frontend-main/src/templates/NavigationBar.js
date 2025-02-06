import React, { useEffect, useState } from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  useNavigate,
} from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Tab,
  Tabs,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import "../templates/css/NavigationBar.css";
import Dashboard from "./Dashboard";
import AddImages from "./admin-pages/AddImages";
import AddProducts from "./admin-pages/AddProducts";
import ViewOrders from "./admin-pages/ViewOrders";
import Gallery from "./Gallery";
import ProductStore from "./ProductStore";
import "bootstrap/dist/css/bootstrap.css";
import { IP } from "./constants";
import AllUsers from "./admin-pages/AllUsers";
import ProductInfo from "./ProductInfo";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import ShippingInfo from "./ShippingDetails";
import Orders from "./Orders";
import PaymentInfo from "./PaymentInfo";
import ViewOrderById from "./admin-pages/ViewOrderById";
import UserInfo from "./admin-pages/UserInfo";
import ProductEdit from "./admin-pages/ProductEdit";
import UserProfile from "./UserProfile";
import ContactUS from "./ContactUS";
import ViewGrievance from "./admin-pages/ViewGrievance";
import GrievanceDetails from "./admin-pages/GrievanceDetails";
import OrderDetails from "./OrderDetails";
import AllExercises from "./AllExercises";
import Sentiments from "./admin-pages/Sentiments";
import Churn from "./admin-pages/Churn";
import Exercises from "./Exercises";
import CartAbandon from "./admin-pages/CartAbandon";

export default function NavigationBar() {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const [userDetails, setUserDetails] = useState({});
  const details = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/get-details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    details();
  }, []);

  const logoutUser = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const logout = await response.json();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Router>
        <AppBar position="static">
          <Tabs aria-label="navigation tabs" className="nav-tabs">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            {userDetails?.role === "admin" ||
            userDetails?.data?.role === "superadmin" ||
            userDetails?.data?.role === "employee" ? (
              <></>
            ) : (
              <>
                <Link to="/gallery" className="nav-link">
                  Gallery
                </Link>
                {userDetails?.data?._id ? (<>
                <Link to="/store" className="nav-link">
                  Store
                </Link>
                </>) : (<></>)}
                {userDetails?.data?._id ? (
                  <a
                    href="https://maroon-hope-55.tiiny.site/"
                    className="nav-link"
                    target="_blank"
                  >
                    Exercise
                  </a>
                ) : (
                  <></>
                )}
              </>
            )}
            {!userDetails?.data?._id ? (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            ) : (
              <></>
            )}
            {(userDetails?.data?._id && userDetails?.data?.role === "admin") ||
            (userDetails?.data?._id &&
              userDetails?.data?.role === "superadmin") ? (
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            ) : (
              ""
            )}
            {userDetails?.role === "admin" ||
            userDetails?.data?.role === "superadmin" ||
            userDetails?.data?.role === "employee" ? (
              <></>
            ) : (
              <>
                {userDetails?.data?._id ? (
                  <>
                    <Link to="/wishlist">
                      <LoyaltyIcon
                        style={{
                          fontSize: "35px",
                          position: "absolute",
                          right: "150px",
                          top: "8px",
                          color: "#0bd2de",
                        }}
                      />
                    </Link>
                    <Link to="/cart">
                      <ShoppingCartIcon
                        style={{
                          fontSize: "32px",
                          position: "absolute",
                          right: "80px",
                          top: "10px",
                          color: "#0bd2de",
                        }}
                      />
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
            {userDetails?.data?._id ? (
              <IconButton
                style={{
                  position: "absolute",
                  // top: "10px",
                  right: "10px",
                  fontSize: "60px",
                  color: "#0bd2de",
                }}
                onClick={(e) => handleOpenMenu(e)}
              >
                <AccountCircleIcon style={{ fontSize: "30px" }} />
              </IconButton>
            ) : (
              <></>
            )}
            <Menu
              anchorEl={menuAnchorEl}
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              style={{opacity:"0.9"}}
            >
              {(userDetails?.data?._id && userDetails?.data?.role === "user") ||
              (userDetails?.data?._id &&
                userDetails?.data?.role === "employee") ? (
                <>
                  <MenuItem>
                    <Link to="/profile" id="links">Profile</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/orders" id="links">Orders</Link>
                  </MenuItem>
                </>
              ) : (
                <></>
              )}
              {(userDetails?.data?._id &&
                userDetails?.data?.role === "admin") ||
              (userDetails?.data?._id &&
                userDetails?.data?.role === "superadmin") ? (
                <MenuItem>
                  <Link to="/view-grievance" id="links">View Grievance</Link>
                </MenuItem>
              ) : (
                <MenuItem>
                  <Link to="/contact" id="links">Contact Us</Link>
                </MenuItem>
              )}

              <MenuItem>
                <Link to="/home" className="nav-link" onClick={logoutUser} id="links">
                  Logout <LogoutIcon />
                </Link>
              </MenuItem>
            </Menu>
          </Tabs>
        </AppBar>
        <Routes>
          <Route exact path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-images" element={<AddImages />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/view-orders" element={<ViewOrders />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/store" element={<ProductStore />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/store/product/:productId" element={<ProductInfo />} />
          <Route path="/profile/product/:productId" element={<ProductInfo />} />
          <Route
            path="/add-products/product/:productId"
            element={<ProductEdit />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shippingDetails" element={<ShippingInfo />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/paymentInfo" element={<PaymentInfo />} />
          <Route path="/view-order/:id" element={<ViewOrderById />} />
          <Route path="/userInfo/:id" element={<UserInfo />} />
          <Route path="/contact" element={<ContactUS />} />
          <Route path="/view-grievance" element={<ViewGrievance />} />
          <Route path="/grievance-details/:id" element={<GrievanceDetails />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          {/* <Route path="/exercises" element={<AllExercises />} /> */}
          <Route path="/get-sentiments" element={<Sentiments />} />
          <Route path="/get-churn" element={<Churn />} />
          <Route path="/get-cartAbandon" element={<CartAbandon />} />
          {/* <Route path="/exercises" element={<Exercises />} /> */}
        </Routes>
      </Router>
    </>
  );
}
