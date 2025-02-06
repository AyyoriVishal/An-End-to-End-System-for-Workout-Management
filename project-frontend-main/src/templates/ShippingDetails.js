import {
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { IP } from "./constants.js";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import "../templates/css/Shipdetail.css";
export default function ShippingInfo() {
  const [editDetails, setEditDetails] = useState(false);
  const [allShippingDetails, setAllShippingDetails] = useState({});
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [pincode, setPincode] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setAddress(address ? address : allShippingDetails?.data?.address);
    setCity(city ? city : allShippingDetails?.data?.city);
    setState(state ? state : allShippingDetails?.data?.state);
    setCountry(country ? country : allShippingDetails?.data?.country);
    setPincode(pincode ? pincode : allShippingDetails?.data?.pincode);
    setPhoneNo(phoneNo ? phoneNo : allShippingDetails?.data?.phoneNo);
  }, [allShippingDetails]);

  const getShippingDetails = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/get-shipping`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setAllShippingDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getShippingDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      address: allShippingDetails?.data?._id
        ? allShippingDetails?.data?.address
        : address,
      city: allShippingDetails?.data?._id
        ? allShippingDetails?.data?.city
        : city,
      state: allShippingDetails?.data?._id
        ? allShippingDetails?.data?.state
        : state,
      phoneNo: allShippingDetails?.data?._id
        ? allShippingDetails?.data?.phoneNo
        : phoneNo,
      pincode: allShippingDetails?.data?._id
        ? allShippingDetails?.data?.pincode
        : pincode,
      country: allShippingDetails?.data?._id
        ? allShippingDetails?.data?.country
        : country,
    };

    const lettersOnlyRegex = /^[a-zA-Z]+$/;
    const cityRegex = /^[a-zA-Z\s]+$/;
    const phoneNoRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;
    if (!phoneNoRegex.test(phoneNo)) {
      alert("Enter valid Phone number");
      return;
    }
    if (!pincodeRegex.test(pincode)) {
      alert("Enter valid Pincode");
      return;
    }
    if (!lettersOnlyRegex.test(state)) {
      alert("State name should contain only letters");
      return;
    }
    if (!cityRegex.test(city)) {
      alert("City name should contain only letters");
      return;
    }
    if (!lettersOnlyRegex.test(country)) {
      alert("Country name should contain only letters");
      return;
    }

    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/shippingDetails`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await response.json();
      navigate("/paymentInfo");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditToggle = () => {
    setEditDetails(!editDetails);
  };
  return (
    <>
      <div class="shipcont">
        <div class="title">
          {" "}
          <h1>Shipping Details</h1>
          <IconButton onClick={() => handleEditToggle()}>
            {!editDetails ? (
              <EditIcon style={{ color: "#0083f9" }} />
            ) : (
              <CloseIcon />
            )}
          </IconButton>
        </div>

        <form onSubmit={handleSubmit}>
          {!editDetails ? (
            <>
              <div class="fillform">
                <InputLabel>Phone Number</InputLabel>
                <Typography>{allShippingDetails?.data?.phoneNo}</Typography>
                <InputLabel>Address</InputLabel>
                <Typography>{allShippingDetails?.data?.address}</Typography>
                <InputLabel>City</InputLabel>
                <Typography>{allShippingDetails?.data?.city}</Typography>
                <InputLabel>Pincode</InputLabel>
                <Typography>{allShippingDetails?.data?.pincode}</Typography>
                <InputLabel>State</InputLabel>
                <Typography>{allShippingDetails?.data?.state}</Typography>
                <InputLabel>Country</InputLabel>
                <Typography>{allShippingDetails?.data?.country}</Typography>
              </div>
            </>
          ) : (
            <div class="fillform">
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <InputLabel id="lbl">Enter Your Phone Number</InputLabel>
                  <TextField
                    placeholder="Enter Phone Number"
                    id="phoneNo"
                    name="phoneNo"
                    class="textf"
                    defaultValue={allShippingDetails?.data?.phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="lbl">Enter Your Address</InputLabel>
                  <TextField
                    placeholder="Enter Address"
                    id="address"
                    name="address"
                    defaultValue={allShippingDetails?.data?.address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="lbl">Enter Your City</InputLabel>
                  <TextField
                    placeholder="Enter City"
                    id="city"
                    name="city"
                    defaultValue={allShippingDetails?.data?.city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="lbl">Enter Your Pincode</InputLabel>
                  <TextField
                    placeholder="Enter Pincode"
                    id="pincode"
                    name="pincode"
                    defaultValue={allShippingDetails?.data?.pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="lbl">Enter Your State</InputLabel>
                  <TextField
                    placeholder="Enter State"
                    id="state"
                    name="state"
                    defaultValue={allShippingDetails?.data?.state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} id="gr">
                  <InputLabel id="lbl">Enter Your Country</InputLabel>
                  <TextField
                    placeholder="Enter Country"
                    id="country"
                    name="country"
                    defaultValue={allShippingDetails?.data?.country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>
              </Grid>
            </div>
          )}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
      {/*shipcont */}
    </>
  );
}
