import React, { useEffect, useState } from "react";
import { IP } from "./constants";

export default function Exercises() {
  const [htmlContent, setHtmlContent] = useState(""); // State to store the HTML content

  const handleSeeExercises = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/view/exercise`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const html = await response.text(); // Get the HTML content from the response
      setHtmlContent(html); // Update the state with the HTML content
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(()=> {
    handleSeeExercises();
  },[])

  return (
    <div>
      {/* <button onClick={() => handleSeeExercises()}>
        Proceed to Exercises
      </button> */}
      {/* Display the HTML content */}
      {htmlContent && (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
      )}
    </div>
  );
}
