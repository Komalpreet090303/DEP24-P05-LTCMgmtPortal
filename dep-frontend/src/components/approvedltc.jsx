import React from "react";
import LiveTable from "../components/LiveTable";
import Approvedtable from "./approvedtable";
import { useState, useEffect } from "react";
import { taInfo } from "../dummy/taInfos";

export default function Approvedltc() {
  const [liveApplications, setLiveApplications] = useState([]);
  const handleList = (data) => {
    setLiveApplications(data);
  };
  useEffect(() => {
    fetch("/api/approvedltc", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(handleList);
  }, []);
  return (
    <div className="bg-yellow-50 h-screen overflow-y-auto">
      {/* h-[88vh] */}
      <Approvedtable data={liveApplications} />;
    </div>
  );
}
