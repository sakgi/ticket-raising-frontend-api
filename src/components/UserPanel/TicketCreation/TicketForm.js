// import React, { useState } from 'react';
// import './TicketForm.css';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { getAuth } from 'firebase/auth';
// import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
// import { db, storage } from '../../../firebase/firebaseconfig';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions

// function TicketForm() {
//   const navigate = useNavigate();
//   const [subject, setSubject] = useState('');
//   const [deviceType, setDeviceType] = useState('');
//   const [issueType, setIssueType] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [attachment, setAttachment] = useState(null);
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState('');
//   const [formErrors, setFormErrors] = useState('');
//   const [loading, setLoading] = useState(false); // Add a loading state

//   // Format the date to ensure it's in DD/MM/YYYY format
//   const formatDate = (date) => {
//     const day = String(date.getDate()).padStart(2, '0');  // Ensure day is 2 digits
//     const month = String(date.getMonth() + 1).padStart(2, '0');  // Ensure month is 2 digits
//     const year = date.getFullYear(); // Get full year (e.g., 2024)
//     return `${day}/${month}/${year}`;
//   };

//   const handleAttachmentChange = (e) => {
//     const file = e.target.files[0]; // Get the selected file
//     const maxSizeInMB = 5; // Maximum file size in MB
//     const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert MB to bytes

//     if (file) {
//       if (file.size > maxSizeInBytes) {
//         Swal.fire({
//           title: 'Error!',
//           text: `File size exceeds ${maxSizeInMB} MB. Please select a smaller file.`,
//           icon: 'error',
//           confirmButtonText: 'OK',
//         });
//         e.target.value = ''; // Clear the input
//       } else {
//         setAttachment(file); // Store the file in state
//       }
//     }
//   };

//   const generateTicketID = async () => {
//     const currentYear = new Date().getFullYear().toString().slice(-2);
//     const currentMonth = (`0${new Date().getMonth() + 1}`).slice(-2);

//     const counterDocRef = doc(db, 'ticketCounter', 'INSTAU');
//     const counterDoc = await getDoc(counterDocRef);

//     let serialNumber = 1;
//     if (counterDoc.exists()) {
//       const data = counterDoc.data();
//       if (data.year === currentYear && data.month === currentMonth) {
//         serialNumber = data.lastUsed + 1;
//       }
//     }

//     const paddedSerial = String(serialNumber).padStart(3, '0');
//     const ticketID = `INSTAU${currentYear}${currentMonth}${paddedSerial}`;

//     await setDoc(counterDocRef, {
//       lastUsed: serialNumber,
//       year: currentYear,
//       month: currentMonth,
//     });

//     return ticketID;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!subject || !deviceType || !issueType)  {
//       setFormErrors('Please fill all mandatory fields');
//       return;
//     }

//     setFormErrors('');
//     setLoading(true); // Start loading

//     try {
//       const ticketID = await generateTicketID();
//       const createdAt = new Date();
//       const auth = getAuth();
//       const currentUser  = auth.currentUser ;

//       if (!currentUser ) {
//         setFormErrors('User  not authenticated');
//         setLoading(false); // Stop loading
//         return;
//       }

//       // Format date with leading zeros
//       const formattedDate = formatDate(createdAt);

//       let downloadURL = null; // Initialize downloadURL to null
//       if (attachment) {
//         const storageRef = ref(storage, `ticket_attachments/${currentUser .uid}/${ticketID}/${attachment.name}`);
//         await uploadBytes(storageRef, attachment);

//         // Get the download URL after file upload
//         downloadURL = await getDownloadURL(storageRef);
//       }

//       const ticketData = {
//         subject,
//         deviceType,
//         createdBy: currentUser .uid,
//         issueType,
//         description,
//         attachmentURL: downloadURL,  // Store the download URL if available
//  createdAt: Timestamp.fromDate(new Date()),
//         priority: priority || null,
//         time: createdAt.toLocaleTimeString(),
//         date: formattedDate,  // Use custom formatted date
//         status: 'Raised',
//         assignedTo: null,
//         assignedId: null,
//         assignedName: null,
//       };

//       // Store in TicketDetails subcollection for the current user
//       const userDocRef = doc(db, 'users', currentUser .uid, 'TicketDetails', ticketID);
//       await setDoc(userDocRef, ticketData);

//       // Store in TicketList collection using ticketID as document ID
//       const ticketListDocRef = doc(db, 'TicketList', ticketID);
//       await setDoc(ticketListDocRef, ticketData);

