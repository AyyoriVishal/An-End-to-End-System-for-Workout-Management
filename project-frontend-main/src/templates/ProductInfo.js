import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IP } from "./constants";
import "../templates/css/Product.css";
import StarIcon from "@mui/icons-material/Star";
import {
  Typography,
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ReviewDialog(props) {
  const [comment, setComment] = useState();
  const [rating, setRating] = useState();
  const onClose = props?.onClose;
  const review = props?.review;

  const handleSubmitReview = async () => {
    const formData = {
      comment,
      rating,
    };
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${props?.productId}/reviews/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await response.json();
      onClose();
      review();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Dialog open={props?.open} onClose={onClose}>
        <DialogTitle>Add Review</DialogTitle>
        <TextField
          placeholder="Add Comment"
          id="comment"
          name="comment"
          fullWidth
          onChange={(e) => setComment(e.target.value)}
        />
        <TextField
          placeholder="Add Rating (1-5)"
          id="rating"
          name="rating"
          fullWidth
          onChange={(e) => setRating(e.target.value)}
        />
        <button id="revsub" onClick={() => handleSubmitReview()}>Submit</button>
      </Dialog>
    </div>
  );
}

export default function ProductInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location?.state;
  const [userDetails, setUserDetails] = useState({});
  const [productInfo, setProductInfo] = useState({});
  const [reviews, setReviews] = useState({});
  const [aprioriRecommendation, setAprioriRecommendation] = useState({});
  const [seeReview, setSeeReview] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const product = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setProductInfo(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const details = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/get-details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/cart/${productId}/deleteItem`,
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
    product();
  };

  const review = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${productId}/reviews`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const apriori = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/products/${productId}/recommendation/freqBuy`,
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

  useEffect(() => {
    product();
    review();
    apriori();
    details();
  }, []);

  const handleAddToCart = async () => {
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
    product();
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${productId}/reviews/${reviewId}/delete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const deleteReview = await response.json();
      toast.success(deleteReview?.message);
    } catch (error) {
      console.error("Error:", error);
    }
    review();
    product();
  };

  const handleReviews = () => {
    setSeeReview(!seeReview);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const openProduct = (prodId) => {
    navigate(`/store/product/${prodId}`, { state: prodId });
    window.location.reload();
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
      <main class="products">
        <div class="prod-cont">
          <div class="product_wrapper">
            <div class="left-column">
              <img
                src={productInfo?.data?.product?.image}
                height={"500px"}
                width={"500px"}
                style={{ objectFit: "cover" }}
                class="m-active"
              />
              <div class="img-small">
                <img src={productInfo?.data?.product?.image} class="active" />
              </div>
            </div>
            <div class="prod_content">
              <div class="prod_description">
                <span>
                  {" "}
                  <p class="category">{productInfo?.data?.product?.category}</p>
                </span>
                <h1>{productInfo?.data?.product?.name}</h1>
                <br></br>
                <p class="prod_desc">
                  {productInfo?.data?.product?.description}
                </p>

                <p>
                  {productInfo?.data?.product?.avgRating} / 5{" "}
                  <StarIcon style={{ color: "#FFC300" }} /> (
                  {reviews?.data?.length})
                </p>

                <h2 class="price">
                  <span>&#8360; {productInfo?.data?.product?.price}</span>
                  {userDetails?.data?._id && (
                    <>
                      {productInfo?.data?.inCart ? (
                        <button
                          onClick={() => handleRemoveFromCart()}
                          class="add_cart"
                        >
                          Remove from cart
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddToCart()}
                          class="add_cart"
                        >
                          Add to cart
                        </button>
                      )}
                    </>
                  )}
                </h2>
              </div>
              {/*prod description ends */}

              <div class="reviews">
                <button onClick={() => handleReviews()} class="sa-reviews">
                  {!seeReview ? "See All Reviews" : "Hide Reviews"}
                </button>
                {userDetails?.data?._id && (
                  <button onClick={() => handleOpenDialog()} class="a-reviews">
                    Add Review
                  </button>
                )}
                {seeReview ? (
                  <div class="r-text">
                    <h3>Reviews</h3>
                    {reviews?.data?.map((value, index) => {
                      return (
                        <>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 100 }}
                              aria-label="simple table"
                            >
                              <TableRow>
                                <TableCell sx={{ maxWidth: 100 }}>
                                  <Typography>
                                    {value?.firstName} {value?.lastName}: Rating
                                    : {value?.rating} | {value?.comment}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton>
                                    <DeleteIcon
                                      onClick={() =>
                                        handleDeleteReview(value?.reveiwId)
                                      }
                                    />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            </Table>
                          </TableContainer>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
                <ReviewDialog
                  open={openDialog}
                  productId={productId}
                  onClose={handleClose}
                  review={review}
                />
              </div>
              {/*review ends*/}
            </div>
            {/* prod content ends*/}
          </div>
          {/* prod-wrapper ends */}
        </div>
        {/*   prod-cont ends */}
      </main>
      <div style={{marginTop:"30px",background:"#1C2833",padding:"20px"}}>
        {aprioriRecommendation?.data && (
          <>
            <h3 style={{color:"#0bd2de"}}>Products Frequently Bought Together</h3>
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
