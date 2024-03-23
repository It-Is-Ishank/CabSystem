import React from "react";
import CabBookingForm from "../common/components/CabBookingForm"; 

const Home = () => {
  return (
    <div className="flex justify-center  md:gap-0 gap-4 " > {/* Container */}
      <div> {/* Adjust the width as needed, set flex direction to column and align items to the start (left) */}
        <CabBookingForm />
      </div>
    </div>
  );
};

export default Home;
