import React from "react";
import OfficeOrderTable from "../components/OfficeOrderTable";
import { useState } from "react";
import { useEffect } from "react";
import OfficeOrderApplicant from "../components/OfficeOrderApplicant"

export default function ListOfficeOrderApplicant() {
  const [LTCOfficeOrders, setLTCOfficeOrders] = useState([]);
  const [TAOfficeOrders, setTAOfficeOrders] = useState([]);
  console.log(TAOfficeOrders);
  const handleLTCList = (data) => {
    setLTCOfficeOrders(data);
  };
  const handleTAList = (data) => {
    setTAOfficeOrders(data);
  };

  useEffect(() => {
    fetch("/api/listLTCOfficeOrders", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(handleLTCList);

    fetch("/api/listTAOfficeOrders", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(handleTAList);
  }, []);

  return (
    <div className="bg-yellow-50 h-screen overflow-auto">
      <div className="flex flex-col space-y-8 py-4">
        <OfficeOrderApplicant
          data={LTCOfficeOrders}
          formType="ltc"
          name="LTC Office Orders"
        />
        <OfficeOrderApplicant
          data={TAOfficeOrders}
          formType="ta"
          name="TA Office Orders"
        />
      </div>
    </div>
  );
}
