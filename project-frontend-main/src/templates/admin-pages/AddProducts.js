import React, { useEffect, useState } from "react";
import { IP } from "../constants";
import "../../templates/css/Addprod.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

function AddProductDialog(props) {
  const products = props?.products;
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [stock, setStock] = useState(null);
  const [weight, setWeight] = useState(null);
  const [productGoal, setProductGoal] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("weight", weight);
    formData.append("productGoal", productGoal);
    formData.append("category", category);
    formData.append("image", selectedImage);

    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/products/addProducts`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to Add product");
      }
      const addProd = await response.json();
      products();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog open={props?.open} onClose={props?.onClose}>
        <DialogTitle id="title">Add Product</DialogTitle>
        <form onSubmit={handleSubmit}>
          <div class="prodent">
            <TextField
              placeholder="Enter Product Name"
              class="prod-detl"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              placeholder="Enter Product price"
              class="prod-detl"
              id="price"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              placeholder="Enter Product Description"
              class="prod-detl"
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              placeholder="Enter Product stock"
              class="prod-detl"
              id="stock"
              name="stock"
              onChange={(e) => setStock(e.target.value)}
            />
            <TextField
              placeholder="Enter Product Weight"
              class="prod-detl"
              id="weight"
              name="weight"
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div class="rad">
            <div class="goal">
              <InputLabel>Product Goal</InputLabel>
              <RadioGroup
                aria-label="productGoal"
                name="productGoal"
                id="productGoal"
                onChange={(e) => setProductGoal(e.target.value)}
              >
                <FormControlLabel
                  value="bulk"
                  control={<Radio />}
                  label="bulk"
                />
                <FormControlLabel value="cut" control={<Radio />} label="cut" />
                <FormControlLabel
                  value="lean"
                  control={<Radio />}
                  label="lean"
                />
              </RadioGroup>
            </div>
            <div class="cat">
              <InputLabel>Product Category</InputLabel>
              <RadioGroup
                aria-label="category"
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <FormControlLabel
                  value="Eatables"
                  control={<Radio />}
                  label="Eatables"
                />
                <FormControlLabel
                  value="Equipments"
                  control={<Radio />}
                  label="Equipments"
                />
                <FormControlLabel
                  value="Accessories"
                  control={<Radio />}
                  label="Accessories"
                />
              </RadioGroup>
            </div>
          </div>
          <input
            id="file"
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
          <input id="add-prd" type="submit" value="Add Product" />
        </form>
      </Dialog>
    </>
  );
}

export default function AddProducts() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const products = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/products?page=${pageNo}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openProductInfo = (productId) => {
    if (productId) {
      navigate(`product/${productId}`, { state: productId });
    } else {
      console.error("Product name is empty or invalid.");
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleNextPage = () => {
    setPageNo(pageNo + 1);
  };
  const handlePrevPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  useEffect(() => {
    products();
  }, [pageNo]);
  
  return (
    <>
      <div class="contadd">
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {allProducts?.data?.map((value, index) => {
            return (
              <div
                className="card m-3"
                style={{
                  width: "18rem",
                  height: "430px",
                  borderRadius: "10px",
                  boxShadow: " 0px 9px 30px -15px rgb(0 0 0)",
                  border: "none",
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
                    borderRadius: "10px 10px 0px 0px",
                  }}
                  onClick={() => openProductInfo(value._id)}
                />
                <div className="card-body">
                  <h5 className="card-title">{value.name}</h5>
                  <h6 className="card-title">
                    {truncateText(value.description, 100)}
                  </h6>
                  <p className="card-text">&#8360; {value.price}</p>
                  <p className="card-text">{value.avgRating}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div class="btns">
          <button onClick={() => handlePrevPage()}>Prev</button> {pageNo}{" "}
          <button onClick={() => handleNextPage()}>Next</button>
        </div>
        <button id="add-prd" onClick={() => handleOpenDialog()}>
          ADD PRODUCTS
        </button>
        <AddProductDialog
          open={openDialog}
          onClose={handleClose}
          products={products}
        />
        
      </div>
    </>
  );
}