//       Swal.fire({
//         title: 'Success!',
//         html: `Your ticket has been raised successfully!<br><br>Your Ticket ID: <strong>${ticketID}</strong>`,
//         icon: 'success',
//         confirmButtonText: 'OK',
//       }).then(() => {
//         setLoading(false); // Stop loading
//         navigate('/user-dashboard/mytickets');
//       });
//     } catch (error) {
//       console.error('Error raising ticket:', error);
//       setFormErrors(`An error occurred while raising the ticket: ${error.message}`);
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="new-ticket-container">
//       <h2>Raise New Ticket</h2>
//       <form onSubmit={handleSubmit} className="ticket-form">
//         <div>
//           <label>Subject (*): </label>
//           <input
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Device Type (*): </label>
//           <select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required>
//             <option value="">Select Device Type</option>
//             <option value="Mobile">Mobile</option>
//             <option value="Laptop">Laptop</option>
//             <option value="Network">Network</option>
//             <option value="Printer">Printer</option>
//             <option value="Router">Router</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label>Issue Type (*): </label>
//           <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required>
//             <option value="">Select Issue Type</option>
//             <option value="Software">Software</option>
//             <option value="Hardware">Hardware</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label>Attachment: </label>
//           <input type="file" onChange={handleAttachmentChange} />
//         </div>

//         <div>
//           <label>Description: </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows="4"
//           />
//         </div>

//         {formErrors && <p className="error-message">{formErrors}</p>}

//         <div className="button-group">
//           <button type="submit" className="submit-button" disabled={loading}>
//             {loading ? 'Submitting...' : 'Raise Ticket'}
//           </button>
//           <button type="button" className="cancel-button" onClick={() => navigate('/user-dashboard/mytickets')}>Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default TicketForm;






//optimized code
import React, { useState } from 'react';
import './TicketForm.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { db, storage } from '../../../firebase/firebaseconfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function TicketForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    deviceType: '',
    issueType: '',
    phoneNumber: '',
    description: '',
    priority: '',
    attachment: null,
  });
  const [formErrors, setFormErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const formatDate = (date) =>
    `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    const maxSizeInMB = 5;

    if (file && file.size > maxSizeInMB * 1024 * 1024) {
      Swal.fire({
        title: 'Error!',
        text: `File size exceeds ${maxSizeInMB} MB. Please select a smaller file.`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
      e.target.value = '';
    } else {
      setFormData({ ...formData, attachment: file });
    }
  };

  const generateTicketID = async () => {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const currentMonth = (`0${new Date().getMonth() + 1}`).slice(-2);

    const counterDocRef = doc(db, 'ticketCounter', 'INSTAU');
    const counterDoc = await getDoc(counterDocRef);

    const serialNumber =
      counterDoc.exists() &&
      counterDoc.data().year === currentYear &&
      counterDoc.data().month === currentMonth
        ? counterDoc.data().lastUsed + 1
        : 1;

    const paddedSerial = String(serialNumber).padStart(3, '0');
    await setDoc(counterDocRef, { lastUsed: serialNumber, year: currentYear, month: currentMonth });

    return `INSTAU${currentYear}${currentMonth}${paddedSerial}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.deviceType || !formData.issueType) {
      setFormErrors('Please fill all mandatory fields');
      return;
    }

    setLoading(true);
    setFormErrors('');

    try {
      const ticketID = await generateTicketID();
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const createdAt = new Date();
      const formattedDate = formatDate(createdAt);

      let attachmentURL = null;
      if (formData.attachment) {
        const storageRef = ref(storage, `ticket_attachments/${currentUser.uid}/${ticketID}/${formData.attachment.name}`);
        await uploadBytes(storageRef, formData.attachment);
        attachmentURL = await getDownloadURL(storageRef);
      }

      const ticketData = {
        subject: formData.subject,
        deviceType: formData.deviceType,
        createdBy: currentUser.uid,
        issueType: formData.issueType,
        description: formData.description,
        attachmentURL,
        createdAt: Timestamp.fromDate(createdAt),
        priority: formData.priority || null,
        time: createdAt.toLocaleTimeString(),
        date: formattedDate,
        status: 'Raised',
        assignedTo: null,
        assignedId: null,
        assignedName: null,
      };

      const userDocRef = doc(db, 'users', currentUser.uid, 'TicketDetails', ticketID);
      const ticketListDocRef = doc(db, 'TicketList', ticketID);

      await Promise.all([setDoc(userDocRef, ticketData), setDoc(ticketListDocRef, ticketData)]);

      Swal.fire({
        title: 'Success!',
        html: `Your ticket has been raised successfully!<br><br>Your Ticket ID: <strong>${ticketID}</strong>`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => navigate('/user-dashboard/mytickets'));
    } catch (error) {
      console.error('Error raising ticket:', error);
      setFormErrors(`An error occurred while raising the ticket: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-ticket-container">
      <h2>Raise New Ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div>
          <label>Subject (*): </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Device Type (*): </label>
          <select name="deviceType" value={formData.deviceType} onChange={handleInputChange} required>
            <option value="">Select Device Type</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Network">Network</option>
            <option value="Printer">Printer</option>
            <option value="Router">Router</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Issue Type (*): </label>
          <select name="issueType" value={formData.issueType} onChange={handleInputChange} required>
            <option value="">Select Issue Type</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Attachment: </label>
          <input type="file" onChange={handleAttachmentChange} />
        </div>

        <div>
          <label>Description: </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        {formErrors && <p className="error-message">{formErrors}</p>}

        <div className="button-group">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Raise Ticket'}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/user-dashboard/mytickets')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TicketForm;
