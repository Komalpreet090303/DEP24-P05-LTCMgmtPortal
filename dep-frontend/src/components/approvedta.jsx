import React from "react";
import LiveTable from "../components/LiveTable";
import { useState, useEffect } from "react";
import { taInfo } from "../dummy/taInfos";
import Approvedtatable from "./approvedtatable";

export default function Approvedta() {
  const [liveApplications, setLiveApplications] = useState([]);
  const handleList = (data) => {
    setLiveApplications(data);
  };
  useEffect(() => {
    fetch("/api/approvedta", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(handleList);
  }, []);
  return (
    <div className="bg-yellow-50 h-screen overflow-y-hidden">
      {/* h-[88vh] */}
      <Approvedtatable data={liveApplications} />;
    </div>
  );
}
