import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth to get logged-in user's UID
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import Firestore methods
import './SuperAdminMyTickets.css';

function Approval() {
  const [tickets, setTickets] = useState([]); // Initialize state for tickets
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth
  const db = getFirestore(); // Initialize Firestore

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const user = auth.currentUser ; // Get the logged-in user
        if (user) {
          const userId = user.uid; // Get user's UID
          const ticketDetailsRef = collection(db, `TicketList`); // Reference to the TicketList collection
          const ticketSnapshot = await getDocs(ticketDetailsRef); // Fetch the tickets
console.log("User Id:-",userId);
          // Filter tickets to only include those raised by the logged-in user
          const userTickets = ticketSnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt || new Date(), // Default to current date if createdAt is missing
            }))
            .filter(ticket => ticket.createdBy === userId); // Filter by userId

          // Sort tickets by creation time or ID in descending order
          const sortedTickets = userTickets.sort((a, b) => {
            return b.createdAt - a.createdAt; // Assuming 'createdAt' is a timestamp
          });

          setTickets(sortedTickets); // Set sorted tickets to state
        } else {
          console.error('No user is logged in');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets(); // Call the function to fetch tickets
  }, [auth, db]);

  const handleArrowClick = (ticketId) => {
    navigate(`/SuperAdminDashboard/viewticket/${ticketId}`); // Pass the ticketId to the ticket view page
  };

  const filteredTickets = tickets.filter(ticket => {
    return (
      ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === '' || ticket.status === statusFilter) &&
      (priorityFilter === '' || ticket.priority === priorityFilter)
    );
  });

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to format the Firestore timestamp into a human-readable date
  const formatDate = (timestamp) => {
    if (!timestamp) {
      return 'N/A'; // Return a default value if timestamp is undefined
    }
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString(); // If it's already a Date object
    }
    if (timestamp.seconds) {
      // If it's a Firestore Timestamp object
      return new Date(timestamp.seconds * 1000).toLocaleDateString();
    }
    return 'Invalid Date'; // Handle any other unexpected cases
  };

  return (
    <div className="tickets-container">
      <div className="header-area">
        <h1>
          <span style={{ flexGrow: 1 }}></span>
        </h1>
      </div>

      <div className="top-section">
        <div className="new-ticket-total-container">
          <div className="total-tickets">Total Tickets: {filteredTickets.length}</div>
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

      <div className="tickets-table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Raised Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.subject}</td>
                <td>{formatDate(ticket.createdAt)}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td>
                <td>{ticket.time}</td>
                <td>
                  <button
                    className="arrow-button"
                    onClick={() => handleArrowClick(ticket.id)}
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
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Approval;