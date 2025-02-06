import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { IP } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import "../../templates/css/GreivanceD.css";
import Typography from "@mui/material/Typography";
import "../../templates/css/GreivanceD.css";

export default function GrievanceDetails() {
  const location = useLocation();
  const [grievanceDetails, setGrievanceDetails] = useState();

  const gId = location?.state;

  const viewGrievance = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/greviences/${gId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );

      const data = await response.json();
      setGrievanceDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    viewGrievance();
  }, []);

  const handleClick = async (text) => {
    const formData = {
      answer: text,
    };
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/greviences/${gId}/response`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const sendGrievance = await response.json();
      toast.success(sendGrievance?.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="gd">
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
      <>
        <div id="card-body">
          <Card sx={{ minWidth: 100 }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Name : {grievanceDetails?.data?.user?.firstName}{" "}
                {grievanceDetails?.data?.user?.lastName}
              </Typography>
              <Typography variant="body3" color="text.secondary">
                Concern : {grievanceDetails?.data?.gtype}
              </Typography>

              <Typography variant="body2" color="#0083f9">
                Message : {grievanceDetails?.data?.message}
              </Typography>
            </CardContent>
            {grievanceDetails?.data?.gtype === "employement_request" && (
              <>
                <CardActions>
                  <Box component="span" id="bx">
                    <Button
                      class="bttn"
                      value="Yes"
                      size="small"
                      onClick={() => handleClick("Yes")}
                    >
                      Yes
                    </Button>
                    <Button
                      class="bttn"
                      value="No"
                      size="small"
                      onClick={() => handleClick("No")}
                    >
                      No
                    </Button>
                  </Box>
                </CardActions>
              </>
            )}
          </Card>
        </div>
      </>
    </div>
  );
}
