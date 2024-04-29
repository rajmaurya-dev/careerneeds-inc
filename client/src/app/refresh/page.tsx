"use client";
// Import React and useEffect
import React, { useEffect } from "react";
import axios from "axios";

const Page = () => {
  useEffect(() => {
    const getdata = async () => {
      try {
        // Await the axios.get promise
        const response = await axios.get("api/getAiResponse");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the getdata function
    getdata();
  }, []); // Dependency array to ensure the effect runs only once

  return <div>page</div>;
};

export default Page;
