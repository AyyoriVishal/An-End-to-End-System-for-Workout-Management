import React, { useEffect, useState } from "react";
import WMTable from "../ui-components/table";
import { IP } from "./constants";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/AddCard";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router";
export default function Orders() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
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
  const role = userDetails?.data?.role;
  console.log("role", role);

  const [myOrders, setMyOrders] = useState({});
  const [myAllOrders, setMyAllOrders] = useState({});

  const [viewmyOrders, setviewMyOrders] = useState({});
  const [viewmyAllOrders, setviewMyAllOrders] = useState({});

  const handleBuyAgain = async (orderId) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/orders/${orderId}/buyagain`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const buyAgain = await response.json();
      navigate("/cart");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getUserMyOrders = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/view/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setviewMyOrders(data);
      const array = data?.data;
      setMyOrders([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getEmpMyOrders = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/employee/orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setviewMyOrders(data);
      const array = data?.data;
      setMyOrders([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getUserMyAllOrders = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/orders/history`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setviewMyAllOrders(data);
      const array = data?.data;
      setMyAllOrders([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getEmpMyAllOrders = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/employee/orders/history`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setviewMyAllOrders(data);
      const array = data?.data;
      setMyAllOrders([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenOrder = (details) => {
    navigate(`/order-details/${details?._id}`, { state: { details, role } });
  };

  const columns = [
    {
      header: "Items",
      Cell: ({ row }) => (
        <>
          {row?.original?.orderItems?.map((value, index) => {
            return (<p>{value?.name}</p>);
          })}
        </>
      ),
    },
    {
      accessorKey: "orderStatus",
      header: "Order Status",
    },
    {
      accessorKey: "subtotalPrice",
      header: "Total Price",
    },
    {
      header: "Check Status",
      Cell: ({ row }) => (
        <>
          <IconButton
            value={"Check Order Status"}
            onClick={() => handleOpenOrder(row?.original)}
            style={{background:"transparent"}}
          >
            <ArrowCircleRightIcon style={{color:"#0083f9"}}/>
          </IconButton>
        </>
      ),
    },
  ];
  const historyColumns = [
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
      accessorKey: "orderStatus",
      header: "Order Status",
    },
    {
      accessorKey: "subtotalPrice",
      header: "Total Price",
    },
    {
      header: "Buy Again",
      Cell: ({ row }) => (
        <>
          {row?.original?.orderStatus === "Delivered" ? (
            <IconButton value={"Pending Payment"}>
              <AddCardIcon onClick={() => handleBuyAgain(row?.original?._id)} />
            </IconButton>
          ) : (
            ""
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    details();
  }, []);

  useEffect(() => {
    if (role === "user") {
      getUserMyOrders();
      getUserMyAllOrders();
    }
    if (role === "employee") {
      getEmpMyOrders();
      getEmpMyAllOrders();
    }
  }, [role]);

  return (
    <div class="voc">
      {viewmyOrders?.data && (
        <div  class="plcd-orders">
        <WMTable
          columns={columns}
          tableTitle={"Current Orders"}
          data={myOrders}
         
        />
        </div>
      )}

      {viewmyAllOrders?.data && (
        <div class="deli-orders">
        <WMTable
          columns={historyColumns}
          tableTitle={"Order History"}
          data={myAllOrders}
          
        />
        </div>
      )}
    </div>
  );
}
