import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Tickets.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { db } from '../../../firebase/firebaseconfig'; // Import initialized Firebase instance
import { collection, query, where, getDocs } from "firebase/firestore";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClass, setTotalClass] = useState('');
  const [role, setRole] = useState(''); // State to store user role
  const ticketsPerPage = 10;
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate();
  const location = useLocation();
  // const tokenId = location.state?.token; // Retrieve tokenId from state
  // console.log("Token ID:", tokenId); 

  const tokenId = sessionStorage.getItem('token'); // Replace 'token' with the actual key you used to store the token
console.log("Token ID:", tokenId);

  // Retrieve role from sessionStorage
  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole") || 'Admin'; // Default to 'Admin' if not found
    setRole(userRole);
  }, []);

  // Fetch tickets based on role
  // useEffect(() => {
  //   const employeeId = sessionStorage.getItem("employeeId");
  //   console.log("Fetching tickets from Firebase:", employeeId);
  //   console.log("User  Role:", role);

  //   const fetchTickets = async () => {
  //     try {
  //       if (role === 'SuperAdmin') {
  //         const response = await fetch('https://trt-api-1x35dd1hz-sakgis-projects.vercel.app/allticketsbyrole');

  //         if (!response.ok) {
  //           throw new Error('Network response was not ok: ' + response.statusText);
  //         }

  //         const data = await response.json();
  //         console.log("API Response:", data);

  //         if (data.tickets) {
  //           const sortedTickets = data.tickets.sort((a, b) => {
  //             const timeA = new Date(`${a.date} ${a.time}`).getTime();
  //             const timeB = new Date(`${b.date} ${b.time}`).getTime();
  //             return timeB - timeA; // Descending order
  //           });

  //           setTickets(sortedTickets);
  //         } else {
  //           console.error('No tickets found');
  //         }
  //       } else if (role === 'Admin') {
  //         const ticketsRef = collection(db, "TicketList");
  //         const q = query(ticketsRef, where("assignedId", "==", employeeId));
  //         const querySnapshot = await getDocs(q);

  //         const adminTickets = querySnapshot.docs.map(doc => ({
  //           id: doc.id,
  //           ...doc.data()
  //         }));

  //         const sortedTickets = adminTickets.sort((a, b) => {
  //           const timeA = new Date(`${a.date} ${a.time}`).getTime();
  //           const timeB = new Date(`${b.date} ${b.time}`).getTime();
  //           return timeB - timeA; // Descending order
  //         });

  //         setTickets(sortedTickets);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching tickets:", error);
  //       alert(`Failed to fetch tickets: ${error.message}. Please try again later.`);
  //     }
  //   };

  //   fetchTickets();
  // }, [role]);

  // Fetch tickets based on role
