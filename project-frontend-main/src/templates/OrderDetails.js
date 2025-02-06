import React, { useState } from "react";
import { useLocation } from "react-router";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { IP } from "./constants";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import "../templates/css/Orderdet.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Typography,
  Dialog,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

export default function OrderDetails() {
  const location = useLocation();
  const details = location?.state?.details;
  const role = location?.state?.role;
  const [enterOTP, setEnterOTP] = useState();
  const handleSendOTP = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/orders/${details?._id}/sendOTP`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const sendOTP = await response.json();
      // toast.success(deleteReview?.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVerifyOTP = async () => {
    const formData = {
      otp: enterOTP,
    };
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/orders/${details?._id}/verifyOTP`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const verifyOTP = await response.json();
      toast.success(verifyOTP?.message);
    } catch (error) {
      console.error("Error:", error);
    }
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
      <div class="ocont">
        <div id="card-body">
          <Card id="card">
            <div class="pdetail">
              {role === "employee" && (
                <>
                  <Typography variant="h4" color="#0083f9" padding="10px">
                    Name : {details?.user?.firstName} {details?.user?.lastName}
                  </Typography>
                  <Typography color="#1e89e7" paddingLeft="10px">
                    {details?.shippingInfo?.phoneNo}
                  </Typography>
                </>
              )}{" "}
            </div>
            <div id="items">
              <Typography>Order Id : {details?._id}</Typography>
              <Typography variant="body1">Items Ordered :</Typography>
              {details?.orderItems?.map((value, index) => {
                return (
                  <>
                    <div class="prods">
                      <Typography variant="body2">
                        {value?.name}
                        {" | "}
                        {"Price : "}
                        {value?.netprice}
                      </Typography>
                    </div>
                  </>
                );
              })}
            </div>
            <div id="psp">
              <Typography variant="body1">
                <br></br>
                Final Price (including gst) : <CurrencyRupeeIcon />
                {details?.subtotalPrice}
              </Typography>
              <Typography variant="body1">
                Order Status : {details?.orderStatus}
              </Typography>
              <Typography variant="body1">
                Payment method : {details?.paymentMethod}{" "}
              </Typography>
            </div>
            <br></br>
            <Divider color="#333" />
            <div id="shipinfo">
              <Typography variant="body2">Shipping Info :</Typography>
              <Typography variant="body2">
                Address : {details?.shippingInfo?.address}
                <br />
                City : {details?.shippingInfo?.city}
                <br />
                Pincode : {details?.shippingInfo?.pincode}
                <br />
                State : {details?.shippingInfo?.state}
                <br />
                country : {details?.shippingInfo?.country}
              </Typography>
            </div>
          </Card>
        </div>
        {/* card body*/}
        {role === "employee" && (
          <>
            <div className="mainod">
              <button id="otp1" onClick={() => handleSendOTP()}>
                Send OTP
              </button>
              <div id="verify">
                <TextField
                  id="otpip"
                  onChange={(e) => setEnterOTP(e.target.value)}
                />
                <button id="otp2" onClick={() => handleVerifyOTP()}>
                  Verify OTP
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* card body*/}
      {role === "employee" && (
        <>
          <div className="mainod">
            <button id="otp1" onClick={() => handleSendOTP()}>Send OTP</button>
            <div id="verify">
              <TextField id="otpip" onChange={(e) => setEnterOTP(e.target.value)} />
              <button id="otp2" onClick={() => handleVerifyOTP()}>Verify OTP</button></div>
          </div>
        </>
      )}
    </>
  );
}
