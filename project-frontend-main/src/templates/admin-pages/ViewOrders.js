import React, { useEffect, useState } from "react";
import WMTable from "../../ui-components/table";
import { IP } from "../constants";
import AddCardIcon from "@mui/icons-material/AddCard";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";
import "../../templates/css/ViewOrders.css";
import {
  Typography,
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";

export default function ViewOrders() {
  const navigate = useNavigate();
  const [placedOrders, setPlacedOrders] = useState({});
  const [approvedOrders, setApprovedOrders] = useState({});
  const [shippedOrders, setShippedOrders] = useState({});
  const [deliveredOrders, setDeliveredOrders] = useState({});
  const [viewplacedOrders, setviewPlacedOrders] = useState({});
  const [viewapprovedOrders, setviewApprovedOrders] = useState({});
  const [viewshippedOrders, setviewShippedOrders] = useState({});
  const [viewdeliveredOrders, setviewDeliveredOrders] = useState({});

  const getPlacedOrders = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/placed`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setviewPlacedOrders(data);
      const array = data?.data;
      setPlacedOrders([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getShippedOrders = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/shipping`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setviewShippedOrders(data);
      const array = data?.data;
      setShippedOrders([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getApprovedOrders = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/approved`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setviewApprovedOrders(data);
      const array = data?.data;
      setApprovedOrders([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getDeliveredOrders = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/delivered`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setviewDeliveredOrders(data);
      const array = data?.data;
      setDeliveredOrders([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getPlacedOrders();
    getShippedOrders();
    getApprovedOrders();
    getDeliveredOrders();
  }, []);

  const handleViewOrder = (order) => {
    navigate(`/view-order/${order?._id}`, { state: order });
  };
  const columns = [
    {
      header: "User",
      Cell: ({ row }) => (
        <>
          {row?.original?.user?.firstName} {row?.original?.user?.lastName}
        </>
      ),
    },
    {
      header: "Items",
      Cell: ({ row }) => (
        <>
          {row?.original?.orderItems?.map((value, index) => {
            return <p>{value?.name}</p>;
          })}
        </>
      ),
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
    },
    {
      accessorKey: "subtotalPrice",
      header: "Total Price",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <>
          <IconButton>
            <ArrowCircleRightIcon
              onClick={() => handleViewOrder(row?.original)}
            />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <div class="voc">
      <div class="plcd-orders">
        {viewplacedOrders?.data && (
          <>
            <WMTable
              data={placedOrders}
              columns={columns}
              tableTitle={"Placed Orders"}
            />
          </>
        )}
      </div>
      <div class="plcd-orders">
        {viewshippedOrders?.data && (
          <>
            <WMTable
              data={shippedOrders}
              columns={columns}
              tableTitle={"Shipped Orders"}
            />
          </>
        )}
      </div>
      <div class="plcd-orders">
        {viewapprovedOrders?.data && (
          <>
            <WMTable
              data={approvedOrders}
              columns={columns}
              tableTitle={"Approved Orders"}
            />
          </>
        )}
      </div>
      <div class="plcd-orders">
        {viewdeliveredOrders?.data && (
          <>
            <WMTable
              data={deliveredOrders}
              columns={columns}
              tableTitle={"Delivered Orders"}
            />
          </>
        )}
      </div>
    </div>
  );
}
