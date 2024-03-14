import React from "react";
import Graph from "../common/components/Graph";
import CabBookingForm from "../common/components/CabBookingForm"; 

const Home = () => {
  console.log("home");
  return (
    <div className="flex justify-start md:flex-row flex-col md:gap-0 gap=4"> {/* Container */}
      <div className="flex flex-col justify-center items-start"> {/* Adjust the width as needed, set flex direction to column and align items to the start (left) */}
        <CabBookingForm />
      </div>
      <div className="flex justify-center items-center"> {/* Adjust the width as needed, center the content */}
        <Graph />
      </div>
    </div>
  );
};

export default Home;
