import React, { useEffect, useState } from "react";
import "../templates/css/NavigationBar.css";
import "../templates/css/Common.css";
import { IP } from "./constants";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function HomePage() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [allNotifications, setAllNotifications] = useState({});
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [top5Recommendation, setTop5Recommendation] = useState({});

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

  const notifications = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/notifications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      const array = data?.data;
      setAllNotifications([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSeeNotification = async (notifId) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/notifications/${notifId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const viewNotifs = await response.json();
      toast.success(viewNotifs?.message);
    } catch (error) {
      console.error("Error:", error);
    }
    notifications();
  };

  const handleDeleteNotif = async (notifId) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/notifications/${notifId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const delNotifs = await response.json();
      toast.success(delNotifs?.message);
    } catch (error) {
      console.error("Error:", error);
    }
    notifications();
  };
  const handleOpenNotifications = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };
  useEffect(() => {
    details();
  }, []);
  useEffect(() => {
    if (userDetails?.data?._id) {
      notifications();
    }
  }, [userDetails?.data]);
  const top5Purchase = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/top5Purchase`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setTop5Recommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    top5Purchase();
  }, []);

  const openProductInfo = (productId) => {
    navigate(`/store/product/${productId}`, {
      state: productId,
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <div
        class="cont"
        style={{ background: "#1C2833", color: "white", height: "1300px" }}
      >
        <div style={{ position: "relative" }}>
          <IconButton
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "60px",
              color: "#0bd2de",
            }}
            onClick={(e) => handleOpenNotifications(e)}
          >
            <NotificationsIcon style={{ fontSize: "35px" }} />
          </IconButton>
          {allNotifications?.[0] && (
            <>
              <Menu
                anchorEl={menuAnchorEl}
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                style={{opacity:"0.8"}}
              >
                {allNotifications?.map((value, index) => {
                  return (
                    <MenuItem
                      key={value?._id}
                      onClick={() => handleSeeNotification(value?._id)}
                      style={{backgroundColor: value?.status==='read' ? "#B0AFAF" : "#0bd2de",color:"white"}}
                    >
                      <IconButton onClick={()=>handleDeleteNotif(value?._id)}>
                        <DeleteIcon />
                      </IconButton>
                      {value?.message}
                    </MenuItem>
                  );
                })}
              </Menu>
              <p style={{ position: "absolute", top: "10px", right: "14px" }}>
                {
                  allNotifications?.filter(
                    (notification) => notification.status === "unread"
                  ).length // Filter unread notifications
                }
              </p>
            </>
          )}
          <div
            class="wlcm-msg"
            style={{ border: "1px solid #1C2833", paddingLeft: "20px" }}
          >
            <h1
              style={{ marginTop: "40px", fontSize: "60px", color: "#0bd2de" }}
            >
              Welcome to the Workout Hub
            </h1>
            <p>Get In, Get Fit, Get On with Life!</p>
          </div>
          {/* <!--slide show--> */}
          <>
            {top5Recommendation?.data && (
              <>
                <h3>Top 5 products in our store</h3>
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {top5Recommendation?.data?.map((value, index) => {
                    return (
                      <>
                        <div
                          className="card m-3"
                          style={{
                            width: "15rem",
                            height: "400px",
                            border: "2px solid lightblue",
                          }}
                        >
                          <img
                            className="img-fluid"
                            src={value.image}
                            alt="Card image cap"
                            style={{
                              objectFit: "cover",
                              width: "300px",
                              height: "200px",
                            }}
                            onClick={() => openProductInfo(value?._id)}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{value.name}</h5>
                            <h6
                              className="card-title"
                              value={value.description}
                            >
                              {truncateText(value.description, 70)}
                            </h6>
                            <p className="card-text">{value.price}</p>
                            <p className="card-text">{value.avgRating}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </>
          <div class="stage">
            <div class="container">
              <div class="ring">
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
              </div>
            </div>
            {/* slideshow end */}
          </div>

          {/* manasi pls decorate */}
        </div>
      </div>
    </>
  );
}
