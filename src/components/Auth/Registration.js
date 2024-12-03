// import React, { useState } from 'react';
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Grid,
//   InputAdornment,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import BusinessIcon from '@mui/icons-material/Business';
// import { FaUserCircle } from 'react-icons/fa';
// import axios from 'axios';
// import Swal from 'sweetalert2'; // Import SweetAlert2
// import './Registration.css';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     First_Name: '',
//     Last_Name: '',
//     Email: '',
//     password: '',
//     confirmPassword: '',
//     Mobile_Number: '',
//     Organization: '',
//     Circle: '',
//     Employee_ID: '',
//     Other_Organization: '', // New field for other organization
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const allowedEmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo)\.com$/;
//   const passwordCriteria = [
//     { label: "At least 6 characters", test: /.{6,}/ },
//     { label: "At least 1 uppercase letter", test: /[A-Z]/ },
//     { label: "At least 1 lowercase letter", test: /[a-z]/ },
//     { label: "At least 1 number", test: /[0-9]/ },
//     { label: "At least 1 special character", test: /[!@#$%^&*(),.?":{}|<>]/ },
//   ];
  

//   // const passwordCriteria = {
//   //   label: "At least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
//   //   test: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/
//   // };

//   const validate = () => {
//     let tempErrors = {};

//     if (!formData.First_Name) tempErrors.First_Name = 'First name is required';
//     if (!formData.Last_Name) tempErrors.Last_Name = 'Last name is required';
//     if (!formData.Email) tempErrors.Email = 'Email is required';
//     else if (!allowedEmailRegex.test(formData.Email)) tempErrors.Email = 'Email must be a Gmail, Outlook, or Yahoo address';

//     if (!formData.password) {
//       tempErrors.password = 'Password is required';
//     } else {
//       const passwordValidations = passwordCriteria.map(criteria => ({
//         ...criteria,
//         valid: criteria.test.test(formData.password),
//       }));

//       passwordValidations.forEach(({ label, valid }) => {
//         if (!valid) {
//           if (!tempErrors.password) tempErrors.password = [];
//           tempErrors.password.push(label);
//         }
//       });

//       if (tempErrors.password) {
//         tempErrors.password = `Password must meet the following criteria: ${tempErrors.password.join(', ')}`;
//       }
//     }

//     if (!formData.confirmPassword) tempErrors.confirmPassword = 'Please confirm your password';
//     else if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

//     if (!formData.Mobile_Number) tempErrors.Mobile_Number = 'Phone number is required';
//     else if (!/^\d{10}$/.test(formData.Mobile_Number)) tempErrors.Mobile_Number = 'Phone number must be 10 digits';

//     if (!formData.Organization) tempErrors.Organization = 'Organization is required';
//     if (formData.Organization === 'Others' && !formData.Other_Organization) {
//       tempErrors.Other_Organization = 'Please specify your organization';
//     }

