import React, { useState } from "react";
import "../templates/css/Paymentinfo.css";
import { IP } from "./constants";
import {
  Grid,
  FormControlLabel,
  InputLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PaymentInfo() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      paymentMethod,
    };
    try {
      const response = await fetch(`http://${IP}:5000/api/users/buy/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      navigate("/orders");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div class="payment">
      <form onSubmit={handleSubmit} id="paymentf">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={12}>
            <InputLabel id="lbl">Enter Payment Type</InputLabel>
            <RadioGroup
              aria-label="paymentType"
              name="paymentType"
              id="paymentType"
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {/* <FormControlLabel value="UPI" control={<Radio />} label="UPI" /> */}
              {/* <FormControlLabel value="Card" control={<Radio />} label="Card" /> */}
              <FormControlLabel
                value="CashOnDelivery"
                control={<Radio />}
                label="CashOnDelivery"
              />
              {/* <FormControlLabel
                value="NetBanking"
                control={<Radio />}
                label="NetBanking"
              /> */}
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={12}>
            <input class="sub-btn" type="submit" value="Submit"/>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}