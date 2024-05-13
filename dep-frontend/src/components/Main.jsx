import React from "react";
import { Route, Routes } from "react-router";
import NewApplication from "../pages/NewApplication.jsx";
import LiveApplication from "../pages/LiveApplication.jsx";
import DoneLTC from "../pages/DoneLTC.jsx";
import PastApplication from "../pages/PastApplication.jsx";
import PendingApplication from "../pages/PendingApplication.jsx";
import ReviewApplication from "../pages/ReviewApplication.jsx";
import EstabSubmission from "../pages/EstabSubmission.jsx";
import AccountsSubmission from "../pages/AccountsSubmission.jsx";
import HodSubmission from "../pages/HodSubmission.jsx";
import DeanSubmission from "../pages/DeanSubmission.jsx";
import RegistrarSubmission from "../pages/RegistrarSubmission.jsx";
import AuditSubmission from "../pages/AuditSubmission.jsx";
import NewTaApplication from "../pages/NewTaApplication.jsx";
import PendingTaApplication from "../pages/PendingTaApplication.jsx";
import EstabTaSubmission from "../pages/EstabTaSubmission.jsx";
import HodTaSubmission from "../pages/HodTaSubmission.jsx";
import AccountsTaSubmission from "../pages/AccountsTaSubmission.jsx";
import AuditTaSubmission from "../pages/AuditTaSubmission.jsx";
import DeanTaSubmission from "../pages/DeanTaSubmission.jsx";
import RegistrarTaSubmission from "../pages/RegistrarTaSubmission.jsx";
import LiveTaApplication from "../pages/LiveTaApplication.jsx";
import ShowUserApplication from "../pages/ShowUserApplication.jsx";
import ShowUserTaApplication from "../pages/ShowUserTaApplication.jsx";
import NotificationPage from "../pages/NotificationPage.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import OfficeOrder from "./OfficeOrder.jsx";
import ListOfficeOrders from "../pages/ListOfficeOrders.jsx";
import AdminAddUser from "../pages/AdminAddUser.jsx";
import CsvDelete from "../pages/CsvDelete.jsx";
import CsvUpload from "../pages/CsvUpload.jsx";
import ViewUser from "../pages/Viewuser.jsx";
import AdminDisplayUser from "../pages/Admindisplayuser.jsx";
import Applicant from "../pages/Applicant.jsx"
import LandingPage from "./nonApplicantlanding.jsx";
import ListOfficeOrderApplicant from "../pages/ListOfficeOrderApplicant.jsx"
import ReviewTaApplication from "../pages/ReviewTaApplication.jsx";
import ShowUpdateUserApplication from "../pages/ShowUpdateUserApplication.jsx";
import UpdateApplication from "../pages/UpdateApplication.jsx";
import ShowUpdateUserTaApplication from "../pages/ShowUpdateUserTaApplication.jsx";
import UpdateTaApplication from "../pages/UpdateTaApplication.jsx";
import TAOfficeOrder from "./TAOfficeOrder.jsx";
import Approvedta from "./approvedta.jsx";
import Approvedltc from "./approvedltc.jsx";
import OfficiatingDetails from "../pages/OfficiatingDetails.jsx";

export default function Main() {
  return (
    <Routes>
      <Route path="admin">
        <Route path="adduser" element={<AdminAddUser />} />
        <Route path="deleteuser" element={<CsvDelete />} />
        {/* <Route path="addusercsv" element={<CsvUpload/>} /> */}
        <Route path="userdisplay" element={<AdminDisplayUser />} />
        <Route path="userdisplay1">
          <Route path="view-user/:email" element={<ViewUser />} />
        </Route>
      </Route>
      <Route path="landing" element={<LandingPage/>}/>
      <Route path="officeOrder" element={<ListOfficeOrders />} />
      <Route path="officeOrder/view" element={<OfficeOrder/>} />
      <Route path="officeOrderTa/view" element={<TAOfficeOrder/>} />
      <Route path="notification" element={<NotificationPage />} />
      <Route path="view/complete">
          <Route path=":id" element={<ReviewApplication/>}/>
      </Route>
      <Route path="view/completeta">
          <Route path=":id" element={<ReviewTaApplication/>}/>
      </Route>
      <Route path="applicant" element={<Applicant />} />
      <Route path="applicant">
        <Route path="officeOrder" element={<ListOfficeOrderApplicant/>}/>
        <Route path="new" element={<NewApplication />} />
        <Route path="live" element={<LiveApplication />} />
        <Route path="update" >
          <Route path=":id" element={<UpdateApplication />} />
        </Route>
        
        <Route path="view/update">
          <Route path=":id" element={<ShowUpdateUserApplication/>}/>
        </Route>
        <Route path="view">
          <Route path=":id" element={<ShowUserApplication />} />
        </Route>

        <Route path="newTa/:ltcId" element={<NewTaApplication />} />
        <Route path="newTa" element={<DoneLTC />} />
        <Route path="liveTa" element={<LiveTaApplication />} />
        
        <Route path="viewTa">
          <Route path=":id" element={<ShowUserTaApplication />} />
        </Route>
        <Route path="view/updateTa">
          <Route path=":id" element={<ShowUpdateUserTaApplication/>}/>
        </Route>
        <Route path="updateTa/:ltcId" element={<UpdateTaApplication />}/>
      </Route>

      <Route path="establish">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<EstabSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<EstabTaSubmission />} />
        </Route>
      </Route>
      <Route path="accounts">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<AccountsSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<AccountsTaSubmission />} />
        </Route>
      </Route>
      <Route path="hod">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<HodSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<HodTaSubmission />} />
        </Route>
        <Route path="officiating/details" element={< OfficiatingDetails/>}/>
      </Route>
      <Route path="audit">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<AuditSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<AuditTaSubmission />} />
        </Route>
      </Route>
      <Route path="dean">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<DeanSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<DeanTaSubmission />} />
        </Route>
      </Route>
      <Route path="registrar">
        <Route path="pending" element={<PendingApplication />} />
        <Route path="view">
          <Route path=":id" element={<RegistrarSubmission />} />
        </Route>
        <Route path="pendingTa" element={<PendingTaApplication />} />
        <Route path="viewTa">
          <Route path=":id" element={<RegistrarTaSubmission />} />
        </Route>
      </Route>
      <Route path="avatar" element={<UserProfile />} />

      <Route path="approvedltc" element={<Approvedltc />} />
      <Route path="approvedTa" element={<Approvedta/>}/>
      <Route path="approvedltc">
        <Route path="view">
          <Route path=":id" element={<ShowUserApplication />} />
        </Route>
        <Route path="view/complete">
          <Route path=":id" element={<ReviewApplication />} />
        </Route>
      </Route>
      <Route path="approvedTa">
        <Route path="viewTa">
          <Route path=":id" element={<ShowUserTaApplication />} />
        </Route>
        <Route path="view/complete">
          <Route path=":id" element={<ReviewTaApplication />} />
        </Route>
      </Route>
    </Routes>
  );
}
