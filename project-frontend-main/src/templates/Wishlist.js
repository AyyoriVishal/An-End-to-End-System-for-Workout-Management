import React, { useEffect, useState } from "react";
import { IP } from "./constants";
import PropTypes from "prop-types";
import WMTable from "../ui-components/table";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Wishlist() {
  const [allWishlist, setAllWishlist] = useState({});
  const wishlist = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/wishlist`,
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
      setAllWishlist(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    wishlist();
  }, []);

  const moveToCart = async (event, data) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/wishlist/${data?._id}/moveToCart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const itemMove = await response.json();
      toast.success(itemMove?.message);
    } catch (error) {
      console.error("Error:", error);
    }
    wishlist();
  };

  const handleDeleteItem = async (event, data) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/wishlist/${data?._id}/removeItem`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const itemDelete = await response.json();
      toast.success(itemDelete?.message)
    } catch (error) {
      console.error("Error:", error);
    }
    wishlist();
  };

  const columns = [
    {
      accessorKey: "image",
      header: "Image",
      Cell: ({ row }) => (
        <>
          <img src={row?.original?.image} height={"100px"} width={"100px"} style={{objectFit:"cover", borderRadius:"10px", boxShadow:"0px 9px 30px -15px rgb(0 0 0)"}} />
        </>
      ),
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      Cell: ({ row }) => (
        <>
        <div style={{}}>
          <IconButton>
            <DeleteIcon
            onClick={(e) => handleDeleteItem(e, row?.original)}
            style={{color:"#0bd2de"}}
            />
          </IconButton>
          <IconButton>
            <ShoppingCartCheckoutIcon
            onClick={(e) => moveToCart(e, row?.original)}
            style={{color:"#0083f9"}}
            />
          </IconButton>
          </div>
        </>
      ),
    },
  ];
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
    <div style={{background:"blue"}}>
      {allWishlist?.data && (
        <WMTable
        sx={{color:"pink"}} 
          columns={columns}
          data={allWishlist?.data}
          tableTitle={"Wishlist"}
        />
      )}
      </div>
    </>
  );
}