import React from "react";
import "../ApplicantPage.css";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen bg-[url('../../About_IIT_Ropar_banner_d0c869852d.webp')] bg-cover bg-center">
      <div className="flex flex-col items-center justify-center  mb-auto text-black flex-1">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome to the LTC Portal IIT Ropar
        </h1>
        <p className="text-lg text-center mb-8">
          Explore pending Leave Travel Concession (LTC) and Travel Allowance (TA)
          applications. Review and take action by forwarding or rejecting
          applications.
        </p>
        <p className="text-lg text-center mb-8">
          Your role is crucial in ensuring smooth leave and travel processes for
          our employees.
        </p>
      </div>
      <footer className="text-sm text-center py-1" style={{ backgroundColor: '#42b0f5' }}>
        <p>&copy; 2024 Leave Travel Concession App. All rights reserved.</p>
      </footer>
      {/* <footer className="font-bold text-center mt-8">
        <p>&copy; 2024 Leave Travel Concession App. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default LandingPage;