useEffect(() => {
  const employeeId = sessionStorage.getItem("employeeId");
  console.log("Fetching tickets from Firebase:", employeeId);
  console.log("User  Role:", role);

  // const fetchTickets = async () => {
  //   try {
  //     if (role === 'SuperAdmin') {
  //       const response = await fetch('https://trt-api-new.vercel.app/allticketsbyrole', {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${tokenId}`, // Include the Bearer token in the headers
  //           'Content-Type': 'application/json'
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok: ' + response.statusText);
  //       }

  //       const data = await response.json();
  //       console.log("API Response:", data);

  //       if (data.tickets) {
  //         // const sortedTickets = data.tickets.sort((a, b) => {
  //         //   const timeA = new Date(`${a.date} ${a.time}`).getTime();
  //         //   const timeB = new Date(`${b.date} ${b.time}`).getTime();
  //         //   return timeB - timeA; // Descending order
  //         // });
  //         const sortedTickets = data.tickets.sort((a, b) => {
  //           const timeA = new Date(`${a.date} ${a.time}`).getTime();
  //           const timeB = new Date(`${b.date} ${b.time}`).getTime();
  //           return timeA - timeB; // Ascending order
  //         });
  

  //         setTickets(sortedTickets);
  //       } else {
  //         console.error('No tickets found');
  //       }
  //     } else if (role === 'Admin') {
  //       const ticketsRef = collection(db, "TicketList");
  //       const q = query(ticketsRef, where("assignedId", "==", employeeId));
  //       const querySnapshot = await getDocs(q);

  //       const adminTickets = querySnapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));

  //       // const sortedTickets = adminTickets.sort((a, b) => {
  //       //   const timeA = new Date(`${a.date} ${a.time}`).getTime();
  //       //   const timeB = new Date(`${b.date} ${b.time}`).getTime();
  //       //   return timeB - timeA; // Descending order
  //       // });
  //       const sortedTickets = adminTickets.sort((a, b) => {
  //         const timeA = new Date(`${a.date} ${a.time}`).getTime();
  //         const timeB = new Date(`${b.date} ${b.time}`).getTime();
  //         return timeA - timeB; // Ascending order
  //       });

  //       setTickets(sortedTickets);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching tickets:", error);
  //     alert(`Failed to fetch tickets: ${error.message}. Please try again later.`);
  //   }
  // };

  const fetchTickets = async () => {
    setLoading(true); 
    try {
      if (role === 'SuperAdmin') {
        const response = await fetch('https://trt-api-new.vercel.app/allticketsbyrole', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenId}`,
            'Content-Type': 'application/json'
          }
        });
  
        const firestoreTimestampToDate = (timestamp) => {
          if (timestamp && timestamp._seconds) {
            return new Date(timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1000000));
          }
          return null; // Return null if the timestamp is invalid
        };
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
  
        const data = await response.json();
        console.log("API Response:", data);
  
        if (data.tickets) {
          // Log the entire ticket object for debugging
          data.tickets.forEach(ticket => {
            console.log(`Ticket ID: ${ticket.id}, createdAt:`, ticket.createdAt);
          });
  
          const sortedTickets = data.tickets.sort((a, b) => {
            const timeA = firestoreTimestampToDate(a.createdAt)?.getTime() || 0; // Convert to milliseconds
            const timeB = firestoreTimestampToDate(b.createdAt)?.getTime() || 0; // Convert to milliseconds
  
            if (isNaN(timeA) || isNaN(timeB)) {
              console.error(`Invalid date for ticket ID: ${a.id} or ${b.id}`);
              return 0; // Keep original order if date is invalid
            }
  
            return timeB - timeA; // Ascending order
          });
  
          setTickets(sortedTickets);
        } else {
          console.error('No tickets found');
        }
      } else if (role === 'Admin') {
        const ticketsRef = collection(db, "TicketList");
        const q = query(ticketsRef, where("assignedId", "==", employeeId));
        const querySnapshot = await getDocs(q);
  
        const adminTickets = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const firestoreTimestampToDate = (timestamp) => {
          if (timestamp && timestamp._seconds) {
            return new Date(timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1000000));
          }
          return null; // Return null if the timestamp is invalid
        };
        const sortedTickets = adminTickets.sort((a, b) => {
          const timeA = firestoreTimestampToDate(a.createdAt)?.getTime() || 0; // Convert to milliseconds
          const timeB = firestoreTimestampToDate(b.createdAt)?.getTime() || 0; // Convert to milliseconds
  
          if (isNaN(timeA) || isNaN(timeB)) {
            console.error(`Invalid date for ticket ID: ${a.id} or ${b.id}`);
            return 0; // Keep original order if date is invalid
          }
  
          return timeB - timeA; // Ascending order
        });
  
        setTickets(sortedTickets);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
    finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  fetchTickets();
}, [role, tokenId]); // Add tokenId to the dependency array

  // Apply filters
  const filteredTickets = tickets.filter(ticket => {
    return (
      (ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || '') &&
      (statusFilter === '' || ticket.status === statusFilter) &&
      (priorityFilter === '' || ticket.priority === priorityFilter)
    );
  });

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, Math.min(indexOfLastTicket, filteredTickets.length));
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const totalTickets = filteredTickets.length;
    if (totalTickets > 20) {
      setTotalClass('high');
    } else if (totalTickets > 10) {
      setTotalClass('medium');
    } else {
      setTotalClass('low');
    }

    const totalElement = document.querySelector('.total-tickets');
    if (totalElement) {
      totalElement.classList.add('pulse');
      setTimeout(() => totalElement.classList.remove(' pulse'), 1000);
    }
  }, [filteredTickets.length]);

  const handleArrowClick = (ticketId, ticket) => {
    navigate(`/SuperAdminDashboard/ticket-detail/${ticketId}`, { state: { ticket } });
  };

  return (
    <div className="tickets-container">
      <div className="header-area"></div>

      <div className="top-section">
        <div className="new-ticket-total-container">
          <button className="new-ticket" onClick={() => navigate('/SuperAdminDashboard/new-ticket')}>
            Create New Ticket
          </button>
          <div className="total-tickets-trt">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="ticket-icon-trt">🎟️</span>
              <h3>Total Tickets: {filteredTickets.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="search-filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Subject"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="Raised">Raised</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

{loading ? ( // Show loader while loading
  <div className="loader">Loading...</div>
) : (
      <div className="tickets-table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Engineer</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Raised Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td className="wrap-text">{ticket.subject}</td>
                <td className="wrap-text">{ticket.assignedTo || 'Unassigned'}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.date}</td>
                <td>{ticket.time}</td>
                <td>
                  <button
                    className="arrow-button"
                    onClick={() => handleArrowClick(ticket.id, ticket)}
                  >
                    ➡️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array(totalPages)
            .fill(0)
            .map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    )}
    </div>

  );
}

export default Tickets;








// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './Tickets.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { db } from '../../../firebase/firebaseconfig'; // Import initialized Firebase instance
// import { collection, query, where, getDocs } from "firebase/firestore";

// function Tickets() {
//   const [tickets, setTickets] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [priorityFilter, setPriorityFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalClass, setTotalClass] = useState('');
//   const [role, setRole] = useState(''); // State to store user role
//   const [loading, setLoading] = useState(true); // State to track loading status
//   const ticketsPerPage = 10;

//   const navigate = useNavigate();
//   const location = useLocation();
//   const tokenId = sessionStorage.getItem('token'); // Replace 'token' with the actual key you used to store the token
//   console.log("Token ID:", tokenId);

//   // Retrieve role from sessionStorage
//   useEffect(() => {
//     const userRole = sessionStorage.getItem("userRole") || 'Admin'; // Default to 'Admin' if not found
//     setRole(userRole);
//   }, []);

//   // Fetch tickets based on role
//   useEffect(() => {
//     const employeeId = sessionStorage.getItem("employeeId");
//     console.log("Fetching tickets from Firebase:", employeeId);
//     console.log("User  Role:", role);

//     const fetchTickets = async () => {
//       setLoading(true); // Set loading to true before fetching
//       try {
//         if (role === 'SuperAdmin') {
//           const response = await fetch('https://trt-api-new.vercel.app/allticketsbyrole', {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${tokenId}`,
//               'Content-Type': 'application/json'
//             }
//           });

//           if (!response.ok) {
//             throw new Error('Network response was not ok: ' + response.statusText);
//           }

//           const data = await response.json();
//           console.log("API Response:", data);

//           if (data.tickets) {
//             const sortedTickets = data.tickets.sort((a, b) => {
//               const timeA = new Date(a.createdAt._seconds * 1000 + Math.floor(a.createdAt._nanoseconds / 1000000)).getTime();
//               const timeB = new Date(b.createdAt._seconds * 1000 + Math.floor(b.createdAt._nanoseconds / 1000000)).getTime();
//               return timeA - timeB; // Ascending order
//             });

//             setTickets(sortedTickets);
//           } else {
//             console.error('No tickets found');
//           }
//         } else if (role === 'Admin') {
//           const ticketsRef = collection(db, "TicketList");
//           const q = query(ticketsRef, where("assignedId", "==", employeeId));
//           const querySnapshot = await getDocs(q);

//           const adminTickets = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//           }));

//           const sortedTickets = adminTickets.sort((a, b) => {
//             const timeA = new Date(a.createdAt._seconds * 1000 + Math.floor(a.createdAt._nanoseconds / 1000000)).getTime();
//             const timeB = new Date(b.createdAt._seconds * 1000 + Math.floor(b.createdAt._nanoseconds / 1000000)).getTime();
//             return timeA - timeB; // Ascending order
//           });

//           setTickets(sortedTickets);
//         }
//       } catch (error) {
//         console.error("Error fetching tickets:", error);
//         alert(`Failed to fetch tickets: ${error.message}. Please try again later.`);
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchTickets();
//   }, [role, tokenId]); // Add tokenId to the dependency array

//   // Apply filters
//   const filteredTickets = tickets.filter(ticket => {
//     return (
//       (ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || '') &&
//       (statusFilter === '' || ticket.status === statusFilter) &&
//       (priorityFilter === '' || ticket.priority === priorityFilter)
//     );
//   });

//   const  indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = filteredTickets.slice(indexOfFirstTicket, Math.min(indexOfLastTicket, filteredTickets.length));
//   const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   useEffect(() => {
//     const totalTickets = filteredTickets.length;
//     if (totalTickets > 20) {
//       setTotalClass('high');
//     } else if (totalTickets > 10) {
//       setTotalClass('medium');
//     } else {
//       setTotalClass('low');
//     }

//     const totalElement = document.querySelector('.total-tickets');
//     if (totalElement) {
//       totalElement.classList.add('pulse');
//       setTimeout(() => totalElement.classList.remove('pulse'), 1000);
//     }
//   }, [filteredTickets.length]);

//   const handleArrowClick = (ticketId, ticket) => {
//     navigate(`/SuperAdminDashboard/ticket-detail/${ticketId}`, { state: { ticket } });
//   };

//   return (
//     <div className="tickets-container">
//       <div className="header-area"></div>

//       <div className="top-section">
//         <div className="new-ticket-total-container">
//           <button className="new-ticket" onClick={() => navigate('/SuperAdminDashboard/new-ticket')}>
//             Create New Ticket
//           </button>
//           <div className="total-tickets-trt">
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <span className="ticket-icon-trt">🎟️</span>
//               <h3>Total Tickets: {filteredTickets.length}</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="search-filter-section">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by Subject"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="filters">
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//             <option value="">All Status</option>
//             <option value="Raised">Raised</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Resolved">Resolved</option>
//             <option value="Closed">Closed</option>
//           </select>

//           <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
//             <option value="">All Priority</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </div>
//       </div>

//       {loading ? ( // Show loader while loading
//         <div className="loader">Loading...</div>
//       ) : (
//         <div className="tickets-table-container">
//           <table className="tickets-table">
//             <thead>
//               <tr>
//                 <th>Ticket ID</th>
//                 <th>Subject</th>
//                 <th>Engineer</th>
//                 <th>Status</th>
//                 <th>Priority</th>
//                 <th>Date</th>
//                 <th>Raised Time</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentTickets.map((ticket) => (
//                 <tr key={ticket.id}>
//                   <td>{ticket.id}</td>
//                   <td className="wrap-text">{ticket.subject}</td>
//                   <td className="wrap-text">{ticket.assignedTo || 'Unassigned'}</td>
//                   <td>{ticket.status}</td>
//                   <td>{ticket.priority}</td>
//                   <td>{ticket.date}</td>
//                   <td>{ticket.time}</td>
//                   <td>
//                     <button
//                       className="arrow-button"
//                       onClick={() => handleArrowClick(ticket.id, ticket)}
//                     >
//                       ➡️
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="pagination">
//             {Array(totalPages)
//               .fill(0)
//               .map((_, index) => (
//                 <button
//                   key={index + 1}
//                   onClick={() => paginate(index + 1)}
//                   className={currentPage === index + 1 ? 'active' : ''}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//           </div>
//         </div>
//       )}
//     </div>
    
//   );
// }
 

// export default Tickets;






//direct firebase
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './Tickets.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { db } from '../../../firebase/firebaseconfig'; // Import initialized Firebase instance
// import { collection, query, where, getDocs, collectionGroup } from "firebase/firestore";

// function Tickets() {
//   const [tickets, setTickets] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [priorityFilter, setPriorityFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalClass, setTotalClass] = useState('');
//   const [role, setRole] = useState(''); // State to store user role
//   const ticketsPerPage = 10;

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Retrieve role from sessionStorage
//   useEffect(() => {
//     const userRole = sessionStorage.getItem("userRole") || 'Admin'; // Default to 'Admin' if not found
//     setRole(userRole);
//   }, []);

//   // Fetch tickets based on role
//   useEffect(() => {
//     const employeeId = sessionStorage.getItem("employeeId");
//     console.log("Fetching tickets from Firebase:", employeeId);
//     console.log("User  Role:", role);

//     // const fetchTickets = async () => {
//     //   try {
//     //     if (role === 'SuperAdmin') {
//     //       // Fetch tickets using Firestore collectionGroup for all roles
//     //       const ticketDetailsSnapshot = await getDocs(collectionGroup(db, 'TicketList'));

//     //       if (ticketDetailsSnapshot.empty) {
//     //         console.log("No tickets found in the TicketDetails collection group.");
//     //         alert("No tickets found.");
//     //         return;
//     //       }

//     //       const superAdminTickets = [];
//     //       ticketDetailsSnapshot.forEach(doc => {
//     //         const ticketData = doc.data();
//     //         superAdminTickets.push({ id: doc.id, ...ticketData });
//     //       });

//     //       const sortedTickets = superAdminTickets.sort((a, b) => {
//     //         const timeA = new Date(`${a.date} ${a.time}`).getTime();
//     //         const timeB = new Date(`${b.date} ${b.time}`).getTime();
//     //         return timeB - timeA; // Descending order
//     //       });

//     //       setTickets(sortedTickets);
//     //     } else if (role === 'Admin') {
//     //       const ticketsRef = collection(db, "TicketList");
//     //       const q = query(ticketsRef, where("assignedId", "==", employeeId));
//     //       const querySnapshot = await getDocs(q);

//     //       const adminTickets = querySnapshot.docs.map(doc => ({
//     //         id: doc.id,
//     //         ...doc.data()
//     //       }));

//     //       const sortedTickets = adminTickets.sort((a, b) => {
//     //         const timeA = new Date(`${a.date} ${a.time}`).getTime();
//     //         const timeB = new Date(`${b.date} ${b.time}`).getTime();
//     //         return timeB - timeA; // Descending order
//     //       });

//     //       setTickets(sortedTickets);
//     //     }
//     //   } catch (error) {
//     //     console.error("Error fetching tickets:", error);
//     //     alert(`Failed to fetch tickets: ${error.message}. Please try again later.`);
//     //   }
//     // };
    
//     const fetchTickets = async () => {
//       try {
//         if (role === 'SuperAdmin') {
//           const ticketDetailsSnapshot = await getDocs(collectionGroup(db, 'TicketList'));
//           if (ticketDetailsSnapshot.empty) {
//             alert("No tickets found.");
//             return;
//           }
    
//           const superAdminTickets = [];
//           ticketDetailsSnapshot.forEach(doc => {
//             const ticketData = doc.data();
//             superAdminTickets.push({ id: doc.id, ...ticketData });
//           });
    
//           // Sort by createdAt
//           const sortedTickets = superAdminTickets.sort((a, b) => {
//             const timeA = a.createdAt ? a.createdAt.toDate().getTime() : 0;
//             const timeB = b.createdAt ? b.createdAt.toDate().getTime() : 0;
//             return timeB - timeA; // Descending order
//           });
    
//           console.log("Sorted Tickets for SuperAdmin:", sortedTickets);
//           setTickets(sortedTickets);
//         } else if (role === 'Admin') {
//           const ticketsRef = collection(db, "TicketList");
//           const q = query(ticketsRef, where("assignedId", "==", employeeId));
//           const querySnapshot = await getDocs(q);
    
//           const adminTickets = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//           }));
    
//           // Sort by createdAt
//           const sortedTickets = adminTickets.sort((a, b) => {
//             const timeA = a.createdAt ? a.createdAt.toDate().getTime() : 0;
//             const timeB = b.createdAt ? b.createdAt.toDate().getTime() : 0;
//             return timeB - timeA; // Descending order
//           });
    
//           console.log("Sorted Tickets for Admin:", sortedTickets);
//           setTickets(sortedTickets);
//         }
//       } catch (error) {
//         console.error("Error fetching tickets:", error);
//         alert(`Failed to fetch tickets: ${error.message}. Please try again later.`);
//       }
//     };
    

//     fetchTickets();
//   }, [role]);

//   // Apply filters
//   const filteredTickets = tickets.filter(ticket => {
//     return (
//       (ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || '') &&
//       (statusFilter === '' || ticket.status === statusFilter) &&
//       (priorityFilter === '' || ticket.priority === priorityFilter)
//     );
//   });

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = filteredTickets.slice(indexOfFirstTicket, Math.min(indexOfLastTicket, filteredTickets.length));
//   const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   useEffect(() => {
//     const totalTickets = filteredTickets.length;
//     if (totalTickets > 20) {
//       setTotalClass('high');
//     } else if (totalTickets > 10) {
//       setTotalClass('medium');
//     } else {
//       setTotalClass('low');
//     }

//     const totalElement = document.querySelector('.total-tickets');
//     if (totalElement) {
//       totalElement.classList.add('pulse');
//       setTimeout(() => totalElement.classList.remove(' pulse'), 1000);
//     }
//   }, [filteredTickets.length]);

//   const handleArrowClick = (ticketId, ticket) => {
//     navigate(`/SuperAdminDashboard/ticket-detail/${ticketId}`, { state: { ticket } });
//   };

//   return (
//     <div className="tickets-container">
//       <div className="header-area"></div>

//       <div className="top-section">
//         <div className="new-ticket-total-container">
//           <button className="new-ticket" onClick={() => navigate('/SuperAdminDashboard/new-ticket')}>
//             Create New Ticket
//           </button>
//           <div className="total-tickets-trt">
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <span className="ticket-icon-trt">🎟️</span>
//               <h3>Total Tickets: {filteredTickets.length}</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="search-filter-section">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by Subject"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="filters">
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//             <option value="">All Status</option>
//             <option value="Raised">Raised</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Resolved">Resolved</option>
//             <option value="Closed">Closed</option>
//           </select>

//           <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
//             <option value="">All Priority</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </div>
//       </div>

//       <div className="tickets-table-container">
//         <table className="tickets-table">
//           <thead>
//             <tr>
//               <th>Ticket ID</th>
//               <th>Subject</th>
//               <th>Engineer</th>
//               <th>Status</th>
//               <th>Priority</th>
//               <th>Date</th>
//               <th>Raised Time</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentTickets.map((ticket) => (
//               <tr key={ticket.id}>
//                 <td>{ticket.id}</td>
//                 <td className="wrap-text">{ticket.subject}</td>
//                 <td className="wrap-text">{ticket.assignedTo || 'Unassigned'}</td>
//                 <td>{ticket.status}</td>
//                 <td>{ticket.priority}</td>
//                 <td>{ticket.date}</td>
//                 <td>{ticket.time}</td>
//                 <td>
//                   <button
//                     className="arrow-button"
//                     onClick={() => handleArrowClick(ticket.id, ticket)}
//                   >
//                     ➡️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="pagination">
//           {Array(totalPages)
//             .fill(0)
//             .map((_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => paginate(index + 1)}
//                 className={currentPage === index + 1 ? 'active' : ''}
//               >
//                 {index + 1}
//               </button>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Tickets;