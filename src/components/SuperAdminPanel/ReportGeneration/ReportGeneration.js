import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import * as XLSX from 'xlsx'; // Import xlsx for Excel file generation
import './ReportGeneration.css';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportGeneration = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [assignedAdmin, setAssignedAdmin] = useState('');
  const [showAdminList, setShowAdminList] = useState(false);
  const [admins, setAdmins] = useState([]);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Tickets',
        data: [12, 19, 3, 5, 2],
        backgroundColor: ['rgba(75, 192, 192, 0.5)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)'],
      },
    ],
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('role', '==', 'Admin'));
      const querySnapshot = await getDocs(q);
      const adminList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: `${doc.data().First_Name} ${doc.data().Last_Name}`,
      }));

      console.log("Fetched Admins: ", adminList);
      setAdmins(adminList);
    };

    fetchAdmins();

    const graphSection = document.querySelector('.graph-section');
    if (graphSection) {
      graphSection.style.opacity = 0;
      setTimeout(() => {
        graphSection.style.transition = 'opacity 1s ease-in';
        graphSection.style.opacity = 1;
      }, 200);
    }
  }, []);

  const padZero = (num) => (num < 10 ? `0${num}` : num);

  const formatDate = (date) => {
    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchTickets = async (startDate, endDate) => {
    const db = getFirestore();
    const ticketsCollection = collection(db, 'TicketList');

    // Prepare the query
    let q = query(ticketsCollection);

    // Add filters based on the selected criteria
    if (statusFilter) {
      q = query(q, where('status', '==', statusFilter));
    }

    if (startDate && endDate) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      q = query(q, where('date', '>=', formattedStartDate), where('date', '<=', formattedEndDate));
    }

    if (employeeFilter) {
      q = query(q, where('assignedTo', '==', employeeFilter));
    }
    console.log("Employee filter:", employeeFilter);

    const querySnapshot = await getDocs(q);
    const tickets = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Return only the specific fields with renamed keys
    return tickets.map(ticket => ({
      TicketId: ticket.id,
      Status: ticket.status,
      subject: ticket.subject,
      Description: ticket.description,
      DeviceType: ticket.deviceType,
      IssueType: ticket.issueType,
      AssignedTo: ticket.assignedTo,
      Priority: ticket.priority,
      RaisedDate:ticket.date,
      RaisedAt: ticket.time,
      statusUpdatedDate: ticket.statusUpdatedDate,
      statusUpdatedTime: ticket.statusUpdatedTime,
      
    }));
  };

  // 
  const downloadExcel = (tickets) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(tickets);
  
    // Define the column widths
    const columnWidths = [
      { wch: 20 }, // ticketId
      { wch: 20 }, // status
      { wch: 20 }, // circle
      { wch: 20 }, // description
      { wch: 20 }, // deviceType
      { wch: 20 }, // issueType
      { wch: 20 }, // assignedTo
      { wch: 20 }, // priority
      { wch: 20 }, // createdAt
      { wch: 20 }, // statusUpdatedDate
      { wch: 20 }, // statusUpdatedTime
      { wch: 20 }, // subject
    ];
  
    // Set the column widths
    ws['!cols'] = columnWidths;
  
    XLSX.utils.book_append_sheet(wb, ws, 'Tickets');
    const fileName = `Tickets_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet(tickets);
  //   XLSX.utils.book_append_sheet(wb, ws, 'Tickets');
  //   const fileName = `Tickets_${new Date().toISOString().split('T')[0]}.xlsx`;
  //   XLSX.writeFile(wb, fileName);
  // };

  const handleDownload = async () => {
    if (!startDate || !endDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Date Range',
        text: 'Please select a valid date range before downloading the report.',
        confirmButtonText: 'OK',
      });
      return;
    }

    const tickets = await fetchTickets(startDate, endDate);
    
    if (tickets.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No Tickets Found',
        text: 'No tickets found for the selected criteria.',
        confirmButtonText: 'OK',
      });
      return;
    }

    downloadExcel(tickets);
    Swal.fire({
      icon: 'success',
      title: 'Download Successful!',
      text: 'Your report has been downloaded successfully.',
      confirmButtonText: 'Great!',
    });
  };

  return (
    <div className="report-container">
      <div className="header-area">
        <h1>
          <span className="header-text">Report Generation</span>
          <span style={{ flexGrow: 1 }}></span>
        </h1>
      </div>
  
      <div className="filter-section">
        <div className="filter-group">
          <label><strong>Status</strong></label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="styled-select"
          >
            <option value="" disabled>Select Ticket Status</option>
            <option value="Raised">Raised</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
  
        <div className="filter-group">
          <label><strong>Select Date Range</strong></label>
          <div className="date-picker-group">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              dateFormat="dd/MM/yyyy"
              required
              customInput={<input value={startDate ? format(startDate, 'dd/MM/yyyy') : ''} readOnly />}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              dateFormat="dd/MM/yyyy"
              required
              customInput={<input value={endDate ? format(endDate, 'dd/MM/yyyy') : ''} readOnly />}
            />
          </div>
        </div>
  
        <div className="filter-group">
          <label><strong>Select Employee</strong></label>
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="styled-select"
          >
            <option value="" disabled>Select Employee</option>
            {admins.length > 0 ? (
              admins.map(admin => (
                <option key={admin.id} value={admin.name}>
                  {admin.name}
                </option>
              ))
            ) : (
              <option value="" disabled>No Admins Available</option>
            )}
          </select>
        </div>
  
        <button onClick={handleDownload} className="download-btn animated-btn">
          Download Report
        </button>
      </div>
  
      <div className="graph-section">
        <Bar
          data={data}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: '#333',
                },
              },
            },
          }}
          width={400}
          height={200}
        />
      </div>
    </div>
  );
};

export default ReportGeneration;