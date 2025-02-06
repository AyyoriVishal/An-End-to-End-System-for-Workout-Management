import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../templates/css/OrderDetail.css";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Typography,
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { IP } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ViewOrderById() {
  const location = useLocation();
  const order = location?.state;
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [delboyData, setDelboyData] = useState({});
  const [orderById, setOrderById] = useState({});

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const delboys = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/${order?._id}/getDelBoys`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      setDelboyData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getOrderById = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/${order?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      setOrderById(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    delboys();
    getOrderById();
  }, []);

  const handleCompleteOrder = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/${order?._id}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const completeOrder = await response.json();
      toast.success(completeOrder?.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAssignOrder = async (empId) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/${order?._id}/assign/${empId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const assignOrder = await response.json();
      toast.success(assignOrder?.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div id="cont">
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
        <div id="card-body">
          <Card id="card">
            <Typography variant="h4" color="#0083f9" padding="10px">
              {order?.user?.firstName} {order?.user?.lastName}
            </Typography>

            <Typography color="#1e89e7" paddingLeft="10px">
              Order No: {order?.shippingInfo?.phoneNo}
            </Typography>
            <div id="items">
              <Typography variant="body1">Items Ordered :</Typography>

              {order?.orderItems?.map((value, index) => {
                return (
                  <>
                    <Typography variant="body1">
                      {value?.name}
                      {" | "}
                      {"Price : "}
                      {value?.netprice}
                    </Typography>
                  </>
                );
              })}
            </div>
            <div id="psp">
              <Typography variant="body1">
                <br></br>
                Final Price (including gst) : <CurrencyRupeeIcon />
                {order?.subtotalPrice}
              </Typography>

              <Typography variant="body1">
                Order Status : {orderById?.data?.orderStatus}
              </Typography>
              <Typography variant="body1">
                Payment method : {order?.paymentMethod}
              </Typography>
            </div>

            <br></br>
            <Divider color="#333" />
            <div id="shipinfo">
              <Typography>Shipping Info :</Typography>
              <Typography>
                Address : {order?.shippingInfo?.address}
                <br />
                City : {order?.shippingInfo?.city}
                <br />
                Pincode : {order?.shippingInfo?.pincode}
                <br />
                State : {order?.shippingInfo?.state}
                <br />
                Country : {order?.shippingInfo?.country}
              </Typography>
            </div>
          </Card>
        </div>
        {order?.orderStatus === "Placed" && (
          <>
            <button id="assigndel" onClick={(e) => handleOpenMenu(e)}>
              Assign Delivery Person
            </button>
            <Menu
              anchorEl={menuAnchorEl}
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
            >
              {delboyData?.data?.map((value, index) => {
                return (
                  <MenuItem onClick={() => handleAssignOrder(value?._id)}>
                    {value?.userName}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        )}
        {order?.orderStatus === "Approved" && (
          <>
            <button onClick={() => handleCompleteOrder()} id="assigndel">
              Order Completed
            </button>
          </>
        )}
      </>
    </div>
  );
}
