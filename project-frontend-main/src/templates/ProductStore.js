import React, { useEffect, useState } from "react";
import { IP } from "./constants";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import "../templates/css/Store.css";
import StarIcon from "@mui/icons-material/Star";
import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProductStore() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState({});
  const [aprioriRecommendation, setAprioriRecommendation] = useState({});
  const [searchItem, setSearchItem] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const products = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products?page=${pageNo}`,
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

  const handleSearchItem = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/search?name=${searchItem}`,
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
  useEffect(() => {
    products();
  }, [searchItem, pageNo]);

  const openProductInfo = (productId) => {
    if (productId) {
      navigate(`product/${productId}`, { state: productId });
    } else {
      console.error("Product name is empty or invalid.");
    }
  };

  const handleAddToCart = async (productId) => {
    console.log("productId", productId);
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${productId}/addToCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const addToCart = await response.json();
      toast.success(addToCart?.message);
    } catch (error) {
      console.error("Error:", error);
    }
    products();
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${productId}/addToWishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const addToWishlist = await response.json();
      toast.success(addToWishlist?.message);
    } catch (error) {
      console.error("Error:", error);
    }
    products();
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/wishlist/${productId}/removeItem`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const removeFromWishlist = await response.json();
      toast.success(removeFromWishlist?.message);
    } catch (error) {
      console.error("Error:", error);
    }
    products();
  };

  const apriori = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/products/recommendation/sequence`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setAprioriRecommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveFromCart = async (event, data) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/cart/${data}/deleteItem`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const itemDelete = await response.json();
      toast.success(itemDelete?.message);
    } catch (error) {
      console.error("Error:", error);
    }
    products();
  };
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
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
    apriori();
  }, []);

  const openProduct = (productId) => {
    navigate(`product/${productId}`, { state: productId });
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
      <div class="text-center">
        <div id="cover">
          <div class="tb">
            <div class="td">
              <input
                type="text"
                onChange={(e) => setSearchItem(e.target.value)}
                style={{
                  borderRadius: "10px",
                  border: "none",
                }}
                placeholder="Search"
              />
            </div>

            <div class="td" id="s-cover">
              <button onClick={() => handleSearchItem()}>
                <div id="s-circle"></div>
                <span id="ns"></span>
              </button>
            </div>
          </div>
          {/*tb ends*/}
        </div>
        {/* cover ends*/}
      </div>
      {/*text centerends*/}
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {allProducts?.data?.map((value, index) => {
          return (
            <div
              id="cads"
              className="card m-3"
              style={{
                width: "18rem",
                height: "500px",
                boxShadow: " 0px 9px 30px -15px rgb(0 0 0)",
                borderRadius: "20px",
                marginTop: "20px",
                border: "1px solid lightgrey",
              }}
            >
              <img
                className="img-fluid"
                src={value.image}
                alt="Card image cap"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "200px",
                  borderRadius: "20px 20px 0px 0px",
                }}
                onClick={() => openProductInfo(value._id)}
              />
              <div className="card-body">
                {!value?.inWishlist ? (
                  <IconButton
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      background: "transparent",
                    }}
                  >
                    <FavoriteBorderIcon
                      id="heart"
                      onClick={() => handleAddToWishlist(value._id)}
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      background: "transparent",
                    }}
                  >
                    <Favorite
                      id="heart"
                      onClick={() => handleRemoveFromWishlist(value._id)}
                      style={{ color: "#F43E29" }}
                    />
                  </IconButton>
                )}
                <div
                  style={{
                    display: "block",
                    justifyContent: "space-around",
                    height: "260px",
                  }}
                >
                  <h5 className="card-title" style={{ height: "50px" }}>
                    {value.name}
                  </h5>
                  <p
                    className="card-title"
                    value={value.description}
                    style={{ height: "80px", textAlign: "justify" }}
                  >
                    {truncateText(value.description, 70)}
                  </p>
                  <h6 className="card-text">&#8360; {value.price}</h6>
                  <p className="card-text" style={{ marginBottom: "2px" }}>
                    {value.avgRating} / 5{" "}
                    <StarIcon style={{ color: "#FFC300" }} />
                  </p>
                  {!value?.inCart ? (
                    <>
                      <button
                        id="cartbtns"
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(value?._id)}
                        style={{
                          background:
                            "linear-gradient(45deg , #0bd2de , #0083f9)",
                          border: "none",
                          boxShadow: "0px",
                          boxShadow: " 0px 9px 30px -15px rgb(0 0 0)",
                          display: "block",
                          width: "auto",
                        }}
                      >
                        Add to Cart
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        id="cartbtns"
                        className="btn btn-primary"
                        onClick={(e) => handleRemoveFromCart(e, value?._id)}
                        style={{
                          background:
                            "linear-gradient(45deg , #0bd2de , #0083f9)",
                          border: "none",
                          boxShadow: " 0px 9px 30px -15px rgb(0 0 0)",
                          display: "block",
                          width: "auto",
                        }}
                      >
                        Remove from Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div class="pg-btns">
        <button id="pg-btn" onClick={() => handlePrevPage()}>
          Prev
        </button>{" "}
        {pageNo}{" "}
        <button id="pg-btn" onClick={() => handleNextPage()}>
          Next
        </button>
      </div>
      <div>
        {aprioriRecommendation?.data && (
          <>
            <h3>Recommendations for your last bought product</h3>
            <br></br>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {aprioriRecommendation?.data?.map((value, index) => {
                return (
                  <>
                    <div
                      className="card m-3"
                      style={{
                        width: "18rem",
                        height: "400px",
                        boxShadow: " 0px 9px 30px -15px rgb(0 0 0)",
                        borderRadius: "20px",
                        marginTop: "20px",
                        border: "1px solid lightgrey",
                      }}
                    >
                      <img
                        className="img-fluid"
                        src={value.image}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "200px",
                          borderRadius: "20px 20px 0px 0px",
                        }}
                        onClick={() => openProduct(value._id)}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{value.name}</h5>
                        <p className="card-title" value={value.description}>
                          {truncateText(value.description, 70)}
                        </p>
                        <h6 className="card-text">&#8360; {value.price}</h6>
                        <p className="card-text">
                          {value.avgRating} / 5{" "}
                          <StarIcon style={{ color: "#FFC300" }} />
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
