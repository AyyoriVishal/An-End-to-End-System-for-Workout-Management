import React, { useEffect, useState } from "react";
import { IP } from "../constants";
import WMTable from "../../ui-components/table";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router";
import "../../templates/css/Churn.css";

export default function Churn() {
  const [churnedUsers, setChurnedUsers] = useState({});
  const navigate = useNavigate();

  const handleRunChurn = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/churned`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const getChurn = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleGetChurnedUsers = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/churned/getUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const getChurn = await response.json();
      setChurnedUsers(getChurn);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleRunChurn();
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
    <div class="churn-cont">
      <div>
        <button
          onClick={() => {
            handleGetChurnedUsers();
          }}
          id="churn-det"
        >
          See Churned Users
        </button>
      </div>
      {churnedUsers?.data && (
        <WMTable
          tableTitle={"Users with Churn Possibility"}
          data={churnedUsers?.data}
          columns={columns}
        />
      )}
    </div>
  );
}
