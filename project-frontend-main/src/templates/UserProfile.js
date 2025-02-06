import React, { useEffect, useState } from "react";
import { IP } from "./constants";
import ProfilePage from "./ProfilePage";
import RecommendationPage from "./RecommendationPage";

export default function UserProfile() {
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

  useEffect(() => {
    details();
  }, []);
  return (
    <div>
      <div>
        <h1>
          Welcome {userDetails?.data?.firstName} {userDetails?.data?.lastName} !
        </h1>
      </div>
      <ProfilePage />
      <RecommendationPage />
    </div>
  );
}
