import Form from "../components/Form.jsx";
import InputGroup from "../components/InputGroup.jsx";
import Input from "../components/Input.jsx";
import Table from "../components/Table.jsx";
import { useRef, useState } from "react";
import EstabSubmission from "./EstabSubmission.jsx";
import AccountsSubmission from "./AccountsSubmission.jsx";
import CommentBox from "../components/CommentBox.jsx";
import ReviewTaApplication from "./ReviewTaApplication.jsx";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { taInfo } from "../dummy/taInfos.js";
import toast from "react-hot-toast";
import { ltcInfo as ltcdummy } from "../dummy/ltcInfos.js";

export default function UpdateTaApplication() {
  const [ltcInfo, setLtcInfo] = useState(ltcdummy[0]);
  const { ltcId } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [peopleInTa, setPeopleInTa] = useState(ltcInfo.peopleInvolved);
  const [journeyDetails, setJourneyDetails] = useState([]);
  const [taData, setTaData] = useState(taInfo[0]);
  const [people, setPeople] = useState([]);
  const [journey, setJourney] = useState([]);
  const [GovtOffice, setGovtOffice] = useState();
  const [OtherThanHometown, setOtherThanHometown] = useState();
  const [blockYear, setblockYear] = useState();
  // const [certificate, setCertificate] = useState({
  //   blockYear: "",
  //   OtherThanHometown: "",
  //   GovtOffice: "",
  // });
  const handleInfo = (json) => {
    setTaData(json);
    console.log(taData)
    setPeopleInTa(json.ltcInfo.peopleInvolved);
    for (let i = 0; i < json.journeyDetails.length; i++) {
      json.journeyDetails[i]["departureDate"] = new Date(
        json.journeyDetails[i]["departureDate"]
      )
        .toISOString()
        .substring(0, 10);
      json.journeyDetails[i]["arrivalDate"] = new Date(
        json.journeyDetails[i]["arrivalDate"]
      )
        .toISOString()
        .substring(0, 10);
    }

    setJourneyDetails(json.journeyDetails);
    setGovtOffice(json.GovtOffice)
    setOtherThanHometown(json.OtherThanHometown)
    setblockYear(json.blockYear)
    console.log("receipt Id");
    // for (let receiptId of json.receipts) {
    //   console.log(receiptId);
    //   addFile(receiptId);
    // }
  };
  // const handleInfo = (json) => {
  //   setLtcInfo(json);
  //   console.log(json);
  //   console.log(ltcInfo);
  //   setPeopleInTa(json.peopleInvolved);
  //   // setJourneyDetails(json.journeyDetails);
  // };
  // useEffect(() => {
  //   console.log(ltcInfo);
  // }, [ltcInfo]);

  // useEffect(() => {
  //   fetch("/api/getLTCInfo", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ ltcId: ltcId }),
  //   })
  //     .then((res) => res.json())
  //     .then(handleInfo);
  // }, []);
  useEffect(() => {
    fetch("/api/getTAInfo", {
      method: "POST",
      body: JSON.stringify({ taId: ltcId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(handleInfo);
  }, []);
  const handleTaRes = (res) => {
    if (res.status == 200) {
      navigate("/applicant/liveTa");
    } else {
      toast("You are not authorized");
    }
  };
  const totalAmount = journeyDetails.reduce(
    (sum, item) => parseInt(sum) + parseInt(item.totalFare),
    0
  );
  const taSubmitHandler = (e) => {
    const arr = [
      "name",
      "empCode",
      "payLevel",
      "Designation",
      "department",
      "date",
      "leaveFrom",
      "leaveTo",
      "advanceDrawnAmount",
      "advanceDrawnDate",
      "accountNo",
      "totalAmount",
      "certification",
    ];

    const taFormData = { ltcId: taData.ltcInfo.id };
    // console.log(ltcInfo.id)
    const inputs = e.target.querySelectorAll("input");
    // formData['name'] = inputs[0].value;
    for (let i = 0; i < 13; i++) {
      taFormData[arr[i]] = inputs[i].value;
    }
    taFormData["peopleInvolved"] = peopleInTa;
    taFormData["journeyDetails"] = journeyDetails;
    taFormData["stageCurrent"] = 1;
    taFormData["stageRedirect"] = null;
    taFormData["blockYear"] = document.querySelector(
      '[name="blockYear"]'
    ).value;
    taFormData["OtherThanHometown"] = document.querySelector(
      '[name="OtherThanHometown"]'
    ).value;
    taFormData["GovtOffice"] = document.querySelector(
      '[name="GovtOffice"]'
    ).value;

    const certificateData = {
      blockYearFamily: taFormData["blockYear"],
      OtherThanHometown: taFormData["OtherThanHometown"],
      GovtOffice: taFormData["GovtOffice"],
    };
    
    const requestData = {
      ...taFormData,
      ...certificateData,
    };

    let fd = new FormData();
    fd.append("json", JSON.stringify(requestData));
    for (let image of imageRef.current.files) {
      fd.append("file", image);
    }

    fetch("/api/updateNewTAApplications", {
      method: "POST",
      body: fd,
    }).then(handleTaRes);
  };
  let advanceTotal = 0;
  if (ltcInfo.advanceRequired)
    advanceTotal =
      0.9 *
      ltcInfo.expectedJourneyDetails.reduce(
        (sum, item) => sum + item.singleFare * item.noOfFares,
        0
      );
  return (
    <div className="bg-yellow-50 h-screen">
      <div className="max-w-screen-xl mx-auto">
        <h3 className="font-semibold text-xl text-gray-900 p-4 flex">
         Update TA Application
        </h3>
        <Form onSubmit={taSubmitHandler}>
          <InputGroup>
            <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
              <Input
                label={"Name"}
                name="name"
                type="text"
                value={taData.user.firstName +" "+ taData.user.lastName}
                required
              />
              {/* <Input label={"Emp. Code"} name="empCode" type="number" value={ltcInfo.user.id} /> */}
              <Input
                label={"Pay Level"}
                name="payLevel"
                type="number"
                value={taData.user.paylevel}
                required
              />
              <Input
                label={"Designation"}
                name="Designation"
                type="text"
                value={taData.user.designation}
                required
              />
              <Input
                label={"Department"}
                name="department"
                type="text"
                value={taData.user.department}
                required
              />
              <Input
                label={"Date of Joining"}
                name="date"
                type="date"
                value={new Date(taData.user.dateOfJoining)
                  .toISOString()
                  .substring(0, 10)}
                required
              />
            </div>
            <h3 className="font-semibold text-l text-gray-900 m-4 flex">
              Leave Details
            </h3>
            <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
              {" "}
              {/* <Input label={"Earned Leave Availed"} name="earnedLeave" type="number" /> */}
              <Input
                label={"From"}
                name="leaveFrom"
                type="date"
                value={new Date(taData.ltcInfo.fromDate)
                  .toISOString()
                  .substring(0, 10)}
                required
              />
              <Input
                label={"To"}
                name="leaveTo"
                type="date"
                value={new Date(taData.ltcInfo.toDate).toISOString().substring(0, 10)}
                required
              />
              {/* <h3>Prefix Details</h3>
            <Input label={"From"} name="prefixFrom" type="date" />
            <Input label={"To"} name="prefixTo" type="date" />
            <h3>Suffix Details</h3>
            <Input label={"From"} name="suffixFrom" type="date" />
            <Input label={"To"} name="suffixTo" type="date" /> */}
              {/* <Input
              label={"Spouse Entitled for LTC"}
              name="spouseEntitled"
              type="checkbox"
            /> */}
              <Input
                label={"Advance Drawn"}
                name="advanceRequired"
                type="number"
                value={advanceTotal}
                disabled={!taData.ltcInfo.advanceRequired}
              />
              <Input
                label={"Advance Drawn Date"}
                name="advanceDrawnDate"
                type="date"
                required={taData.ltcInfo.advanceRequired}
                disabled={!taData.ltcInfo.advanceRequired}
              />
              {/* <Input label={"Home Town"} name="homeTown" type="text" /> */}
              {/* <Input
                label={"Bank Account No. (SBI/Any other):"}
                name="accountNo"
                type="number"
                value={ltcInfo.accountNo}
              /> */}
              {/* <Input
              label={"Nature of Visiting Place"}
              name="visitNature"
              type="text"
            />
            <Input label={"Visiting Place"} name="visitPlace" type="text" />
            <Input
              label={"Total Estimated Fare"}
              name="estimatedFare"
              type="number"
            /> */}
            </div>
          </InputGroup>

          <InputGroup>
            <h3 className="font-semibold text-l text-gray-900 m-4 flex">
              Particulars of the claimant and family in respect of whom the
              Leave Travel Concession has been claimed:
            </h3>
            <Table
              fields={[
                { heading: "Name", type: "text" },
                { heading: "Age", type: "number" },
                { heading: "Relation", type: "text" },
                // { heading: "From", type: "text" },
                // { heading: "To", type: "text" },
                // { heading: "Back", type: "checkbox" },
                // { heading: "Mode Of Travel", type: "text" },
              ]}
              data={peopleInTa}
              setData={setPeopleInTa}
            />
            {/* <Input
              label={"Advance Required"}
              name="advanceRequired"
              type="checkbox"
            />
            <h3>Details for Encashment of Earned Leave</h3>
            <Input
              label={"Encashment Required"}
              name="encashment"
              type="checkbox"
            />
            <Input label={"No. of Days"} name="encashmentDays" type="number" /> */}

            <h3 className="font-semibold text-l text-gray-900 m-4 flex">
              Details of journey(s) performed by Government Employee and the
              members of his/her family:
            </h3>
            <Table
              fields={[
                {
                  heading: "Departure Date",
                  type: "date",
                  stateKey: "departureDate",
                },
                {
                  heading: "Departure From",
                  type: "text",
                  stateKey: "departureFrom",
                },
                {
                  heading: "Arrival Date",
                  type: "date",
                  stateKey: "arrivalDate",
                },
                { heading: "Arrival To", type: "text", stateKey: "arrivalTo" },
                {
                  heading: "Distance in Kms",
                  type: "number",
                  stateKey: "distance",
                },
                {
                  heading: "Mode Of Travel",
                  type: "text",
                  stateKey: "modeOfTravel",
                },
                {
                  heading: "Class of Travel",
                  type: "text",
                  stateKey: "classOfTravel",
                },
                {
                  heading: "No. of Fares",
                  type: "number",
                  stateKey: "noOfFares",
                },
                {
                  heading: "Total Fare Paid",
                  type: "number",
                  stateKey: "totalFare",
                },
                {
                  heading: "Ticket No./PNR/Remarks",
                  type: "text",
                  stateKey: "ticketNo",
                },
              ]}
              data={journeyDetails}
              setData={setJourneyDetails}
            />
            <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
              <Input
                label={"Total"}
                name="totalAmount"
                type="number"
                value={totalAmount}
              />
            </div>
            <h3 className="font-semibold text-l text-gray-900 m-4 flex flex-col">
              Attach Proof here:
              <input ref={imageRef} name="file" type="file" multiple />
            </h3>
            {/* <h3 className="font-semibold text-l text-gray-900 m-4 flex">
              CERTIFIED THAT:
            </h3> */}
            {/* <div className="flex ml-4 justify-start space-x-10 items-center my-8">
              <p className="font-semibold">
                The information, as given above is true to the best of my
                knowledge and belief
              </p>
              <Input name="certification" type="checkbox" required />
            </div> */}
            {/* <div className="flex ml-4 justify-center space-x-10 items-center py-4">
              <Input
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                type="submit"
              />
            </div> */}
          </InputGroup>

          <div className="ml-4">
            <p className="mt-8 text-center underline font-semibold">
              CERTIFICATE TO BE GIVEN BY THE GOVERNMENT EMPLOYEE
            </p>
            <ol className="mb-4 list-decimal">
              <div className="flex flex-row">
                <li className="mt-2 mb-2">
                  I have not submitted any other claim so far for leave travel
                  Concession in respect of myself or my family members in
                  respect of the block year
                </li>
                <Input
                  name="blockYear"
                  type="number"
                  iscompulsory={true}
                  required
                  value={blockYear}
                  onChange={(e) => {setblockYear(e.target.value)}}
                />
              </div>

              <li className="mt-2 mb-2">
                I have already drawn T.A. for the Leave Travel Concession in
                respect of a Journey performed by me/with my spouse/ with
                children. This claim is in respect of the journey performed by
                my spouse/ myself with my spouse/ and/or children / none of whom
                travelled with the party on the earlier occasion.
              </li>
              <div className="flex flex-row gap-4">
                <li className="mt-2 mb-2">
                  The journey has been performed by me and my spouse with Family
                  members to the declared “Home Town” / Other than Home Town
                  viz.
                </li>
                <Input
                  name="OtherThanHometown"
                  type="text"
                  iscompulsory={true}
                  required
                  value={OtherThanHometown}
                  onChange={(e) => {setOtherThanHometown(e.target.value)}}
                />
              </div>
              <div className="flex flex-row gap-4">
                <li className="mt-2 mb-2">
                  Certified that my spouse for whom LTC is claimed by me is
                  employed in name of the Govt Office/Public Sector
                  undertaking/Corporation/Autonomous body etc. which provides
                  Leave Travel Concession facilities but he/she has nor
                  preferred and will not claim in this behalf to his/her
                  employer.
                </li>
                <Input
                  name="GovtOffice"
                  type="text"
                  iscompulsory={true}
                  required
                  value={GovtOffice}
                  onChange={(e) => {setGovtOffice(e.target.value)}}
                />
              </div>
              <li className="mt-2 mb-2">
                Certified that my spouse for whom Leave Travel Concession is
                claimed by me is not employed in any Govt Office/ Public Sector
                Undertaking/ Corporation/ Autonomous Body financed wholly or
                partly by the Central Government or a local body which provides
                LTC facilities to its employees and their families.
              </li>
            </ol>
          </div>
          <div className="ml-4">
            <p className="mt-4 text-right font-bold">ANNEXURE-A</p>
            <p className="mt-4 text-center underline font-bold">UNDERTAKING</p>
            <p className="mt-4 text-left underline font-semibold">
              (To be submitted in all cases of air travel where the Government
              of India bears the cost of air passage)
            </p>
            <p className="mt-4 text-left">
              Ref: Dept. of Expenditure, Ministry of Finance, Govt of India O.M.
              No. 19024/ 03/2021-E.IV dated 31-12-2021, O.M. No. 19024/
              03/2021-E.IV dated 16-02-2022 and O.M.No. 19024/03/2021-E.IV dated
              16-06-2022, as amended from time to time.
            </p>
            <p className="mt-4 text-left">I certify that:</p>
            <div className="ml-4">
              <ol className="mb-4 list-decimal">
                <div className="flex flex-row">
                  <li className="mt-2 mb-2">
                    I have purchased the air tickets from one of the the
                    following three Authorized Travel Agents viz.
                  </li>
                  <select
                    id="travel_companies"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected required>
                      Choose a company
                    </option>
                    <option value="">
                      M/s Balmer Lawrie & Company Limited(BLCL)
                    </option>
                    <option value="">M/s Ashok Travels & Tours(ATT)</option>
                    <option value="">
                      Indian Railways Catering and Tourism Corporation
                      ltd.(IRCTC)
                    </option>
                  </select>
                </div>
                <li className="mt-2 mb-2">
                  Further, I have opted for the 'Best available fare' on the
                  date of booking on the basis of tour programmed as per my
                  entitlement.
                </li>
                <li className="mt-2 mb-2">
                  I have booked the Non-stop flight in a given slot at the time
                  of booking.
                </li>
                <li className="mt-2 mb-2">
                  I have not booked the tickets within less than 72 hours of
                  intended travel on Tour, if booked Self declared justification
                  is provided.
                </li>
                <li className="mt-2 mb-2">
                  I have fulfilled other terms and conditions mentioned in above
                  referred Govt. of India instructions on the matter, as amended
                  from time to time.
                </li>
              </ol>
            </div>
          </div>
          <div className="flex ml-4 justify-start space-x-10 items-center my-3">
            <p className="font-semibold">
              The information, as given above is true to the best of my
              knowledge and belief
            </p>
            <Input
              name="certification"
              type="checkbox"
              iscompulsory={true}
              required
            />
          </div>
          <div className="flex ml-4 justify-center space-x-10 items-center py-4">
            <Input
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              type="submit"
            />
          </div>
        </Form>
        {/* <EstabSubmission /> */}
        {/* <AccountsSubmission /> */}
        {/* <CommentBox /> */}

        {/* <ReviewTaApplication /> */}
      </div>
    </div>
  );
}
