import React, { useState } from "react";
import { ltcInfo } from "../dummy/ltcInfos";
import PendingTable from "../components/PendingTable";
import { useEffect } from "react";

export default function PendingApplication() {
  const [pendingList, setPendingList] = useState([]);

  const getData = () => {
    fetch("/api/listPendingLTCApplication", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setPendingList(data));
  };

  console.log(pendingList);
  useEffect(() => {
    getData();
  }, []);
  // getData();
  //   return <>Pending Application</>;

  return (
    <div className="bg-yellow-50 h-screen overflow-auto">
      <PendingTable data={pendingList}  />
    </div>
  );
}
