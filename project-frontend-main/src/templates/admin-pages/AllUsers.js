import React, { useEffect, useState } from "react";
import { IP } from "../constants";
import WMTable from "../../ui-components/table";
import Box from "@mui/material/Box";
import {
  IconButton,
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";

export default function AllUsers() {
  const [allUserDetails, setAllUserDetails] = useState({});
  const navigate = useNavigate();
  const details = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setAllUserDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    details();
  }, []);

  const handleOpenUserDetails = (data) => {
    navigate(`/userInfo/${data?._id}`, { state: data });
  };

  const columns = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      header: "Actions",
      accessorKey: "actions",
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
    <Box
      sx={{ flexGrow: 1 }}
      style={{
        background: "linear-gradient(45deg , #0bd2de , #0083f9)",
        justifyContent: "center",
        display: "flex",
        height: "100%",
        width: "100%",
        padding: "20px",
        marginTop: "-1px",
      }}
    >
      {allUserDetails?.data && (
        <>
          <div style={{ width: "95%" }}>
            <WMTable
              columns={columns}
              data={allUserDetails?.data}
              tableTitle={"All Users"}
            />
          </div>
        </>
      )}
    </Box>
  );
}
