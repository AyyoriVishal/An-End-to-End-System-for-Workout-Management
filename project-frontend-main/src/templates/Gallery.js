import React, { useEffect, useState } from "react";
import { IP } from "./constants";
import { colors } from "@mui/material";

export default function Gallery() {
  const [allImages, setAllImages] = useState({});
  const images = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/gallery`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      setAllImages(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    images();
  }, []);

  return (
    <div
      className="cont-g"
      style={{
        background: "linear-gradient(45deg , #0bd2de , #0083f9)",
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <div
        className="d-flex flex-wrap justify-content-center align-items-center"
        style={{ marginTop: "20px" }}
      >
        {allImages?.data?.map((value, index) => {
          return (
            <div
              style={{
                width: "350px",
                height: "250px",
                overflow: "hidden",
                padding: "1px",
                margin: "13px",
              }}
            >
              <img
                className="img-fluid"
                src={value.imgurl}
                alt="Card image cap"
                style={{
                  objectFit: "cover",
                  width: "300px",
                  height: "200px",
                  borderRadius: "10px",
                  boxShadow: "0px 9px 30px -15px rgb(0 0 0)",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
