import React, { useEffect, useState } from "react";
import { IP } from "../constants";
import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

function ImageDialog({ open, imageId, imageURL, onClose, images }) {
  const handleDeleteImage = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/gallery/${imageId}/deleteImage`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const imageDelete = await response.json();
      images();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ textAlign: "center" }}>
        <div className="dialog-content">
          <span className="close">
            <CancelPresentationIcon style={{ color: "red", margin: "2px" }} />
          </span>
          <img
            src={imageURL}
            alt="Selected Image"
            style={{ maxWidth: "100%", maxHeight: "100%", padding: "2px" }}
          />
        </div>
        <DeleteIcon
          onClick={() => handleDeleteImage()}
          style={{ color: "#0083f9", margin: "3px" }}
        />
      </div>
    </Dialog>
  );
}

export default function AddImages() {
  const [allImages, setAllImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");

  const [imageURL, setImageURL] = useState();
  const images = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/gallery`, {
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

  const handleOpenImage = (imageId, imageUrl) => {
    setSelectedImage(imageId);
    setImageURL(imageUrl);
    setOpenDialog(true);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setOpenDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/gallery/addImage`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      images();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(45deg , #0bd2de , #0083f9)",
        border: "1px solid #0083f9",
      }}
    >
      <div
        className="d-flex flex-wrap justify-content-center align-items-center"
        style={{ marginTop: "20px" }}
      >
        {allImages?.data?.map((value, index) => {
          return (
            <div
              key={index}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                cursor: "pointer",
                padding: "1px",
                margin: "13px",
                borderRadius: "10px",
                boxShadow: "0px 9px 30px -15px rgb(0 0 0)",
              }}
              onClick={() => handleOpenImage(value?._id, value?.imgurl)}
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
                }}
              />
            </div>
          );
        })}
      </div>
      {openDialog && (
        <ImageDialog
          open={openDialog}
          imageId={selectedImage}
          imageURL={imageURL}
          onClose={handleCloseImage}
          images={images}
        />
      )}
      <div style={{ height: "100px" }}>
        <form
          id="imageUploadForm"
          onSubmit={handleSubmit}
          style={{
            width: "30%",
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "10px",
            marginTop: "10px",
            height: "60px",
          }}
        >
          <input
            type="file"
            name="image"
            accept="image/*"
            style={{
              border: "1px solid white",
              marginRight: "20px",
              height: "40px",
            }}
          />
          <button
            type="submit"
            style={{
              height: "40px",
              borderRadius: "7px",
              boxShadow: "0px 9px 30px -15px rgb(1 1 1)",
              background: "linear-gradient(45deg , #0bd2de , #0083f9)",
              color: "white",
              border: "none",
            }}
          >
            Submit
          </button>
        </form>
        <div
          id="message"
          style={{
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