//     if (!formData.Employee_ID) tempErrors.Employee_ID = 'Employee ID is required';

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (validate()) {
//   //     try {
//   //       const response = await axios.post('http://localhost:1760/auth/register', {
//   //         ...formData,
//   //       });
//   //       setSuccessMessage(response.data.message);
//   //       setErrorMessage('');
        
//   //       // Show SweetAlert
//   //       Swal.fire({
//   //         title: 'Success!',
//   //         text: 'User  registered successfully!',
//   //         icon: 'success',
//   //         confirmButtonText: 'OK',
//   //       }).then(() => {
//   //         // Redirect to login page
//   //         window.location.href = '/'; // Change this to your login page route
//   //       });

//   //       // Reset form fields
//   //       setFormData({
//   //         First_Name: '',
//   //         Last_Name: '',
//   //         Email: '',
//   //         password: '',
//   //         confirmPassword: '',
//   //         Mobile_Number: '',
//   //         Organization: '',
//   //         Circle: '',
//   //         Employee_ID: '',
//   //         Other_Organization: '', // Reset new field
//   //       });
//   //     } catch (error) {
//   //       setErrorMessage(error.response.data.message || 'Something went wrong');
//   //       setSuccessMessage('');
//   //     }
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         // Prepare the data to send to the backend
//         const dataToSend = {
//           ...formData,
//           Organization: formData.Organization === 'Others' ? formData.Other_Organization : formData.Organization,
//         };
  
//         const response = await axios.post('https://trt-api-1x35dd1hz-sakgis-projects.vercel.app/auth/register', dataToSend);
//         setSuccessMessage(response.data.message);
//         setErrorMessage('');
        
//         // Show SweetAlert
//         Swal.fire({
//           title: 'Success!',
//           text: 'User  registered successfully!',
//           icon: 'success',
//           confirmButtonText: 'OK',
//         }).then(() => {
//           // Redirect to login page
//           window.location.href = '/'; // Change this to your login page route
//         });
  
//         // Reset form fields
//         setFormData({
//           First_Name: '',
//           Last_Name: '',
//           Email: '',
//           password: '',
//           confirmPassword: '',
//           Mobile_Number: '',
//           Organization: '',
//           Circle: '',
//           Employee_ID: '',
//           Other_Organization: '', // Reset new field
//         });
//       } catch (error) {
//         setErrorMessage(error.response.data.message || 'Something went wrong');
//         setSuccessMessage('');
//       }
//     }
//   };
//   return (
//     <div className="root">
//       <Container component="main" maxWidth="xs">
//         <div className="formContainer">
//           <div style={{ textAlign: 'center' }}>
//             <FaUserCircle size={50} color="#1976d2" />
//             <Typography component="h1" variant="h5" className="title">
//               Registration
//             </Typography>
//           </div>
//           {successMessage && <Typography color="green">{successMessage}</Typography>}
//           {errorMessage && <Typography color="red">{errorMessage}</Typography>}
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   label="First Name"
//                   name="First_Name"
//                   autoComplete="given-name"
//                   autoFocus
//                   value={formData.First_Name}
//                   onChange={handleChange}
//                   error={!!errors.First_Name}
//                   helperText={errors.First_Name}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   label="Last Name"
//                   name="Last_Name"
//                   autoComplete="family-name"
//                   value={formData.Last_Name}
//                   onChange={handleChange}
//                   error={!!errors.Last_Name}
//                   helperText={errors.Last_Name}
//                 />
//               </Grid>
//             </Grid>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Email Address"
//               name="Email"
//               autoComplete="email"
//               value={formData.Email}
//               onChange={handleChange}
//               error={!!errors.Email}
//               helperText={errors.Email}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   label="Phone Number"
//                   name="Mobile_Number"
//                   value={formData.Mobile_Number}
//                   onChange={handleChange}
//                   error={!!errors.Mobile_Number}
//                   helperText={errors.Mobile_Number}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PhoneIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               {/* <Grid item xs={6}>
//                 <FormControl variant="outlined" fullWidth margin="normal">
//                   <InputLabel>Organization</InputLabel>
//                   <Select
//                     label="Organization"
//                     name="Organization"
//                     value={formData.Organization}
//                     onChange={handleChange}
//                   >
//                     <MenuItem value="Insta IGR">Insta IGR</MenuItem>
//                     <MenuItem value="Others">Others</MenuItem>
//                   </Select>
//                 </FormControl>
//                 {formData.Organization === 'Others' && (
//                   <TextField
//                     variant="outlined"
//                     margin="normal"
//                     fullWidth
//                     label="Type your Organization"
//                     name="Other_Organization"
//                     value={formData.Other_Organization}
//                     onChange={handleChange}
//                     error={!!errors.Other_Organization}
//                     helperText={errors.Other_Organization}
//                   />
//                 )}
//               </Grid> */}
//               <Grid item xs={6}>
//   <FormControl variant="outlined" fullWidth margin="normal">
//     <InputLabel>Organization</InputLabel>
//     <Select
//       label="Organization"
//       name="Organization"
//       value={formData.Organization}
//       onChange={handleChange}
//     >
//       <MenuItem value="Insta IGR">Insta IGR</MenuItem>
//       <MenuItem value="Others">Others</MenuItem>
//     </Select>
//   </FormControl>
//   {formData.Organization === 'Others' && (
//     <TextField
//       variant="outlined"
//       margin="normal"
//       fullWidth
//       label="Type your Organization"
//       name="Other_Organization"
//       value={formData.Other_Organization}
//       onChange={handleChange}
//       error={!!errors.Other_Organization}
//       helperText={errors.Other_Organization}
//     />
//   )}
// </Grid>
//             </Grid>

//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Employee ID"
//               name="Employee_ID"
//               value={formData.Employee_ID}
//               onChange={handleChange}
//               error={!!errors.Employee_ID}
//               helperText={errors.Employee_ID}
//             />

//             <FormControl variant="outlined" fullWidth margin="normal" className="inputField">
//               <InputLabel>IGR Maharashtra </InputLabel>
//               <Select
//                 label="Circle"
//                 name="Circle"
//                 value={formData.Circle}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="MP">Madhya Pradesh</MenuItem>
//                 <MenuItem value="UPW">UP West</MenuItem>
//                 <MenuItem value="UPE">UP East</MenuItem>
//                 <MenuItem value="RJ">Rajasthan</MenuItem>
//                 <MenuItem value="GUJ">Gujrat</MenuItem>
//                 <MenuItem value="MH">Maharashtra</MenuItem>
//                 <MenuItem value="BH">Bihar</MenuItem>
//                 <MenuItem value="ROB">Rest of Bengal</MenuItem>
//                 <MenuItem value="PNB">Punjab</MenuItem>
//                 <MenuItem value="KTK">Karnataka</MenuItem>
//                 <MenuItem value="MUM">Mumbai</MenuItem>
//                 <MenuItem value="CH">Chennai</MenuItem>
//                 <MenuItem value="JH">Jharkand</MenuItem>
//                 <MenuItem value="KOC">Kolkata</MenuItem>
//                 <MenuItem value="HP">Himachal Pradesh</MenuItem>
//                 <MenuItem value="AP">Andhra Pradesh</MenuItem>
//                 <MenuItem value="ROTN">Rest of Tamil Nadu</MenuItem>
//                 <MenuItem value="KE">Kerala</MenuItem>
//               </Select>
//             </FormControl>

//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               error={!!errors.password}
//               helperText={errors.password}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockOutlinedIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Confirm Password"
//               name="confirmPassword"
//               type="password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               error={!!errors.confirmPassword}
//               helperText={errors.confirmPassword}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockOutlinedIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <List>
//               {passwordCriteria.map((criteria, index) => (
//                 <ListItem key={index}>
//                   <ListItemText primary={criteria.label} />
//                 </ListItem>
//               ))}
//             </List>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className="submitButton"
//               style={{ marginBottom: '15px' }}
//             >
//               Sign Up
//             </Button>
//             <Link href="/" variant="body2" className="link">
//               Already have an account? Sign In
//             </Link>
//           </form>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default RegistrationForm;





// import React, { useState } from 'react';
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Grid,
//   InputAdornment,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import { FaUserCircle } from 'react-icons/fa';
// import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import eye icons
// import Swal from 'sweetalert2'; // Import SweetAlert2
// import { auth, db } from '../../firebase/firebaseconfig'; // Import Firebase configuration
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import './Registration.css';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     First_Name: '',
//     Last_Name: '',
//     Email: '',
//     password: '',
//     confirmPassword: '',
//     Mobile_Number: '',
//     Organization: '',
//     Circle: '',
//     Employee_ID: '',
//     Other_Organization: '', // New field for other organization
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

//   const passwordCriteria = [
//     { label: "At least 6 characters", test: /.{6,}/ },
//     { label: "At least 1 uppercase letter", test: /[A-Z]/ },
//     { label: "At least 1 lowercase letter", test: /[a-z]/ },
//     { label: "At least 1 number", test: /[0-9]/ },
//     { label: "At least 1 special character", test: /[!@#$%^&*(),.?":{}|<>]/ },
//   ];

//   const validate = () => {
//     let tempErrors = {};
//     if (!formData.First_Name) tempErrors.First_Name = 'First name is required';
//     if (!formData.Last_Name) tempErrors.Last_Name = 'Last name is required';
//     if (!formData.Email) tempErrors.Email = 'Email is required';

//     if (!formData.password) {
//       tempErrors.password = 'Password is required';
//     } else {
//       const invalidCriteria = passwordCriteria.filter((criteria) => !criteria.test.test(formData.password));
//       if (invalidCriteria.length > 0) {
//         tempErrors.password = `Password must meet the following criteria: ${invalidCriteria.map((c) => c.label).join(', ')}`;
//       }
//     }

//     if (!formData.confirmPassword) tempErrors.confirmPassword = 'Please confirm your password';
//     else if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

//     if (!formData.Mobile_Number) tempErrors.Mobile_Number = 'Phone number is required';
//     else if (!/^\d{10}$/.test(formData.Mobile_Number)) tempErrors.Mobile_Number = 'Phone number must be 10 digits';

//     if (!formData.Organization) tempErrors.Organization = 'Organization is required';
//     if (formData.Organization === 'Others' && !formData.Other_Organization) {
//       tempErrors.Other_Organization = 'Please specify your organization';
//     }

//     if (!formData.Employee_ID) tempErrors.Employee_ID = 'Employee ID is required';

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         // Register user with Firebase Authentication
//         const userCredential = await createUserWithEmailAndPassword(auth, formData.Email, formData.password);
  
//         // Add user details to Firestore
//         const user = userCredential.user;
//         const userData = {
//           First_Name: formData.First_Name,
//           Last_Name: formData.Last_Name,
//           Email: formData.Email,
//           password: formData.password,
//           Mobile_Number: formData.Mobile_Number,
//           Organization: formData.Organization === 'Others' ? formData.Other_Organization : formData.Organization,
//           Circle: formData.Circle,
//           Employee_ID: formData.Employee_ID,
//           uid: user.uid,
//           role: 'User ',
//         };
  
//         await setDoc(doc(db, 'users', user.uid), userData);
  
//         // Show success message
//         Swal.fire({
//           title: 'Success!',
//           text: 'User  registered successfully!',
//           icon: 'success',
//           confirmButtonText: 'OK',
//         }).then(() => {
//           window.location.href = '/'; // Redirect to login page
//         });
  
//         // Reset form
//         setFormData({
//           First_Name: '',
//           Last_Name: '',
//           Email: '',
//           password: '',
//           confirmPassword: '',
//           Mobile_Number: '',
//           Organization: '',
//           Circle: '',
//           Employee_ID: '',
//           Other_Organization: '',
//         });
//         setSuccessMessage('User  registered successfully!');
//         setErrorMessage('');
//       } catch (error) {
//         // Handle specific Firebase errors
//         if (error.code === 'auth/email-already-in-use') {
//           Swal.fire({
//             title: 'Error!',
//             text: 'Email already exists. Please use a different email.',
//             icon: 'error',
//             confirmButtonText: 'OK',
//           });
//         } else {
//           setErrorMessage(error.message || 'Something went wrong');
//           setSuccessMessage('');
//         }
//       }
//     }
//   };

//   return (
//     <div className="root">
//       <Container component="main" maxWidth="xs">
//         <div className="formContainer">
//           <div style={{ textAlign: 'center' }}>
//             <FaUserCircle size={50} color="#1976d2" />
//             <Typography component="h1" variant="h5" className="title">
//               Registration
//             </Typography>
//           </div>
//           {successMessage && <Typography color="green">{successMessage}</Typography>}
//           {errorMessage && <Typography color="red">{errorMessage}</Typography>}
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   label="First Name"
//                   name="First_Name"
//                   autoComplete="given-name"
//                   autoFocus
//                   value={formData.First_Name}
//                   onChange={handleChange}
//                   error={!!errors.First_Name}
//                   helperText={errors.First_Name}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   label="Last Name"
//                   name="Last_Name"
//                   autoComplete="family-name"
//                   value={formData.Last_Name}
//                   onChange={handleChange}
//                   error={!!errors.Last_Name}
//                   helperText={errors.Last_Name}
//                 />
//               </Grid>
//             </Grid>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Email Address"
//               name="Email"
//               autoComplete="email"
//               value={formData.Email}
//               onChange={handleChange}
//               error={!!errors.Email}
//               helperText={errors.Email}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   label="Phone Number"
//                   name="Mobile_Number"
//                   value={formData.Mobile_Number}
//                   onChange={handleChange}
//                   error={!!errors.Mobile_Number}
//                   helperText={errors.Mobile_Number}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PhoneIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <FormControl variant="outlined" fullWidth margin="normal">
//                   <InputLabel>Organization</InputLabel>
//                   <Select
//                     label="Organization"
//                     name="Organization"
//                     value={formData.Organization}
//                     onChange={handleChange}
//                   >
//                     <MenuItem value="Insta ICT">Insta ICT</MenuItem>
//                     <MenuItem value="Insta IGR">Insta IGR</MenuItem>
//                     <MenuItem value="Others">Others</MenuItem>
//                   </Select>
//                 </FormControl>
//                 {formData.Organization === 'Others' && (
//                   <TextField
//                     variant="outlined"
//                     margin="normal"
//                     fullWidth
//                     label="Type your Organization"
//                     name="Other_Organization"
//                     value={formData.Other_Organization}
//                     onChange={handleChange}
//                     error={!!errors.Other_Organization}
//                     helperText={errors.Other_Organization}
//                   />
//                 )}
//               </Grid>
//             </Grid>

//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Employee ID"
//               name="Employee_ID"
//               value={formData.Employee_ID}
//               onChange={handleChange}
//               error={!!errors.Employee_ID}
//               helperText={errors.Employee_ID}
//             />

//             <FormControl variant="outlined" fullWidth margin="normal" className="inputField">
//               <InputLabel>Circle</InputLabel>
//               <Select
//                 label="Circle"
//                 name="Circle"
//                 value={formData.Circle}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="MP">Madhya Pradesh</MenuItem>
//                 <MenuItem value="UPW">UP West</MenuItem>
//                 <MenuItem value="UPE">UP East</MenuItem>
//                 <MenuItem value="RJ">Rajasthan</MenuItem>
//                 <MenuItem value="GUJ">Gujrat</MenuItem>
//                 <MenuItem value="MH">Maharashtra</MenuItem>
//                 <MenuItem value="pune">Corporate Office Pune</MenuItem>
//                 <MenuItem value="BH">Bihar</MenuItem>
//                 <MenuItem value="ROB">Rest of Bengal</MenuItem>
//                 <MenuItem value="PNB">Punjab</MenuItem>
//                 <MenuItem value="KTK">Karnataka</MenuItem>
//                 <MenuItem value="MUM">Mumbai</MenuItem>
//                 <MenuItem value="CH">Chennai</MenuItem>
//                 <MenuItem value="JH">Jharkand</MenuItem>
//                 <MenuItem value="KOC">Kolkata</MenuItem>
//                 <MenuItem value="HP">Himachal Pradesh</MenuItem>
//                 <MenuItem value="AP">Andhra Pradesh</MenuItem>
//                 <MenuItem value="ROTN">Rest of Tamil Nadu</MenuItem>
//                 <MenuItem value="KE">Kerala</MenuItem>
//               </Select>
//             </FormControl>

//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Password"
//               name="password"
//               type={showPassword ? "text" : "password"} // Toggle between text and password
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               error={!!errors.password}
//               helperText={errors.password}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockOutlinedIcon />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <Button onClick={() => setShowPassword(!showPassword)}>
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </Button>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Confirm Password"
//               name="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               error={!!errors.confirmPassword}
//               helperText={errors.confirmPassword}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockOutlinedIcon />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <Button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                       {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
//                     </Button>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <List>
//               {passwordCriteria.map((criteria, index) => (
//                 <ListItem key={index}>
//                   <ListItemText primary={criteria.label} />
//                 </ListItem>
//               ))}
//             </List>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className="submitButton"
//               style={{ marginBottom: '15px' }}
//             >
//               Sign Up
//             </Button>
//             <Link href="/" variant="body2" className="link">
//               Already have an account? Sign In
//             </Link>
//           </form>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default RegistrationForm;
  


import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { FaUserCircle } from 'react-icons/fa';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { auth, db } from '../../firebase/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, query, where, getDocs, collection } from 'firebase/firestore';
import './Registration.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Email: '',
    password: '',
    confirmPassword: '',
    Mobile_Number: '',
    Organization: '',
    Circle: '',
    Employee_ID: '',
    Other_Organization: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordCriteria = [
    { label: "At least 6 characters", test: /.{6,}/ },
    { label: "At least 1 uppercase letter", test: /[A-Z]/ },
    { label: "At least 1 lowercase letter", test: /[a-z]/ },
    { label: "At least 1 number", test: /[0-9]/ },
    { label: "At least 1 special character", test: /[!@#$%^&*(),.?":{}|<>]/ },
  ];

  const validate = () => {
    let tempErrors = {};
    if (!formData.First_Name) tempErrors.First_Name = 'First name is required';
    if (!formData.Last_Name) tempErrors.Last_Name = 'Last name is required';
    if (!formData.Email) tempErrors.Email = 'Email is required';

    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else {
      const invalidCriteria = passwordCriteria.filter((criteria) => !criteria.test.test(formData.password));
      if (invalidCriteria.length > 0) {
        tempErrors.password = `Password must meet the following criteria: ${invalidCriteria.map((c) => c.label).join(', ')}`;
      }
    }

    if (!formData.confirmPassword) tempErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

    if (!formData.Mobile_Number) tempErrors.Mobile_Number = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.Mobile_Number)) tempErrors.Mobile_Number = 'Phone number must be 10 digits';

    if (!formData.Organization) tempErrors.Organization = 'Organization is required';
    if (formData.Organization === 'Others' && !formData.Other_Organization) {
      tempErrors.Other_Organization = 'Please specify your organization';
    }

    if (!formData.Employee_ID) tempErrors.Employee_ID = 'Employee ID is required';

    if (!formData.Circle) tempErrors.Circle = 'Circle is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const isEmployeeIdTaken = async (employeeId) => {
    const q = query(collection(db, 'users'), where('Employee_ID', '==', employeeId));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const employeeIdTaken = await isEmployeeIdTaken(formData.Employee_ID);
        if (employeeIdTaken) {
          setLoading(false);
          setErrors((prevErrors) => ({
            ...prevErrors,
            Employee_ID: 'Employee ID is already registered',
          }));
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, formData.Email, formData.password);
        const user = userCredential.user;
        const userData = {
          First_Name: formData.First_Name,
          Last_Name: formData.Last_Name,
          Email: formData.Email,
          password: formData.password,
          Mobile_Number: formData.Mobile_Number,
          Organization: formData.Organization === 'Others' ? formData.Other_Organization : formData.Organization,
          Circle: formData.Circle,
          Employee_ID: formData.Employee_ID,
          uid: user.uid,
          role: 'User ',
        };

        await setDoc(doc(db, 'users', user.uid), userData);

        Swal.fire({
          title: 'Success!',
          text: 'User  registered successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          setLoading(false);
          window.location.href = '/';
        });

        setFormData({
          First_Name: '',
          Last_Name: '',
          Email: '',
          password: '',
          confirmPassword: '',
          Mobile_Number: '',
          Organization: '',
          Circle: '',
          Employee_ID: '',
          Other_Organization: '',
        });
        setSuccessMessage('User  registered successfully!');
        setErrorMessage('');
      } catch (error) {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          Swal.fire({
            title: 'Error!',
            text: 'Email already exists. Please use a different email.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          setErrorMessage(error.message || 'Something went wrong');
          setSuccessMessage('');
        }
      }
    }
  };

  return (
    <div className="root">
      <Container component="main" maxWidth="xs">
        <div className="formContainer">
          <div style={{ textAlign: 'center' }}>
            <FaUserCircle size={50} color="#1976d2" />
            <Typography component="h1" variant="h5" className="title">
              Registration
            </Typography>
          </div>
          {successMessage && <Typography color="green">{successMessage}</Typography>}
          {errorMessage && <Typography color="red">{errorMessage}</Typography>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="First Name"
                  name="First_Name"
                  autoComplete="given-name"
                  autoFocus
                  value={formData.First_Name}
                  onChange={handleChange}
                  error={!!errors.First_Name}
                  helperText={errors.First_Name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Last Name"
                  name="Last_Name"
                  autoComplete="family-name"
                  value={formData.Last_Name}
                  onChange={handleChange}
                  error={!!errors.Last_Name}
                  helperText={errors.Last_Name}
                />
              </Grid>
            </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="Email"
              autoComplete="email"
              value={formData.Email}
              onChange={handleChange}
              error={!!errors.Email}
              helperText={errors.Email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Phone Number"
                  name="Mobile_Number"
                  value={formData.Mobile_Number}
                  onChange={handleChange}
                  error={!!errors.Mobile_Number}
                  helperText={errors.Mobile_Number}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel>Organization</InputLabel>
                  <Select
                    label="Organization"
                    name="Organization"
                    value={formData.Organization}
                    onChange={handleChange}
                    error={!!errors.Organization}
                  >
                    <MenuItem value="Insta ICT">Insta ICT</MenuItem>
                    <MenuItem value="Insta IGR">Insta IGR</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                  {errors.Organization && <Typography color="red">{errors.Organization}</Typography>}
                </FormControl>
                {formData.Organization === 'Others' && (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Type your Organization"
                    name="Other_Organization"
                    value={formData.Other_Organization}
                    onChange={handleChange}
                    error={!!errors.Other_Organization}
                    helperText={errors.Other_Organization}
                  />
                )}
              </Grid>
            </Grid>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Employee ID"
              name="Employee_ID"
              value={formData.Employee_ID}
              onChange={handleChange}
              error={!!errors.Employee_ID}
              helperText={errors.Employee_ID}
            />

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Circle</InputLabel>
              <Select
                label="Circle"
                name="Circle"
                value={formData.Circle}
                onChange={handleChange}
                error={!!errors.Circle}
              >
                <MenuItem value="MP">Madhya Pradesh</MenuItem>
                <MenuItem value="UPW">UP West</MenuItem>
                <MenuItem value="UPE">UP East</MenuItem>
                <MenuItem value="RJ">Rajasthan</MenuItem>
                <MenuItem value="GUJ">Gujrat</MenuItem>
                <MenuItem value="MH">Maharashtra</MenuItem>
                <MenuItem value="pune">Corporate Office Pune</MenuItem>
                <MenuItem value="BH">Bihar</MenuItem>
                <MenuItem value="ROB">Rest of Bengal</MenuItem>
                <MenuItem value="PNB">Punjab</MenuItem>
                <MenuItem value="KTK">Karnataka</MenuItem>
                <MenuItem value="MUM">Mumbai</MenuItem>
                <MenuItem value="CH">Chennai</MenuItem>
                <MenuItem value="JH">Jharkand</MenuItem>
                <MenuItem value="KOC">Kolkata</MenuItem>
                <MenuItem value="HP">Himachal Pradesh</MenuItem>
                <MenuItem value="AP">Andhra Pradesh</MenuItem>
                <MenuItem value="ROTN">Rest of Tamil Nadu</MenuItem>
                <MenuItem value="KE">Kerala</MenuItem>
              </Select>
              {errors.Circle && <Typography color="red">{errors.Circle}</Typography>}
            </FormControl>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <List>
              {passwordCriteria.map((criteria, index) => (
                <ListItem key={index}>
                  <ListItemText primary={criteria.label} />
                </ListItem>
              ))}
            </List>
            <Button
              type="submit"
              full Width
              variant="contained"
              color="primary"
              className="submitButton"
              style={{ marginBottom: '15px' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
            <Link href="/" variant="body2" className="link">
              Already have an account? Sign In
            </Link>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default RegistrationForm;