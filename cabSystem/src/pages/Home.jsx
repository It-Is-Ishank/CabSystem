import React from "react";
import Graph from "../common/components/Graph";
import CabBookingForm from "../common/components/CabBookingForm"; 

const Home = () => {
  return (
    <div className="flex justify-start md:flex-row flex-col md:gap-0 gap=4"> {/* Container */}
      <div className="flex flex-col justify-center items-start"> {/* Adjust the width as needed, set flex direction to column and align items to the start (left) */}
        <CabBookingForm />
      </div>
    </div>
  );
};

export default Home;
