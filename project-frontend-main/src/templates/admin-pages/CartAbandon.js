import React, { useEffect, useState } from "react";
import { IP } from "../constants";
import WMTable from "../../ui-components/table";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router";
import "../../templates/css/Cartabandon.css";

export default function CartAbandon() {
  const [abandonUsers, setAbandonUsers] = useState({});
  const navigate = useNavigate();

  const handleRunCartAbandon = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/cartAbandon`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const getabandonnedusers = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleGetCartAbandonUsers = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/cartAbandon/getUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const getabandonnedusers = await response.json();
      setAbandonUsers(getabandonnedusers);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleRunCartAbandon();
  }, []);

  const handleOpenUserDetails = (data) => {
    navigate(`/userInfo/${data?.id}`, { state: data });
  };

  const columns = [
    {
      accessorKey: "userName",
      header: "User Name",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <>
          <IconButton style={{ color: "#3498DB" }}>
            <ArrowCircleRightIcon
              onClick={() => handleOpenUserDetails(row?.original)}
            />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div class="ca">
      <div class="abandon">
        <button
          id="ca-btn"
          onClick={() => {
            handleGetCartAbandonUsers();
          }}
        >
          See Cart Abandonned Users
        </button>
      </div>
      {abandonUsers?.data && (
        <div id="au-tbl">
          <WMTable
            tableTitle={"Users with cart abandonment possibility"}
            data={abandonUsers?.data}
            columns={columns}
          />
        </div>
      )}
    </div>
  );
}
