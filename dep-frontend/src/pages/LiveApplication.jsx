import React from "react";
import LiveTable from "../components/LiveTable";
import { useState, useEffect } from "react";
import { taInfo } from "../dummy/taInfos";

export default function LiveApplication() {
  const [liveApplications, setLiveApplications] = useState([]);
  const handleList = (data) => {
    setLiveApplications(data);
  };
  useEffect(() => {
    fetch("/api/listLiveLTCApplications", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(handleList);
  }, []);
  return (
    <div className="bg-yellow-50 h-screen overflow-y-auto">
{/* h-[88vh] */}
    <LiveTable data={liveApplications} />;
    </div>
  )
}
