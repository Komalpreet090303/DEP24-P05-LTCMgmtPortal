import Form from "../components/Form.jsx";
import InputGroup from "../components/InputGroup.jsx";
import Input from "../components/Input.jsx";
import Table from "../components/Table.jsx";
import { useContext, useRef, useState, useEffect } from "react";
import EstabSubmission from "./EstabSubmission.jsx";
import AccountsSubmission from "./AccountsSubmission.jsx";
import CommentBox from "../components/CommentBox.jsx";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { LoginContext } from "../LoginContext.jsx";
import {
  ColorSwatchIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import Avatar from "@mui/material/Avatar";
import InfoIcon from "@mui/icons-material/Info";

export default function NewApplication() {
  const [user, setUser] = useContext(LoginContext);
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();
  const [dates, setDates] = useState([]);

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [suffixFrom, setSuffixFrom] = useState();
  const [suffixTo, setSuffixTo] = useState();
  const [prefixFrom, setPrefixFrom] = useState();
  const [prefixTo, setPrefixTo] = useState();
  const [encash, setEncash] = useState();

  console.log("FROM", from);
  console.log("TO", to);

  const handleFrom = (e) => {
    setFrom(e.target.value);
    const fromDate = e.target.value;
    if (fromDate && to && new Date(fromDate) - new Date(to) > 0) {
      toast.error("Journey 'From Date' should be less than 'To Date'", {
        duration: 3000,
      });
    }
  };
  const handleTo = (e) => {
    setTo(e.target.value);
    const toDate = e.target.value;
    if (from && toDate && new Date(from) - new Date(toDate) > 0) {
      toast.error("Journey 'From Date' should be less than 'To Date'", {
        duration: 3000,
      });
    }
  };
  const handleSuffixFrom = (e) => {
    setSuffixFrom(e.target.value);
    const suffixFromDate = e.target.value;
    if (
      suffixFromDate &&
      suffixTo &&
      new Date(suffixFromDate) - new Date(suffixTo) > 0
    ) {
      toast.error(
        "Journey 'Suffix From Date' should be less than 'Suffix To Date'",
        { duration: 3000 }
      );
    }
    if (to && suffixFromDate && new Date(to) - new Date(suffixFromDate) > 0) {
      toast.error("Journey 'To Date' should be less than 'Suffix From Date'", {
        duration: 3000,
      });
    }
  };
  const handleSuffixTo = (e) => {
    setSuffixTo(e.target.value);
    const suffixToDate = e.target.value;
    if (
      suffixFrom &&
      suffixToDate &&
      new Date(suffixFrom) - new Date(suffixToDate) > 0
    ) {
      toast.error(
        "Journey 'Suffix From Date' should be less than 'Suffix To Date'",
        { duration: 3000 }
      );
    }
  };
  const handlePrefixFrom = (e) => {
    setPrefixFrom(e.target.value);
    const prefixFromDate = e.target.value;
    if (
      prefixFromDate &&
      prefixTo &&
      new Date(prefixFromDate) - new Date(prefixTo) > 0
    ) {
      toast.error(
        "Journey 'Prefix From Date' should be less than 'Prefix To Date'",
        { duration: 3000 }
      );
    }
  };
  const handlePrefixTo = (e) => {
    setPrefixTo(e.target.value);
    const prefixToDate = e.target.value;
    if (
      prefixFrom &&
      prefixToDate &&
      new Date(prefixFrom) - new Date(prefixToDate) > 0
    ) {
      toast.error(
        "Journey 'Prefix From Date' should be less than 'Prefix To Date'",
        { duration: 3000 }
      );
    }
    if (prefixToDate && from && new Date(prefixToDate) - new Date(from) > 0) {
      toast.error("Journey 'Prefix To Date' should be less than 'From Date'", {
        duration: 3000,
      });
    }
  };
  const handleEncash = (e) => {
    setEncash(e.target.checked);
  };

  var x = from && to && new Date(from) - new Date(to) > 0;
  var y =
    prefixFrom && prefixTo && new Date(prefixFrom) - new Date(prefixTo) > 0;
  var z =
    suffixFrom && suffixTo && new Date(suffixFrom) - new Date(suffixTo) > 0;
  var u = prefixTo && from && new Date(prefixTo) - new Date(from) > 0;
  var v = to && suffixFrom && new Date(to) - new Date(suffixFrom) > 0;
  var w = encash;

  // if (from && to && new Date(from) - new Date(to) > 0) {
  //   toast.error("Journey 'From Date' should be less than 'To Date'");
  // }
  // if (prefixFrom && prefixTo && new Date(prefixFrom) - new Date(prefixTo) > 0) {
  //   toast.error("Journey 'Prefix From Date' should be less than 'Prefix To Date'");
  // }
  // if (suffixFrom && suffixTo && new Date(suffixFrom) - new Date(suffixTo) > 0) {
  //   toast.error("Journey 'Suffix From Date' should be less than 'Suffix To Date'");
  // }
  // if (prefixTo && from && new Date(prefixTo) - new Date(from) > 0) {
  //   toast.error("Journey 'Prefix To Date' should be less than 'From Date'");
  // }
  // if (to && suffixFrom && new Date(to) - new Date(suffixFrom) > 0) {
  //   toast.error("Journey 'To Date' should be less than 'Suffix From Date'");
  // }

  const handleSelect = (dates) => {
    setDates(dates);
  };
  const imageRef = useRef(null);
  const [isInfoVisible1, setIsInfoVisible1] = useState(false);
  const [infoText1, setInfoText1] = useState(
    "Enter weekend or holiday Dates preceding your leave dates if applicable."
  );
  const [isInfoVisible2, setIsInfoVisible2] = useState(false);
  const [infoText2, setInfoText2] = useState(
    "Enter weekend or holiday Dates following your leave dates if applicable."
  );

  // Function to handle click on the information icon
  const handleInfoClick1 = (text) => {
    setInfoText1(text);
    setIsInfoVisible1(true);
  };

  // Function to hide the information
  const hideInfo1 = () => {
    setIsInfoVisible1(false);
  };

  const handleInfoClick2 = (text) => {
    setInfoText2(text);
    setIsInfoVisible2(true);
  };

  // Function to hide the information
  const hideInfo2 = () => {
    setIsInfoVisible2(false);
  };

  const handleRes = (res) => {
    if (res.status == 200) {
      navigate("/applicant/live");
    } else {
      toast("You are not authorized");
    }
  };

  const ltcSubmitHandler = (e) => {
    console.log(x);
    const arr = [
      "name",
      "designation",
      "date",
      "paylevel",
      "earnedLeaveAvailed",
      "fromDate",
      "toDate",
      "prefixFrom",
      "prefixTo",
      "suffixFrom",
      "suffixTo",
      "homeTown",
      "natureOfTravel",
      "placeToVisit",
      "totalEstimatedFare",
      "spouseEntitled",
      "advanceRequired",
      "encashmentAvailed",
      "encashmentNoOfDays",
      "certification",
    ];

    toast.success("Application Submitted");

    const formData = {};
    const inputs = e.target.querySelectorAll("input");
    // formData['name'] = inputs[0].value;
    for (let i = 0; i < 16; i++) {
      formData[arr[i]] = inputs[i].value;
    }

    // const d1=inputs[5].value;
    // const d2=inputs[6].value;

    formData["advanceRequired"] = document.querySelector(
      '[name="advanceRequired"]'
    ).checked;
    formData["encashmentAvailed"] = document.querySelector(
      '[name="encashment"]'
    ).checked;
    formData["encashmentNoOfDays"] = document.querySelector(
      '[name="encashmentDays"]'
    ).value;
    formData["certification"] = document.querySelector(
      '[name="certification"]'
    ).value;

    formData["peopleInvolved"] = people;
    formData["stageCurrent"] = 1;
    formData["stageRedirect"] = null;
    formData["blockYear"] = document.querySelector(
      '[name="blockYearspouse"]'
    ).value;

    // a =
    let fd = new FormData();
    fd.append("json", JSON.stringify(formData));
    for (let image of imageRef.current.files) {
      fd.append("file", image);
    }
    fetch("/api/createNewLTCApplications", {
      method: "POST",
      body: fd,
    }).then(handleRes);
  };

  return (
    // className="bg-[url('../../public/About_IIT_Ropar_banner_d0c869852d.webp')] bg-cover bg-center"
    <div className="bg-yellow-50 h-screen overflow-auto">
      <div className="max-w-screen-xl mx-auto">
        <h3 className="font-semibold text-xl text-gray-900 p-4 flex mx-auto">
          New Application
        </h3>
        <Form
          disabled={x || y || z || u || v ? true : false}
          onSubmit={ltcSubmitHandler}
        >
          <InputGroup>
            <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
              <Input
                label={"Name"}
                name="name"
                type="text"
                value={`${user.firstName} ${user.lastName}`}
                required
              />
              <Input
                label={"Designation"}
                name="Designation"
                type="text"
                value={user.designation}
                required
              />
              <Input
                label={"Date of Joining"}
                name="date"
                type="date"
                value={new Date(user.dateOfJoining)
                  .toISOString()
                  .substring(0, 10)}
                required
              />
              <Input
                label={"Pay Level"}
                name="payLevel"
                type="number"
                value={user.payLevel}
                required
              />
            </div>
            <h3 className="font-semibold text-l m-4 text-gray-900">
              Leave Details
            </h3>
            <div
              className="m-4 grid gap-6 mb-1  2 xl:grid-cols-4"
            >
              {/* <DateRangePicker label="Journey Duration"/> */}
              {/* <DateRangePicker onSelect={handleSelect} value={dates} /> */}
              <Input
                label={"Earned Leave Availed"}
                name="earnedLeave"
                type="number"
                iscompulsory={true}
                required
              />
              <Input
                label={"From"}
                name="leaveFrom"
                type="date"
                iscompulsory={true}
                onChange={handleFrom}
                required
              />
              <Input
                label={"To"}
                name="leaveTo"
                type="date"
                iscompulsory={true}
                onChange={handleTo}
                required
              />
            </div>
            <div className="flex">
              <h3 className="font-semibold w-50 text-l m-4 text-gray-900">
                Prefix Details
              </h3>
              <span
                className="flex items-center relative"
                onMouseEnter={() => {
                  setIsInfoVisible1(true);
                }}
                onMouseLeave={hideInfo1}
              >
                {/* <InformationCircleIcon className="h-5 w-5 text-gray-400 mr-1 cursor-pointer" onClick={() => handleInfoClick1("Enter weekend Dates preceding your leave dates if applicable.")}></InformationCircleIcon> */}
                <Avatar
                  sx={{ width: 21, height: 21, backgroundColor: "black" }}
                >
                  <InfoIcon
                    sx={{ color: "white" }}
                    className="text-gray-400 cursor-pointer"
                  />
                </Avatar>
                {isInfoVisible1 && (
                  <div className="flex max-h-10 whitespace-nowrap italic absolute bg-white border border-gray-300 p-2 rounded shadow-md">
                    {infoText1}
                    <button
                      onClick={hideInfo1}
                      className="absolute top-0 right-0 p-1 text-xs"
                    >
                      X
                    </button>
                  </div>
                )}
              </span>
            </div>
            <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
              <Input
                label={"From"}
                name="prefixFrom"
                type="date"
                onChange={handlePrefixFrom}
              />
              <Input
                label={"To"}
                name="prefixTo"
                type="date"
                onChange={handlePrefixTo}
              />
            </div>
            <div className="flex">
              <h3 className="font-semibold text-l m-4 text-gray-900">
                Suffix Details
              </h3>
              <span
                className="flex items-center relative"
                onMouseEnter={() => {
                  setIsInfoVisible2(true);
                }}
                onMouseLeave={hideInfo2}
              >
                {/* <InformationCircleIcon className="h-5 w-5 text-gray-400 mr-1 cursor-pointer" ></InformationCircleIcon> */}
                <Avatar
                  sx={{ width: 20, height: 20, backgroundColor: "black" }}
                >
                  <InfoIcon
                    sx={{ color: "white" }}
                    className="text-gray-400 cursor-pointer"
                  />
                </Avatar>
                {isInfoVisible2 && (
                  <div className="flex max-h-10 whitespace-nowrap italic absolute bg-white border border-gray-300 p-2 rounded shadow-md">
                    {infoText2}
                    <button
                      onClick={hideInfo2}
                      className="absolute  top-0 right-0 p-1"
                    >
                      X
                    </button>
                  </div>
                )}
              </span>
            </div>
            <div
              className="m-4 grid gap-6 mb-1 md:grid-cols-2 
            xl:grid-cols-4"
            >
              <Input
                label={"From"}
                name="suffixFrom"
                type="date"
                onChange={handleSuffixFrom}
              />
              <Input
                label={"To"}
                name="suffixTo"
                type="date"
                onChange={handleSuffixTo}
              />

              <div className="flex ml-4 justify-around items-center"></div>
            </div>
            <div
              className="m-4 grid gap-6 mb-1 md:grid-cols-2 
xl:grid-cols-4"
            >
              <Input
                label={"Home Town"}
                name="homeTown"
                type="text"
                value={user.hometown}
                required
              />
              <Input
                label={"Nature of Visiting Place"}
                name="visitNature"
                type="text"
                iscompulsory={true}
                required
              />
              <Input
                label={"Visiting Place"}
                name="visitPlace"
                type="text"
                iscompulsory={true}
                required
              />
              <Input
                label={"Total Estimated Fare"}
                name="estimatedFare"
                type="number"
                iscompulsory={true}
                required
              />
            </div>
          </InputGroup>

          <InputGroup>
            <h3 className="font-semibold text-l text-gray-900 m-4 flex">
              Details of People involved in LTC
            </h3>

            <div className="-z-50">
              <Table
                fields={[
                  { heading: "Name", type: "text" },
                  { heading: "Age", type: "number" },
                  { heading: "Relation", type: "text" },
                  { heading: "From", type: "text", stateKey: "fromPlace" },
                  { heading: "To", type: "text", stateKey: "toPlace" },
                  { heading: "Back", type: "checkbox" },
                  {
                    heading: "Mode Of Travel",
                    type: "text",
                    stateKey: "modeOfTravel",
                  },
                ]}
                data={people}
                setData={setPeople}
              />
            </div>
            <div className="flex ml-4 justify-center space-x-10 items-center my-4">
              <h3 className="font-semibold">Spouse Entitled for LTC</h3>
              <Input
                className="mt-2"
                label={""}
                name="spouseEntitled"
                type="checkbox"
              />
              <h3 className="font-semibold">Advance Required</h3>
              <span className="mt-2">
                <Input
                  className=""
                  label={""}
                  name="advanceRequired"
                  type="checkbox"
                />
              </span>
            </div>
            <h3 className="font-bold text-l m-4 text-gray-900">
              Details for Encashment of Earned Leave
            </h3>
            <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex ml-4 justify-start space-x-10 items-center my-4">
                <h3 className="font-semibold">Encashment Required</h3>
                <Input
                  className="ml-8 justify-center"
                  label={""}
                  name="encashment"
                  type="checkbox"
                  onChange={handleEncash}
                />
              </div>
              <Input
                label={"No. of Days"}
                name="encashmentDays"
                type="number"
                disabled={w ? false : true}
              />
            </div>
            <div className="ml-4">
              <p className="font-extrabold">Important Note for Air Travel:-</p>
              <ol className="font-extrabold list-[upper-roman] mb-4">
                <li className="underline mt-2 mb-2">
                  Government employees are to choose flight having the Best
                  Available Fare on their entitled travel class which is the
                  Cheapest Fare available, preferably for Non-stop flight in a 3
                  hours slot.
                </li>
                <li className="underline mt-2 mb-2">
                  At the time of booking, they are to retain the print-out of
                  the concerned webpage of the ATAs having flight and fare
                  details for the purpose of the settlement of the LTC claims.
                </li>
                <li className="underline mt-2 mb-2">
                  Air tickets shall be purchased only from the three Authorized
                  Travel Agents (ATAs) only.
                </li>
              </ol>
            </div>

            <div className="ml-4">
              <p className="mt-8 font-semibold">I undertake:-</p>
              <ol className="mb-4 list-decimal">
                <li className="mt-2 mb-2">
                  To produce the tickets for the journey within 10 days of
                  receipt of the advance.
                </li>
                <li className="mt-2 mb-2">
                  To refund the entire advance in lump sum, in the event of
                  cancellation of the journey within two months from the date of
                  drawl of the advance or failure to produce the tickets within
                  10 days of drawl the advance.
                </li>
                <li className="mt-2 mb-2">
                  To travel by Air/Rail/Road as per my entitlement and as per
                  GOI LTC rules or specific rules as adopted by the Institute
                </li>
                <li className="mt-2 mb-2">
                  I will communicate to the competent authority about any change
                  of declared place of visit or change of dates before the
                  commencement of the journey.
                </li>
              </ol>
            </div>
            <h3 className="font-semibold text-l m-4 text-gray-900">
              Attach Proof of travel here:
            </h3>
            <input
              className="mx-4"
              ref={imageRef}
              name="file"
              type="file"
              multiple
            />

            <p className="font-bold mt-4">Certified that:-</p>
            <ol className="font-semibold list-decimal mb-4">
              <li>
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
              </li>
              <li className="font-semibold">
                <div className="flex ml-4 justify-start space-x-10 items-center my-3">
                  My spouse is not employed in Government service / my spouse is
                  employed in government service and the concession has not been
                  availed of by him/her separately of himself/herself or for any
                  of the family members for the block year -
                  <Input
                    name="blockYearspouse"
                    type="number"
                    iscompulsory={true}
                    required
                  />
                </div>
              </li>
            </ol>
            <div className="flex justify-center">
              <Input
                disabled={x || y || z || u || v ? true : false}
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                type="submit"
              />
            </div>
          </InputGroup>
        </Form>
        {/* <EstabSubmission /> */}
        {/* <AccountsSubmission /> */}
        {/* <CommentBox /> */}
      </div>
    </div>
  );
}
