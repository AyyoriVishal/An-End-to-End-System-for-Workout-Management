import React, { useState } from "react";
import WMTable from "../../ui-components/table";
import { IP } from "../constants";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router";

export default function ViewGrievance() {
  const navigate = useNavigate();
  const [allGrievances, setAllGrievances] = useState();

  const viewAllGrievances = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/greviences`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setAllGrievances(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useState(() => {
    viewAllGrievances();
  }, []);

  const handleOpenUserDetails = (data) => {
    navigate(`/grievance-details/${data?._id}`, { state: data?._id });
  };

  const columns = [
    {
      header: "User Id",
      Cell: ({ row }) => (
        <>
          {row?.original?.user?.firstName} {row?.original?.user?.lastName}
        </>
      ),
    },
    {
      accessorKey: "gtype",
      header: "Grievance Type",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <>
          <IconButton>
            <ArrowCircleRightIcon
              style={{ color: "#0083f9" }}
              onClick={() => handleOpenUserDetails(row?.original)}
            />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(45deg , #0bd2de , #0083f9)",
        width: "100%",
        height: "100%",
        padding: "20px",
        height: "100vh",
      }}
    >
      <>
        <div
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "20px",
            boxShadow: "0px 9px 30px -15px rgb(0 0 0)",
          }}
        >
          {allGrievances && (
            <WMTable
              columns={columns}
              data={allGrievances?.data}
              tableTitle={"All Grievances"}
            />
          )}
        </div>
      </>
    </div>
  );
}
