// import React, { useState, useEffect } from 'react';  
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material'; // Import Material-UI Button
// import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import './TicketsTable.css';

// const TicketsTable = () => {
//   const [tickets, setTickets] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [priorityFilter, setPriorityFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const ticketsPerPage = 10;
//   const navigate = useNavigate();
//   const db = getFirestore();
//   const auth = getAuth();
//   const user = auth.currentUser;

//   useEffect(() => {
//     // Fetch the tickets for the currently logged-in user
//     const fetchTickets = async () => {
//       if (user) {
//         const ticketsCollectionRef = collection(db, `users/${user.uid}/TicketDetails`);
//         const q = query(ticketsCollectionRef); // Query for fetching all ticket details for the user
//         const querySnapshot = await getDocs(q);

//         const fetchedTickets = [];
//         querySnapshot.forEach((doc) => {
//           fetchedTickets.push({ id: doc.id, ...doc.data() });
//         });

//         // Sort by `createdAt` field in descending order
//         fetchedTickets.sort((a, b) => {
//           const dateA = a.createdAt ? a.createdAt.toDate().getTime() : 0;
//           const dateB = b.createdAt ? b.createdAt.toDate().getTime() : 0;
//           return dateB - dateA; // Descending order
//         });

//         setTickets(fetchedTickets);
//         console.log('Fetched Tickets:', fetchedTickets); // Debugging log
//       }
//     };


//     fetchTickets();
//   }, [db, user]);

//   const handleRowClick = (ticketId) => {
//     navigate(`/user-dashboard/ticketdetails/${ticketId}`); // Navigate to ticket details page with the correct ID
//   };

//   // Filter tickets based on search and filters
//   const filteredTickets = tickets.filter(ticket => {
//     const subject = ticket.subject ? ticket.subject.toLowerCase() : ''; // Ensure subject is defined
//     return (
//       subject.includes(searchQuery.toLowerCase()) &&
//       (statusFilter === '' || ticket.status === statusFilter) &&
//       (priorityFilter === '' || ticket.priority === priorityFilter)
//     );
//   });

//   // Pagination logic
//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="tickets-container-trt">
//       <div className="header-section-trt">
//         <div className="add-ticket-button-trt">
//           <Button 
//             variant="contained" 
//             color="primary" 
//             onClick={() => navigate('/user-dashboard/ticket-form')} // Navigate to ticket form
//           >
//           + Raise New Ticket
//           </Button>
//         </div>

//         <div className="search-filter-section-trt">
//           <div className="search-bar-trt">
//             <input
//               type="text"
//               placeholder="Search by Subject"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           <div className="filters-trt">
//             <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//               <option value="">All Status</option>
//               <option value="Raised">Raised</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Resolved">Resolved</option>
//               <option value="Closed">Closed</option>
//             </select>

//             <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
//               <option value="">All Priorities</option>
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Display total tickets */}
//       <div className="total-tickets-trt">
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <span className="ticket-icon-trt">🎟️</span>
//           <h3>Total Tickets:</h3>
//         </div>
//         <span className="ticket-count-trt">{filteredTickets.length}</span>
//       </div>

//       <div className="tickets-table-container-trt">
//         <table className="tickets-table-trt">
//           <thead>
//             <tr>
//               <th>Ticket ID</th>
//               <th>Subject</th>
//               <th>Created At</th>
//               <th>Status</th>
//               <th>Priority</th>
//               <th>Raised Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentTickets.map(ticket => (
//               <tr key={ticket.id} onClick={() => handleRowClick(ticket.id)}>
//                 <td>{ticket.id}</td>
//                 <td>
//                   <div className="subject-cell">
//                     {ticket.subject}
//                   </div>
//                 </td>
//                 <td>{ticket.date}</td>
//  {/* Last Update is kept blank */}
//                 <td>{ticket.status}</td>
//                 <td>{ticket.priority || 'N/A'}</td> {/* Priority is kept blank */}
//                 <td>{ticket.time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="pagination-trt">
//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => paginate(index + 1)}
//             className={currentPage === index + 1 ? 'active' : ''}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TicketsTable;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"; // Import Material-UI Button
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./TicketsTable.css";

const TicketsTable = () => {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTickets = async () => {
      if (user) {
        try {
          const uid = user.uid; // Get the UID of the logged-in user
          const ticketsCollectionRef = collection(db, "TicketList");

          // Query the tickets where the `createdBy` field matches the user's UID
          const q = query(ticketsCollectionRef, where("createdBy", "==", uid));
          const querySnapshot = await getDocs(q);

          const fetchedTickets = [];
          querySnapshot.forEach((doc) => {
            fetchedTickets.push({ id: doc.id, ...doc.data() });
          });

          // Sort by `createdAt` field in descending order
          fetchedTickets.sort((a, b) => {
            const dateA = a.createdAt ? a.createdAt.toDate().getTime() : 0;
            const dateB = b.createdAt ? b.createdAt.toDate().getTime() : 0;
            return dateB - dateA; // Descending order
          });

          setTickets(fetchedTickets);
          console.log("Fetched Tickets:", fetchedTickets); // Debugging log
        } catch (error) {
          console.error("Error fetching tickets:", error);
        }
      }
    };

    fetchTickets();
  }, [db, user]);

  const handleRowClick = (ticketId) => {
    navigate(`/user-dashboard/ticketdetails/${ticketId}`); // Navigate to ticket details page with the correct ID
  };

  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter((ticket) => {
    const subject = ticket.subject ? ticket.subject.toLowerCase() : ""; // Ensure subject is defined
    return (
      subject.includes(searchQuery.toLowerCase()) &&
      (statusFilter === "" || ticket.status === statusFilter) &&
      (priorityFilter === "" || ticket.priority === priorityFilter)
    );
  });

  // Pagination logic
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="tickets-container-trt">
      <div className="header-section-trt">
        <div className="add-ticket-button-trt">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/user-dashboard/ticket-form")} // Navigate to ticket form
          >
            + Raise New Ticket
          </Button>
        </div>

        <div className="search-filter-section-trt">
          <div className="search-bar-trt">
            <input
              type="text"
              placeholder="Search by Subject"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filters-trt">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Raised">Raised</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Display total tickets */}
      <div className="total-tickets-trt">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="ticket-icon-trt">🎟️</span>
          <h3>Total Tickets:</h3>
        </div>
        <span className="ticket-count-trt">{filteredTickets.length}</span>
      </div>

      <div className="tickets-table-container-trt">
        <table className="tickets-table-trt">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Raised Time</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map((ticket) => (
              <tr key={ticket.id} onClick={() => handleRowClick(ticket.id)}>
                <td>{ticket.id}</td>
                <td>
                  <div className="subject-cell">{ticket.subject}</div>
                </td>
                <td>
                  {ticket.createdAt
                    ? ticket.createdAt.toDate().toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{ticket.status}</td>
                <td>{ticket.priority || "N/A"}</td>
                <td>
                  {ticket.createdAt
                    ? ticket.createdAt.toDate().toLocaleTimeString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-trt">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicketsTable;
