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
  Paper,
  Divider,
  Autocomplete,
} from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';
import WcIcon from '@mui/icons-material/Wc';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import LanguageIcon from '@mui/icons-material/Language';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CakeIcon from '@mui/icons-material/Cake';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import React, { useEffect, useState } from "react";
import { IP } from "./constants.js";
import "../templates/css/Profile.css";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProfilePage() {
  const [profileDetails, setProfileDetails] = useState({});
  const [editDetails, setEditDetails] = useState(false);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [systolicBp, setSystolicBp] = useState();
  const [diastolicBp, setDiastolicBp] = useState();
  const [diabetes, setDiabetes] = useState();
  const [cholesterol, setCholesterol] = useState();
  const navigate = useNavigate();

  // const cities = [
  //   {
  //     city: "Navi Mumbai",
  //     state: "Maharashtra",
  //     country: "India",
  //   },
  //   {
  //     city: "Mumbai",
  //     state: "Maharashtra",
  //     country: "India",
  //   },
  //   {
  //     city: "Delhi",
  //     state: "Delhi",
  //     country: "India",
  //   },
  //   {
  //     city: "Bangalore",
  //     state: "Karnataka",
  //     country: "India",
  //   },
  //   {
  //     city: "Kolkata",
  //     state: "West Bengal",
  //     country: "India",
  //   },
  //   {
  //     city: "Chennai",
  //     state: "Tamil Nadu",
  //     country: "India",
  //   },
  //   {
  //     city: "Hyderabad",
  //     state: "Telangana",
  //     country: "India",
  //   },
  //   {
  //     city: "Pune",
  //     state: "Maharashtra",
  //     country: "India",
  //   },
  //   {
  //     city: "Ahmedabad",
  //     state: "Gujarat",
  //     country: "India",
  //   },
  //   {
  //     city: "Surat",
  //     state: "Gujarat",
  //     country: "India",
  //   },
  //   {
  //     city: "Jaipur",
  //     state: "Rajasthan",
  //     country: "India",
  //   },
  //   {
  //     city: "Lucknow",
  //     state: "Uttar Pradesh",
  //     country: "India",
  //   },
  //   {
  //     city: "Kanpur",
  //     state: "Uttar Pradesh",
  //     country: "India",
  //   },
  //   {
  //     city: "Nagpur",
  //     state: "Maharashtra",
  //     country: "India",
  //   },
  //   {
  //     city: "Patna",
  //     state: "Bihar",
  //     country: "India",
  //   },
  //   {
  //     city: "Indore",
  //     state: "Madhya Pradesh",
  //     country: "India",
  //   },
  //   {
  //     city: "Thane",
  //     state: "Maharashtra",
  //     country: "India",
  //   },
  //   {
  //     city: "Bhopal",
  //     state: "Madhya Pradesh",
  //     country: "India",
  //   },
  //   {
  //     city: "Visakhapatnam",
  //     state: "Andhra Pradesh",
  //     country: "India",
  //   },
  //   {
  //     city: "Vadodara",
  //     state: "Gujarat",
  //     country: "India",
  //   },
  //   {
  //     city: "Firozabad",
  //     state: "Uttar Pradesh",
  //     country: "India",
  //   },
  // ];

  const handleProfileEdit = () => {
    setEditDetails(!editDetails);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const lettersOnlyRegex = /^[a-zA-Z\s]+$/;
    const phoneNoRegex = /^[0-9]{10}/;
    const numbersRegex = /^[0-9]+/;

    if (!numbersRegex.test(age)) {
      alert("Enter valid Age");
      return;
    }
    if (!numbersRegex.test(height)) {
      alert("Enter valid height");
      return;
    }
    if (!numbersRegex.test(weight)) {
      alert("Enter valid weight");
      return;
    }
    if (!numbersRegex.test(cholesterol)) {
      alert("Enter valid Cholesterol level");
      return;
    }
    if (!numbersRegex.test(diabetes)) {
      alert("Enter valid Sugar level");
      return;
    }
    if (!numbersRegex.test(systolicBp)) {
      alert("Enter valid BP");
      return;
    }
    if (!numbersRegex.test(diastolicBp)) {
      alert("Enter valid BP");
      return;
    }
    if (!lettersOnlyRegex.test(city)) {
      alert("City name should contain only letters");
      return;
    }
    if (!lettersOnlyRegex.test(country)) {
      alert("Country name should contain only letters");
      return;
    }

    const formData = {
      age : age || profileDetails?.data?.age,
      weight : weight || profileDetails?.data?.weight,
      height: height || profileDetails?.data?.height,
      goal : goal || profileDetails?.data?.goal,
      gender: gender || profileDetails?.data?.gender,
      city: city || profileDetails?.data?.city,
      country: country || profileDetails?.data?.country,
      systolicBp: Number(systolicBp) || profileDetails?.data?.systolicBp,
      cholesterol: Number(cholesterol) || profileDetails?.data?.cholesterol,
      diabetes: Number(diabetes) || profileDetails?.data?.diabetes,
      diastolicBp: Number(diastolicBp) || profileDetails?.data?.diastolicBp
    };
    try {
      const response = await fetch(`http://${IP}:5000/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const updateProfile = await response.json();
      toast.success(updateProfile?.message);
      getProfileDetails();
      handleProfileEdit();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getProfileDetails = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/get-profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setProfileDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  // const options =
  //   cities?.map((option) => {
  //     const firstLetter = option?.city[0].toUpperCase();
  //     return {
  //       firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
  //       ...option,
  //     };
  //   });

  return (
    <>
      <div class="conticon">
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
        <div id="prof">
          <Paper elevation={3} id="prop">
            <div id="title">
              <h1>User Profile</h1>

              <div style={{ paddingLeft: "800px" }}>
                <IconButton onClick={() => handleProfileEdit()}>
                  {!editDetails ? <EditIcon id="edit" /> : <CloseIcon />}
                </IconButton>
              </div>
            </div>
            <Divider color="#333" style={{width:"95%",margin:"auto"}}/>
            {!editDetails ? (
              <>
                <div class="social-icons">
                  <div class="icon">
                    <a><PersonAddAlt1Icon fontSize="large"/></a>
                    <h4>{profileDetails?.data?.age}</h4>
                    <p><InputLabel>Age</InputLabel></p>
                  </div>

                  
                  <div class="icon">
                    <a><HeightIcon fontSize="large"/></a>
                    <h4>{profileDetails?.data?.height}</h4>
                    <p> <InputLabel>Height</InputLabel></p>
                  </div>

                  <div class="icon">
                    <a><ScaleIcon fontSize="large"/></a>
                    <h4>{profileDetails?.data?.weight}</h4>
                    <p> <InputLabel>Weight</InputLabel></p>
                  </div>

                  
                  <div class="icon">
                    <a><WcIcon fontSize="large"/></a>
                    <h4>{profileDetails?.data?.gender}</h4>
                    <p><InputLabel>Gender</InputLabel></p>
                  </div>

                  <div class="icon">
                    <a><SportsScoreIcon fontSize="large"/></a>
                    <h4>{profileDetails?.data?.goal}</h4>
                    <p><InputLabel>Goal</InputLabel></p>
                  </div>

                  <div class="icon">
                    <a><LocationOnIcon fontSize="large"/></a>
                    <h4>{profileDetails?.data?.city} </h4>
                    <p><InputLabel>City</InputLabel></p>
                  </div>

                  <div class="icon">
                    <a><LanguageIcon fontSize="large"/></a>
                    <h4>{profileDetails?.data?.country}</h4>
                    <p><InputLabel>Country</InputLabel></p>
                  </div>

                  <div class="icon">
                    <a><MonitorHeartIcon fontSize="large"/></a>
                    <h4>{profileDetails?.data?.bp}</h4>
                    <p><InputLabel>BP Ratio</InputLabel></p>
                  </div>

                  <div class="icon">
                    <a><CakeIcon fontSize="large"/></a>
                    <h4>{profileDetails?.data?.diabetes}</h4>
                    <p><InputLabel>Diabetes</InputLabel></p>
                  </div>

                  <div class="icon">
                    <a><WaterDropIcon fontSize="large"/></a>
                    <h4>{profileDetails?.data?.cholesterol}</h4>
                    <p><InputLabel>Cholestrol</InputLabel></p>
                  </div>

                  
                  
                    </div> 
                  
                    {/* <li>
                      <span>
                        <InputLabel>Systolic BP :</InputLabel>
                      </span>
                      {profileDetails?.data?.systolicBp}
                    </li>
                    <li>
                      <span>
                        <InputLabel>Diastolic BP :</InputLabel>
                      </span>
                      {profileDetails?.data?.diastolicBp}
                    </li> */}
                    
                  
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Enter Your Age</InputLabel>
                    <TextField
                      placeholder="Enter Age"
                      id="age"
                      fullWidth
                      defaultValue={profileDetails?.data?.age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Enter Your Weight</InputLabel>
                    <TextField
                      placeholder="Enter Weight"
                      id="weight"
                      fullWidth
                      defaultValue={profileDetails?.data?.weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Enter Your Height</InputLabel>
                    <TextField
                      placeholder="Enter Height"
                      id="height"
                      fullWidth
                      defaultValue={profileDetails?.data?.height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Enter Your Gender</InputLabel>
                    <RadioGroup
                      aria-label="gender"
                      id="gender"
                      defaultValue={profileDetails?.data?.gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Enter Your Goal</InputLabel>
                    <RadioGroup
                      aria-label="goal"
                      id="goal"
                      selected={profileDetails?.data?.goal}
                      defaultValue={profileDetails?.data?.goal}
                      onChange={(e) => setGoal(e.target.value)}
                    >
                      <FormControlLabel
                        value="bulk"
                        control={<Radio />}
                        label="bulk"
                      />
                      <FormControlLabel
                        value="cut"
                        control={<Radio />}
                        label="cut"
                      />
                      <FormControlLabel
                        value="lean"
                        control={<Radio />}
                        label="lean"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Enter your City</InputLabel>
                    <TextField
                      placeholder="Enter City"
                      id="city"
                      fullWidth
                      defaultValue={profileDetails?.data?.city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {/* <Autocomplete
                      id="grouped-demo"
                      options={options.sort(
                        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                      )}
                      groupBy={(option) => option?.firstLetter}
                      getOptionLabel={(option) => option?.city}
                      onSelect={(e) => setCity(e.target.value)}
                      renderInput={(params) => (
                        <TextField {...params} label="Enter City" />
                      )}
                    /> */}
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Enter Country</InputLabel>
                    <TextField
                      placeholder="Enter Country"
                      id="country"
                      fullWidth
                      defaultValue={profileDetails?.data?.country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Enter Your Systolic BP</InputLabel>
                    <TextField
                      placeholder="Enter your Systolic BP"
                      id="systolicBp"
                      fullWidth
                      defaultValue={profileDetails?.data?.systolicBp}
                      onChange={(e) => setSystolicBp(e.target.value)}
                    />
                  </Grid><Grid item xs={12} sm={6}>
                    <InputLabel>Enter Your Diastolic BP</InputLabel>
                    <TextField
                      placeholder="Enter Your Diastolic BP"
                      id="diastolicBp"
                      fullWidth
                      defaultValue={profileDetails?.data?.diastolicBp}
                      onChange={(e) => setDiastolicBp(e.target.value)}
                    />
                  </Grid><Grid item xs={12} sm={6}>
                    <InputLabel>Enter Your Cholestrol Level</InputLabel>
                    <TextField
                      placeholder="Enter your Cholestrol Level"
                      id="cholesterol"
                      fullWidth
                      defaultValue={profileDetails?.data?.cholesterol}
                      onChange={(e) => setCholesterol(e.target.value)}
                    />
                  </Grid><Grid item xs={12} sm={6}>
                    <InputLabel>Enter Your Sugar Level(Diabetes)</InputLabel>
                    <TextField
                      placeholder="Enter your sugar Level"
                      id="diabetes"
                      fullWidth
                      defaultValue={profileDetails?.data?.diabetes}
                      onChange={(e) => setDiabetes(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
}
