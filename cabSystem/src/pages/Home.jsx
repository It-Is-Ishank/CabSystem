import React from "react";
import Graph from "../common/components/Graph";
import CabBookingForm from "../common/components/CabBookingForm";
import { CabCards } from "../common/components/CabCards";

const Home = () => {
  const date = new Date
  const humanReadableDate = date.toDateString()
  console.log(humanReadableDate)
  return (
    <div className="flex justify-start md:flex-row flex-col md:gap-0 gap=4">
      {" "}
      {/* Container */}
      <div className="flex flex-col justify-center items-start">
        {" "}
        {/* Adjust the width as needed, set flex direction to column and align items to the start (left) */}
        <CabBookingForm />
      </div>
      <div className="flex justify-center items-center">
        {" "}
        {/* Adjust the width as needed, center the content */}
        <Graph />
      </div>
    </div>
  );
};

export default Home;
