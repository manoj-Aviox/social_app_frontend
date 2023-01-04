import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const HOC = (WComponent) => {
  return function Component() {
    return (
      <>
        <section className="flex h-screen overflow-hidden">
          <div className="w-1/5 border-r h-screen overflow-y-auto">
            <Navbar />
          </div>
          <div className="h-screen w-4/5 overflow-y-auto">
            <WComponent />
            <Footer />
          </div>
        </section>
      </>
    );
  };
};

export default HOC;
