import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Modal from "./Modal";
import OfficeOrder from "./OfficeOrder";
import SearchIcon from '@mui/icons-material/Search';
// import Modal from "./Modal"
// import AdminForm from "./AdminForm";

let stageName = [
  "Rejected by  ",
  "Pending HOD",
  "Pending Establishment Jr.Assistant",
  "Pending Establishment Superintendent",
  "Pending Establishment DR",
  "Pending Accounts JAA",
  "Pending Accounts AO",
  "Pending Accounts DR",
  "Pending Audit DA",
  "Pending Audit AO",
  "Pending Sr.Audit Officer",
  "Pending Registrar",
  "Pending Dean",
];
let stageName1 = [
  "Rejected by  ",
  "HOD",
  "Establishment Jr.Assistant",
  "Establishment Superintendent",
  "Establishment DR",
  "Accounts JAA",
  "Accounts AO",
  "Accounts DR",
  "Audit DA",
  "Audit AO",
  "Sr.Audit Officer",
  "Registrar",
  "Dean",
];

function LiveTable(props) {
  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailFilter(e.target.value);
  };
  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
    }, 500); 
  }, [nameFilter, emailFilter, sortOrder]);
  const filterData = [...props.data]
    .sort((a, b) => (new Date(a.fillDate) - new Date(b.fillDate)) * sortOrder)
    .filter((item) =>
      (item.user.firstName + " " + item.user.lastName).includes(nameFilter)
    )
    .filter((item) => item.user.emailId.includes(emailFilter));

  return (
    <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-screen-xl mx-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="2xl:text-lg text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Application Id
            </th>
            {/* <th>User Email</th>
            <th>Name</th> */}
            <th scope="col" className="flex-col pb-4 px-6 py-3">
              <div>Created On</div>
              <select
                className="text-lg font-medium bg-blue-200 rounded-md"
                onChange={handleOrderChange}
              >
                <option className="bg-white" value={-1}>
                  {" "}
                  Newest First{" "}
                </option>
                <option className="bg-white" value={1}>
                  {" "}
                  Oldest First{" "}
                </option>
              </select>
            </th>

            <th scope="col" className="px-6 py-3">
              Status
              {/* <input type="text" onChange={handleNameChange} />  */}
            </th>
            <th scope="col" className="px-6 py-3">
              Form
            </th>
          </tr>
        </thead>
        {filterData.map((item) => {
          return (
            <tbody key={Math.random()}>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.id}
                </th>
                {/* <td>{item.user.emailId}</td>
                <td>{item.user.firstName + " " + item.user.lastName}</td> */}
                <td className="px-6 py-4">
                  {new Date(item.fillDate).toISOString().substring(0, 10)}
                </td>
                <td className="px-6 py-4">
                  {item.stageCurrent == 100 ? (
                    <>
                      <Link
                        to={`/applicant/newTa/${item.id}`}
                        className="text-blue-500 font-semibold"
                      >
                        Fill TA
                      </Link>
                      {/* <Modal title={"LTC Office Order"}>
                        <OfficeOrder ltcInfo={item} />
                      </Modal> */}
                    </>
                  ) :
                  item.stageCurrent==0 ? (
                    <span className="text-red-500 font-bold">{stageName[item.stageCurrent]+stageName1[item.rejectedBy]}</span>
                  ) :
                  (
                    stageName[item.stageCurrent]
                  )}
                </td>
                <td className="px-6 py-4">
                {item.stageCurrent==0 ? (
                  <>
                  <Link
                    to={`/applicant/view/update/${item.id}`}
                    className="text-blue-500 font-semibold"
                  >
                    Update Application
                  </Link>
                  </>
                )
                : (
                  <>
                  <Link
                    to={`/applicant/view/${item.id}`}
                    className="text-blue-500 font-semibold"
                  >
                    View Application
                  </Link>
                  </>
                )}
                </td>
                {/* <td >
              <Modal>
                  <AdminForm itemIndex={itemIndex}/>
              </Modal>
                  </td> */}
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
    {loading ? ( // Show loading spinner if data is still loading
        <div className="flex justify-center items-center h-full">
          <CircularProgress /> {/* Loading spinner from Material-UI */}
        </div>
      ) : (<>
      {filterData.length === 0 ? (
          <div className="flex flex-row justify-center">
          <SearchIcon className="mt-2"style={{width:40,height:40}}></SearchIcon>
          <div  className="px-6 py-4 text-2xl text-center text-gray-500"style={{fontWeight:500,fontFamily:'mono'}}>
            Nothing to show
          </div>
          </div>
        ) : (
          <></>
        )
      }
      </>)
    }
 </>
  );
}

export default LiveTable;
