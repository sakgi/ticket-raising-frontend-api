import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import RegistrationForm from "./components/Auth/Registration";
import ForgotPassword from './components/Auth/ForgotPassword';
import UserDashboard from "./components/UserPanel/UserDashboard";
import AdminDashboard from "./components/AdminPanel/AdminDashboard";
import SuperAdminDashboard from "./components/SuperAdminPanel/SuperAdminDashboard";
import TicketForm from './components/UserPanel/TicketCreation/TicketForm';
import TicketsTable from './components/UserPanel/TicketsTable/TicketsTable';
import FAQ from './components/UserPanel/Faq/Faq';
import Profile from './components/UserPanel/Profile/Profile';
import ChangePassword from './components/UserPanel/ChangePasword/ChangePassword';
import UserTicketDetails from './components/UserPanel/Mytickets/Mytickets';
import NotFound from './components/NotFound/NotFound';
import AdminReportGeneration from './components/AdminPanel/AdminReportGeneration/AdminReportGeneration';
import Tickets from './components/SuperAdminPanel/Tickets/Tickets';
import NewTicket from './components/SuperAdminPanel/NewTicket/NewTicket';
import Engineering from './components/SuperAdminPanel/SuperAdminEngineerManag/SuperAdminEngineerManag';
import AddEngineer from './components/SuperAdminPanel/AddEngineer/AddEngineer';
import ReportGeneration from './components/SuperAdminPanel/ReportGeneration/ReportGeneration';
import Approval from './components/SuperAdminPanel/SuperAdminMyTickets/SuperAdminMyTickets';
import TicketDetail from './components/SuperAdminPanel/TicketDetails/TicketDetails';
import ViewTicketDetails from './components/SuperAdminPanel/ViewTicketDetails/ViewTicketDetails';
import SuperAdminProfile from './components/SuperAdminPanel/SuperAdminProfile/SuperAdminProfile';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* User Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />}>
          <Route path="ticket-form" element={<TicketForm />} />
          <Route path="mytickets" element={<TicketsTable />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="ticketdetails/:ticketId" element={<UserTicketDetails />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/AdminDashboard" element={<AdminDashboard />}>
          <Route path="admin-report-generation" element={<AdminReportGeneration />} />
          <Route path="tickets" element={<Tickets />}>
            <Route path="ticket-detail/:ticketId" element={<TicketDetail />} />
          </Route>
          <Route path="new-ticket" element={<NewTicket />} />
          <Route path="approval" element={<Approval />} />
          <Route path="profile" element={<SuperAdminProfile />} />
          {/* <Route path="viewticket" element={<ViewTicketDetails />} /> */}
        </Route>

        {/* Super Admin Routes */}
        <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard />}>
          <Route path="tickets" element={<Tickets />} />
          <Route path="new-ticket" element={<NewTicket />} />
          <Route path="engineering" element={<Engineering />} />
          <Route path="add-engineer" element={<AddEngineer />} />
          <Route path="report-generation" element={<ReportGeneration />} />
          <Route path="approval" element={<Approval />} />
          <Route path="profile" element={<SuperAdminProfile />} />
          <Route path="ticket-detail/:ticketId" element={<TicketDetail />} />
          <Route path="viewticket/:ticketId" element={<ViewTicketDetails />} />
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Auth/Login";
// import ForgotPassword from './components/Auth/ForgotPassword';
// import UserDashboard from "./components/UserPanel/UserDashboard";
// import AdminDashboard from "./components/AdminPanel/AdminDashboard";
// import SuperAdminDashboard from "./components/SuperAdminPanel/SuperAdminDashboard";
// import TicketForm from './components/UserPanel/TicketCreation/TicketForm';
// import TicketsTable from './components/UserPanel/TicketsTable/TicketsTable';
// import FAQ from './components/UserPanel/Faq/Faq';
// import Profile from './components/UserPanel/Profile/Profile';
// import ChangePassword from './components/UserPanel/ChangePasword/ChangePassword';
// import UserTicketDetails from './components/UserPanel/Mytickets/Mytickets';
// import NotFound from './components/NotFound/NotFound'; 

// import Tickets from './components/SuperAdminPanel/Tickets/Tickets';
// import NewTicket from './components/SuperAdminPanel/NewTicket/NewTicket';
// import Engineering from './components/SuperAdminPanel/SuperAdminEngineerManag/SuperAdminEngineerManag';
// import AddEngineer from './components/SuperAdminPanel/AddEngineer/AddEngineer';
// import ReportGeneration from './components/SuperAdminPanel/ReportGeneration/ReportGeneration';
// import Approval from './components/SuperAdminPanel/SuperAdminMyTickets/SuperAdminMyTickets';
// import TicketDetail from './components/SuperAdminPanel/TicketDetails/TicketDetails';
// import ViewTicketDetails from './components/SuperAdminPanel/ViewTicketDetails/ViewTicketDetails';
// import SuperAdminProfile from './components/SuperAdminPanel/SuperAdminProfile/SuperAdminProfile';

// const AppRoutes = ({ userRole }) => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         <Route path="/user-dashboard" element={<UserDashboard />}>
//           <Route path="ticket-form" element={<TicketForm />} />
//           <Route path="mytickets" element={<TicketsTable />} />
//           <Route path="faq" element={<FAQ />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="change-password" element={<ChangePassword />} />
//           <Route path="ticketdetails/:ticketId" element={<UserTicketDetails />} />
//         </Route>

//         {/* Admin and SuperAdmin Dashboards */}
//         <Route path="/AdminDashboard" element={<AdminDashboard />} />
//         <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard />}>
//           <Route path="tickets" element={<Tickets />} />
//           <Route path="new-ticket" element={<NewTicket />} />
          
//           {/* Conditionally Render Engineering and AddEngineer */}
//           {userRole === 'SuperAdmin' && (
//             <>
//               <Route path="engineering" element={<Engineering />} />
//               <Route path="add-engineer" element={<AddEngineer />} />
//             </>
//           )}
          
//           <Route path="new-ticket" element={<NewTicket />} />
//           <Route path="report-generation" element={<ReportGeneration />} />
//           <Route path="approval" element={<Approval />} />
//           <Route path="profile" element={<SuperAdminProfile />} />
//           <Route path="tickets/:id" element={<TicketDetail />} />
//           <Route path="tickets/view/:id" element={<ViewTicketDetails />} />
//           <Route path="add-engineer" element={<AddEngineer />} />
//         </Route>

//         <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;
