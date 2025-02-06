import React, { useEffect, useState } from "react";
import { IP } from "../constants";
import "../../templates/css/Sentiment.css";
import WMTable from "../../ui-components/table";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router";

export default function Sentiments() {
  const [negativeUsers, setNegativeUsers] = useState({});
  const navigate = useNavigate();

  const handleRunSentiments = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/sentiments`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const getSentiment = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleGetSentiments = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/sentiments/getUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const getSentiment = await response.json();
      setNegativeUsers(getSentiment);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleRunSentiments();
  }, []);

  const handleOpenUserDetails = (data) => {
    navigate(`/userInfo/${data?.id}`, { state: data });
  };

  const columns = [
    {
      accessorKey: "user",
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
    <>
      <div class="sentiment-cont">
        <div class="senti">
          <button
            onClick={() => {
              handleGetSentiments();
            }}
            id="get-sent"
          >
            See Negative Users
          </button>
        </div>
        {negativeUsers?.data && (
          <div class="tbl">
            <WMTable
              tableTitle={"Users with Negative Sentiments"}
              data={negativeUsers?.data}
              columns={columns}
            />
          </div>
        )}
      </div>
    </>
  );
}
