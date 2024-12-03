// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom'; // Make sure react-router-dom is installed
// // import { useTickets } from '../addTicket/TicketContext'; // Ensure this path is correct
// // import {
// //   Container,
// //   Paper,
// //   Typography,
// //   TextField,
// //   Button,
// //   Divider,
// //   Chip,
// //   Grid,
// //   Avatar,
// // } from '@mui/material'; // Ensure Material-UI components are correctly imported
// // import { Event, Attachment } from '@mui/icons-material'; // Ensure these icons are imported
// // import Sidebar from '../Sidebar/Sidebar'; // Make sure this path is correct as well
// // import './Mytickets.css'; // Ensure you have the CSS file in the correct location

// // const TicketDetails = () => {
// //   const { ticketId } = useParams();
// //   const { tickets } = useTickets();
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (tickets.length > 0) {
// //       setLoading(false);
// //     }
// //   }, [tickets]);

// //   // Log the ticketId from the URL
// //   console.log('ticketId from URL:', ticketId);

// //   // Log the list of tickets
// //   console.log('Tickets:', tickets);

// //   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

// //   // Ensure the ticketId is compared as a string
// //   const ticket = tickets.find((ticket) => ticket.id === ticketId);

// //   // Log if we found the ticket
// //   console.log('Found ticket:', ticket);

// //   if (loading) return <Typography variant="h6">Loading...</Typography>;
// //   if (!ticket) return <Typography variant="h6" color="error">Ticket not found.</Typography>;

// //   const getPriorityColor = (priority) => {
// //     switch (priority.toLowerCase()) {
// //       case 'high': return 'error';
// //       case 'medium': return 'warning';
// //       case 'low': return 'success';
// //       default: return 'default';
// //     }
// //   };

// //   return (
// //     <Container maxWidth="lg" className="ticket-details-container">
// //       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

// //       <div className={`ticket-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
// //         <Paper elevation={4} className="ticket-details-paper">
// //           <Typography variant="h4" className="ticket-title" gutterBottom>
// //             {ticket.subject}
// //           </Typography>
// //           <Typography variant="subtitle1" className="ticket-date">
// //             <Event fontSize="small" /> Created on: {ticket.created}
// //           </Typography>

// //           <Divider className="divider-spacing" />

// //           <div className="ticket-details-content">
// //             <Grid container spacing={4}>
// //               <Grid item xs={12} md={8}>
// //                 <Typography variant="h6">Description:</Typography>
// //                 <Typography className="ticket-description">{ticket.description}</Typography>

// //                 <Divider className="divider-spacing" />

// //                 <div style={{ marginTop: '150px' }}>
// //                   <Typography variant="h6">Reply:</Typography>
// //                   <TextField
// //                     multiline
// //                     rows={4}
// //                     variant="outlined"
// //                     fullWidth
// //                     placeholder="Enter Message..."
// //                     className="reply-input"
// //                   />
// //                   <Button variant="contained" color="primary" className="send-button">Send</Button>
// //                 </div>
// //               </Grid>

// //               <Grid item xs={12} md={4}>
// //                 <Paper className="ticket-info">
// //                   <Typography variant="h6">Ticket Info</Typography>
// //                   <Divider className="divider-spacing" />
// //                   <Typography><strong>Device Type:</strong> {ticket.deviceType}</Typography>
// //                   <Typography><strong>Ticket ID:</strong> {ticket.id}</Typography>
// //                   <Typography>
// //                     <strong>Status:</strong> <Chip label={ticket.status} color="primary" size="small" />
// //                   </Typography>
// //                   <Typography>
// //                     <strong>Priority:</strong> 
// //                     <Chip label={ticket.priority} color={getPriorityColor(ticket.priority)} size="small" />
// //                   </Typography>
// //                   <Typography><strong>Issue Type:</strong> {ticket.issueType}</Typography>
// //                   <Typography>
// //                     <Attachment fontSize="small" /> <strong>Attached File:</strong>
// //                     {ticket.attachment && (
// //                       <a href={URL.createObjectURL(ticket.attachment)} target="_blank" rel="noopener noreferrer">
// //                         View Attachment
// //                       </a>
// //                     )}
// //                   </Typography>
// //                 </Paper>

// //                 <Divider className="divider-spacing" />

// //                 <div className="ticket-responsibility">
// //                   <Typography variant="h6">Responsibility</Typography>
// //                   <Avatar>{ticket.assignedTo ? ticket.assignedTo[0] : 'N/A'}</Avatar>
// //                   <Typography>Name: {ticket.assignedTo || 'Not assigned'}</Typography>
// //                 </div>
// //               </Grid>
// //             </Grid>
// //           </div>
// //         </Paper>
// //       </div>
// //     </Container>
// //   );
// // };

// // export default TicketDetails;



// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getFirestore, doc, getDoc, collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Divider,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
// } from '@mui/material';
// import Sidebar from '../Sidebar/Sidebar';
// import './Mytickets.css';
// import { Attachment } from '@mui/icons-material';

// const TicketDetails = () => {
//   const { ticketId } = useParams();
//   const [ticket, setTicket] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newMessage, setNewMessage] = useState(''); // Input message
//   const [chatMessages, setChatMessages] = useState([]); // Store chat messages
//   const [sendersMap, setSendersMap] = useState({}); // Store sender details (First_Name, Last_Name)

//   useEffect(() => {
//     const fetchTicketDetails = async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;

//       if (!user) {
//         setError('User is not authenticated');
//         setLoading(false);
//         return;
//       }

//       const db = getFirestore();
//       const docRef = doc(db, `users/${user.uid}/TicketDetails/${ticketId}`);

//       try {
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setTicket({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           setError('Ticket not found.');
//         }
//       } catch (err) {
//         setError('Error fetching ticket details.');
//         console.error("Error fetching ticket details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTicketDetails();
//   }, [ticketId]);

//   // Fetch chat messages in real-time from Firestore
//   useEffect(() => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (!user) return;

//     const db = getFirestore();
//     const messagesRef = collection(db, `users/${user.uid}/TicketDetails/${ticketId}/ChatSection`);
//     const q = query(messagesRef, orderBy('timestamp', 'asc'));

//     // Listen for real-time updates
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedMessages = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setChatMessages(fetchedMessages);
//     });

//     return () => unsubscribe();
//   }, [ticketId]);

//   // Function to fetch the First_Name and Last_Name of a sender
//   const fetchSenderDetails = async (senderId) => {
//     if (sendersMap[senderId]) {
//       return sendersMap[senderId]; // Return cached sender details
//     }

//     const db = getFirestore();
//     const userRef = doc(db, `users/${senderId}`);
//     try {
//       const userDoc = await getDoc(userRef);
//       if (userDoc.exists()) {
//         const { First_Name, Last_Name } = userDoc.data();
//         const senderDetails = `${First_Name} ${Last_Name}`;
//         setSendersMap((prevMap) => ({ ...prevMap, [senderId]: senderDetails })); // Cache sender details
//         return senderDetails;
//       } else {
//         return 'Unknown Sender';
//       }
//     } catch (err) {
//       console.error("Error fetching sender details:", err);
//       return 'Unknown Sender';
//     }
//   };

//   // Send message to Firestore
//   const sendMessage = async () => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (!newMessage.trim()) return; // Prevent empty messages

//     try {
//       const db = getFirestore();
//       const messageData = {
//         sender: user.uid,
//         message: newMessage,
//         timestamp: Timestamp.now(),
//       };

//       await addDoc(collection(db, `users/${user.uid}/TicketDetails/${ticketId}/ChatSection`), messageData);
//       setNewMessage(''); // Clear input field after sending message
//     } catch (err) {
//       console.error('Error sending message:', err);
//     }
//   };

//   const getPriorityColor = (priority) => {
//     if (!priority) return 'default';
//     switch (priority.toLowerCase()) {
//       case 'high': return 'error'; 
//       case 'medium': return 'warning';
//       case 'low': return 'success'; 
//       default: return 'default';
//     }
//   };

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   // Fetch sender details when chatMessages change
//   useEffect(() => {
//     const fetchAllSenderDetails = async () => {
//       const senderPromises = chatMessages.map(async (chat) => {
//         const senderDetails = await fetchSenderDetails(chat.sender);
//         return { [chat.sender]: senderDetails };
//       });

//       const senderResults = await Promise.all(senderPromises);
//       const newSendersMap = senderResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
//       setSendersMap((prevMap) => ({ ...prevMap, ...newSendersMap }));
//     };

//     if (chatMessages.length > 0) {
//       fetchAllSenderDetails();
//     }
//   }, [chatMessages]);

//   if (loading) return <Typography variant="h6">Loading...</Typography>;
//   if (error) return <Typography variant="h6" color="error">{error}</Typography>;

//   return (
//     <Container maxWidth="lg" className="ticket-details-container">
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       <div className={`ticket-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
//         <Paper elevation={4} className="ticket-details-paper">
//           <Typography variant="h4" className="ticket-title" gutterBottom>
//             {ticket.subject}
//           </Typography>

//           <Divider className="divider-spacing" />

//           <div className="ticket-details-content">
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={8}>
//                 <Typography variant="h6">Description:</Typography>
//                 <Typography className="ticket-description">{ticket.description}</Typography>

//                 <Divider className="divider-spacing" />

//                 {/* Chat Section */}
//                 <div style={{ marginTop: '50px' }}>
//                   <Typography variant="h6">Chat Section</Typography>
                  
//                   {/* List of Chat Messages */}
//                   <List>
//                     {chatMessages.map((chat) => (
//                       <ListItem key={chat.id}>
//                         <ListItemText
//                           primary={sendersMap[chat.sender] || 'Fetching...'}
//                           secondary={`${chat.message} - ${new Date(chat.timestamp.seconds * 1000).toLocaleString()}`} 
//                         />
//                       </ListItem>
//                     ))}
//                   </List>

//                   {/* Input Field for Sending a New Message */}
//                   <TextField
//                     multiline
//                     rows={2}
//                     variant="outlined"
//                     fullWidth
//                     placeholder="Enter Message..."
//                     className="reply-input"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                   />

//                   {/* Send Button */}
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     className="send-button"
//                     onClick={sendMessage}
//                     style={{ marginTop: '10px' }}
//                   >
//                     Send
//                   </Button>
//                 </div>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 {/* Ticket Info */}
//                 <Paper className="ticket-info">
//                   <Typography variant="h6">Ticket Info</Typography>
//                   <Divider className="divider-spacing" />

//                   <Typography><strong>Device Type:</strong> {ticket.deviceType || 'N/A'}</Typography>
//                   <Typography><strong>Ticket ID:</strong> {ticket.id}</Typography>
//                   <Typography>
//                     <strong>Status:</strong> <Chip label={ticket.status || 'N/A'} color="primary" size="small" />
//                   </Typography>
//                   <Typography>
//                     <strong>Priority:</strong>
//                     <Chip label={ticket.priority || 'N/A'} color={getPriorityColor(ticket.priority)} size="small" />
//                   </Typography>
//                   <Typography><strong>Issue Type:</strong> {ticket.issueType || 'N/A'}</Typography>
//                   <Typography>
//                     <Attachment fontSize="small" /> <strong>Attached File:</strong>
//                     {ticket.attachmentUrl ? (
//                       <a href={ticket.attachmentUrl} target="_blank" rel="noopener noreferrer">
//                         View Attachment
//                       </a>
//                     ) : 'No Attachment'}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </div>
//         </Paper>
//       </div>
//     </Container>
//   );
// };

// export default TicketDetails;










// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
//   updateDoc,
//   arrayUnion,
// } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import {db} from '../../../firebase/firebaseconfig.js'
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Divider,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
// } from '@mui/material';
// import Sidebar from '../Sidebar/Sidebar.js';
// import './Mytickets.css';
// import { Attachment } from '@mui/icons-material';
// import SweetAlert from 'sweetalert2';


// const TicketDetails = () => {
//   const { ticketId } = useParams();
//   const [ticket, setTicket] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newMessage, setNewMessage] = useState(''); // Input message
//   const [chatMessages, setChatMessages] = useState([]); // Store chat messages
//   const [sendersMap, setSendersMap] = useState({}); // Store sender details
//   const [messages, setMessages] = useState([]);
  
//   useEffect(() => {
//     const fetchTicketDetails = async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;

//       if (!user) {
//         setError('User is not authenticated');
//         setLoading(false);
//         return;
//       }

//       const db = getFirestore();
//       const docRef = doc(db, `users/${user.uid}/TicketDetails/${ticketId}`);

//       try {
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setTicket({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           setError('Ticket not found.');
//         }
//       } catch (err) {
//         setError('Error fetching ticket details.');
//         console.error("Error fetching ticket details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTicketDetails();
//   }, [ticketId]);

//   // Fetch chat messages in real-time from Firestore's ChatSection collection
//   useEffect(() => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (!user) return;

//     const db = getFirestore();
//     const messagesRef = collection(db, `ChatSection/${ticketId}/messages`);
//     const q = query(messagesRef, orderBy('timestamp', 'asc'));

//     // Listen for real-time updates
//     const unsubscribe = onSnapshot(q, async (snapshot) => {
//       const fetchedMessages = await Promise.all(snapshot.docs.map(async (doc) => {
//         const messageData = { id: doc.id, ...doc.data() };
//         // Fetch the sender details
//         messageData.senderName = await fetchSenderDetails(messageData.senderId);
//         return messageData;
//       }));
//       setChatMessages(fetchedMessages);
//     });

//     return () => unsubscribe();
//   }, [ticketId]);

//   // Function to fetch the First_Name and Last_Name of a sender
//   const fetchSenderDetails = async (senderId) => {
//     if (sendersMap[senderId]) {
//       return sendersMap[senderId]; // Return cached sender details
//     }

//     const db = getFirestore();
//     const userRef = doc(db, `users/${senderId}`);
//     try {
//       const userDoc = await getDoc(userRef);
//       if (userDoc.exists()) {
//         const { First_Name, Last_Name } = userDoc.data();
//         const senderDetails = `${First_Name} ${Last_Name}`;
//         setSendersMap((prevMap) => ({ ...prevMap, [senderId]: senderDetails })); // Cache sender details
//         return senderDetails;
//       } else {
//         return 'Unknown Sender';
//       }
//     } catch (err) {
//       console.error("Error fetching sender details:", err);
//       return 'Unknown Sender';
//     }
//   };
  
// const sendMessage = async () => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (!user || !newMessage.trim()) return; // Ensure user is authenticated and message isn't empty

//   const newMessageData = {
//     message: newMessage,              // Message content
//     senderId: user.uid,               // User ID of the sender
//     timestamp: serverTimestamp(),      // Firebase server timestamp
//   };

//   try {
//     // Add a new message document to the ChatSection collection
//     await addDoc(collection(db, `ChatSection/${ticketId}/messages`), newMessageData);

//     // Clear the input field after sending
//     setNewMessage('');
//   } catch (err) {
//     console.error("Error sending message:", err);
//     SweetAlert.fire('Error', 'Could not send message', 'error');
//   }
// };

//   // Show loading or error messages
//   if (loading) return <Typography variant="h6">Loading...</Typography>;
//   if (error) return <Typography variant="h6" color="error">{error}</Typography>;

//   return (
//     <Container maxWidth="lg" className="ticket-details-container">
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
  
//       <div className={`ticket-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
//         <Paper elevation={4} className="ticket-details-paper">
//           <Typography variant="h4" className="ticket-title" gutterBottom>
//             {ticket.subject}
//           </Typography>
//           {/* <Typography variant="subtitle1" className="ticket-date">
//             Created on: {ticket.created ? ticket.created.toDate().toLocaleDateString() : 'N/A'}
//           </Typography> */}
  
//           <Divider className="divider-spacing" />
  
//           <div className="ticket-details-content">
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={8}>
//                 <Typography variant="h6">Description:</Typography>
//                 <Typography className="ticket-description">{ticket.description}</Typography>
  
//                 <Divider className="divider-spacing" />
  
//                 <div style={{ marginTop: '150px' }}>
//                   <Typography variant="h6">Reply:</Typography>
//                   <TextField
//                     multiline
//                     rows={4}
//                     variant="outlined"
//                     fullWidth
//                     placeholder="Enter Message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     className="reply-input"
//                   />
//                   <Button variant="contained" color="primary" onClick={sendMessage} className="send-button">
//                     Send
//                   </Button>
//                 </div>
//               </Grid>
  
//               <Grid item xs={12} md={4}>
//                 <Paper className="ticket-info">
//                   <Typography variant="h6">Ticket Info</Typography>
//                   <Divider className="divider-spacing" />
//                   <Typography><strong>Device Type:</strong> {ticket.deviceType || 'N/A'}</Typography>
//                   <Typography><strong>Ticket ID:</strong> {ticket.id}</Typography>
//                   <Typography>
//                     <strong>Status:</strong> <Chip label={ticket.status || 'N/A'} color="primary" size="small" />
//                   </Typography>
//                   <Typography>
//                     <strong>Priority:</strong>
//                     <Chip label={ticket.priority || 'N/A'} color={ticket.priority === 'high' ? 'error' : ticket.priority === 'medium' ? 'warning' : 'success'} size="small" />
//                   </Typography>
//                   <Typography><strong>Issue Type:</strong> {ticket.issueType || 'N/A'}</Typography>
//                   {/* <Typography>
//                     <Attachment fontSize="small" /> <strong>Attached File:</strong>
//                     {ticket.attachmentUrl && (
//                       <a href={ticket.attachmentUrl} target="_blank" rel="noopener noreferrer">
//                         View Attachment
//                       </a>
//                     )}
//                   </Typography> */}

//                   <Typography>
//   <Attachment fontSize="small" /> <strong>Attached File:</strong>
//   {ticket.attachmentURL && (
//     <a href={ticket.attachmentURL} target="_blank" rel="noopener noreferrer">
//       View Attachment
//     </a>
//   )}
// </Typography>
//                 </Paper>
  
//                 <Divider className="divider-spacing" />
  
//                 <div className="ticket-responsibility">
//                   <Typography variant="h6">Responsibility</Typography>
//                   <Typography>Name: {ticket.assignedTo || 'Not assigned'}</Typography>
//                 </div>
//               </Grid>
//             </Grid>
  
//             <Divider className="divider-spacing" />
            
//             <Typography variant="h6">Chat Section:</Typography>
//             <List>
//               {chatMessages.map((msg) => (
//                 <ListItem key={msg.id}>
//                   <ListItemText 
//                     primary={msg.message} 
//                     secondary={`${msg.senderName} - ${msg.timestamp ? msg.timestamp.toDate().toLocaleString() : 'N/A'}`} 
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </div>
//         </Paper>
//       </div>
//     </Container>
//   );
  
// };

// export default TicketDetails;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../../firebase/firebaseconfig.js';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import Sidebar from '../Sidebar/Sidebar.js';
import './Mytickets.css';
import { Attachment } from '@mui/icons-material';
import SweetAlert from 'sweetalert2';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState(''); // Input message
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages
  const [sendersMap, setSendersMap] = useState({}); // Store sender details

  const auth = getAuth();
  const user = auth.currentUser ; // Define user here

  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (!user) {
        setError('User  is not authenticated');
        setLoading(false);
        return;
      }

      const db = getFirestore();
      const docRef = doc(db, `users/${user.uid}/TicketDetails/${ticketId}`);

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTicket({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Ticket not found.');
        }
      } catch (err) {
        setError('Error fetching ticket details.');
        console.error("Error fetching ticket details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [ticketId, user]); // Add user to the dependency array

  // Fetch chat messages in real-time from Firestore's ChatSection collection
  useEffect(() => {
    if (!user) return;

    const db = getFirestore();
    const messagesRef = collection(db, `ChatSection/${ticketId}/messages`);
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    // Listen for real-time updates
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const fetchedMessages = await Promise.all(snapshot.docs.map(async (doc) => {
        const messageData = { id: doc.id, ...doc.data() };
        // Fetch the sender details
        messageData.senderName = await fetchSenderDetails(messageData.senderId);
        return messageData;
      }));
      setChatMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [ticketId, user]); // Add user to the dependency array

  // Function to fetch the First_Name and Last_Name of a sender
  const fetchSenderDetails = async (senderId) => {
    if (sendersMap[senderId]) {
      return sendersMap[senderId]; // Return cached sender details
    }

    const db = getFirestore();
    const userRef = doc(db, `users/${senderId}`);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const { First_Name, Last_Name } = userDoc.data();
        const senderDetails = `${First_Name} ${Last_Name}`;
        setSendersMap((prevMap) => ({ ...prevMap, [senderId]: senderDetails })); // Cache sender details
        return senderDetails;
      } else {
        return 'Unknown Sender';
      }
    } catch (err) {
      console.error("Error fetching sender details:", err);
      return 'Unknown Sender';
    }
  };

  const sendMessage = async () => {
    if (!user || !newMessage.trim()) return; // Ensure user is authenticated and message isn't empty

    const newMessageData = {
      message: newMessage,              // Message content
      senderId: user.uid,               // User ID of the sender
      timestamp: serverTimestamp(),      // Firebase server timestamp
    };

    try {
      // Add a new message document to the ChatSection collection
      await addDoc(collection(db, `ChatSection/${ticketId}/messages`), newMessageData);

      // Clear the input field after sending
      setNewMessage('');
    } catch (err) {
      console.error("Error sending message:", err);
      SweetAlert.fire('Error', 'Could not send message', 'error');
    }
  };

  // Show loading or error messages
  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" className="ticket-details-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
  
      <div className={`ticket-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Paper elevation={4} className="ticket-details-paper">
          <Typography variant="h4" className="ticket-title" gutterBottom>
            {ticket.subject}
          </Typography>
  
          <Divider className="divider-spacing" />
  
          <div className="ticket-details-content">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6">Description:</Typography>
                <Typography className="ticket-description">{ticket.description}</Typography>
  
                <Divider className="divider-spacing" />
  
                <Typography variant="h6">Chat Section:</Typography>
                <div className="chat-section" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <List>
                    {chatMessages.map((msg) => (
                      <ListItem key={msg.id} style={{
                        backgroundColor: msg.senderId === user.uid ? '#d1e7dd' : '#e2e3e5',
                        alignSelf: msg.senderId === user.uid ? 'flex-end' : 'flex-start',
                        textAlign: msg.senderId === user.uid ? 'right' : 'left',
                        borderRadius: '6px',
                        marginBottom: '10px',
                        padding: '10px',
                        fontSize: '0.9rem'
                      }}>
                        <ListItemText 
                          primary={msg.message} 
                          secondary={`${msg.senderName} - ${msg.timestamp ? msg.timestamp.toDate().toLocaleString() : 'N/A'}`} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>

                <Divider className="divider-spacing" />

                <div style={{ marginTop: '20px' }}>
                  <Typography variant="h6">Reply:</Typography>
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter Message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="reply-input"
                  />
                  <Button variant="contained" color="primary" onClick={sendMessage} className="send-button">
                    Send
                  </Button>
                </div>
              </Grid>
  
              <Grid item xs={12} md={4}>
                <Paper className="ticket-info">
                  <Typography variant="h6">Ticket Info</Typography>
                  <Divider className="divider-spacing" />
                  <Typography><strong>Device Type:</strong> {ticket.deviceType || 'N/A'}</Typography>
                  <Typography><strong>Ticket ID:</strong> {ticket.id}</Typography>
                  <Typography>
                    <strong>Status:</strong> <Chip label={ticket.status || 'N/A'} color="primary" size="small" />
                  </Typography>
                  <Typography>
                    <strong>Priority:</strong>
                    <Chip label={ticket.priority || 'N/A'} color={ticket.priority === 'high' ? 'error' : ticket.priority === 'medium' ? 'warning' : 'success'} size="small" />
                  </Typography>
                  <Typography><strong>Issue Type:</strong> {ticket.issueType || 'N/A'}</Typography>
                  <Typography>
                    <Attachment fontSize="small" /> <strong>Attached File:</strong>
                    {ticket.attachmentURL && (
                      <a href={ticket.attachmentURL} target="_blank" rel="noopener noreferrer">
                        View Attachment
                      </a>
                    )}
                  </Typography>
                </Paper>
  
                <Divider className="divider-spacing" />
  
                <div className="ticket-responsibility">
 <Typography variant="h6">Responsibility</Typography>
                  <Typography>Name: {ticket.assignedTo || 'Not assigned'}</Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </Container>
  );
};

export default TicketDetails;