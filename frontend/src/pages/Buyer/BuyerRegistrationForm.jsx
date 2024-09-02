// import React, { useState } from "react";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";

// const BuyerRegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     userName: "",
//     password: "",
//     confirmPassword: "",
//     dateOfBirth: "",
//     gender: "",
//     contactNumber: "",
//     email: "",
//     district: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isFieldFocused, setIsFieldFocused] = useState({});

//   // Define validation logic
//   const validateField = (name, value) => {
//     let error = "";

//     switch (name) {
//       case "firstName":
//       case "lastName":
//       case "userName":
//         if (!/^[A-Za-z]+$/.test(value)) {
//           error = "Only alphabetic characters are allowed.";
//         }
//         break;

//       case "password":
//         if (value.length < 8 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/.test(value)) {
//           error = "Password must be at least 8 characters long and include a mix of upper, lower case letters, numbers, and special characters.";
//         }
//         break;

//       case "confirmPassword":
//         if (value !== formData.password) {
//           error = "Passwords do not match.";
//         }
//         break;

//       case "dateOfBirth":
//         const today = new Date();
//         const selectedDate = new Date(value);
//         if (selectedDate >= today) {
//           error = "Future dates are not allowed.";
//         }
//         break;

//       case "contactNumber":
//         if (!/^[\d+]+$/.test(value)) {
//           error = "Only numbers and the '+' symbol are allowed.";
//         }
//         break;

//       case "email":
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           error = "Invalid email format.";
//         }
//         break;

//       case "district":
//         if (!/^[A-Za-z\s]+$/.test(value)) {
//           error = "Only alphabetic characters are allowed.";
//         }
//         break;

//       default:
//         break;
//     }

//     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//   };

//   // Disable moving to next field if there's an error
//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     validateField(name, value);

//     if (errors[name]) {
//       setIsFieldFocused((prev) => ({ ...prev, [name]: true }));
//     }
//   };

//   // Restrict input for specific fields
//   const handleKeyDown = (e, name) => {
//     const invalidChars = {
//       firstName: /[^a-zA-Z]/,
//       lastName: /[^a-zA-Z]/,
//       userName: /[^a-zA-Z]/,
//       contactNumber: /[^0-9+]/,
//       district: /[^a-zA-Z]/,
//     };

//     if (invalidChars[name] && invalidChars[name].test(e.key)) {
//       e.preventDefault();
//     }
//   };

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Validate field after change
//     validateField(name, value);

//     // Check if field has errors
//     if (errors[name]) {
//       setIsFieldFocused((prev) => ({ ...prev, [name]: true }));
//     } else {
//       setIsFieldFocused((prev) => ({ ...prev, [name]: false }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validate all fields before submission
//     Object.keys(formData).forEach((key) => validateField(key, formData[key]));

//     const formHasErrors = Object.values(errors).some((error) => error !== "");
//     if (!formHasErrors) {
//       console.log(formData);
//       // Proceed with form submission
//     } else {
//       console.error("Form has errors.");
//     }
//   };

//   // Handle form reset
//   const handleCancel = () => {
//     setFormData({
//       firstName: "",
//       lastName: "",
//       userName: "",
//       password: "",
//       confirmPassword: "",
//       dateOfBirth: "",
//       gender: "",
//       contactNumber: "",
//       email: "",
//       district: "",
//     });
//     setErrors({});
//     setIsFieldFocused({});
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <Sidebar style={{ width: "250px" }} />
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <Header />
//         <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4" }}>
//           <div
//             style={{
//               maxWidth: "800px",
//               width: "100%",
//               backgroundColor: "#fff",
//               padding: "30px",
//               borderRadius: "10px",
//               boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <h2>Buyer Registration Form</h2>
//             <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: "bold" }}>First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   onKeyDown={(e) => handleKeyDown(e, "firstName")}
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     fontSize: "16px",
//                   }}
//                 />
//                 {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>}
//               </div>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   onKeyDown={(e) => handleKeyDown(e, "lastName")}
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     fontSize: "16px",
//                   }}
//                 />
//                 {errors.lastName && <span style={{ color: "red" }}>{errors.lastName}</span>}
//               </div>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: "bold" }}>User Name</label>
//                 <input
//                   type="text"
//                   name="userName"
//                   value={formData.userName}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   onKeyDown={(e) => handleKeyDown(e, "userName")}
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     fontSize: "16px",
//                   }}
//                 />
//                 {errors.userName && <span style={{ color: "red" }}>{errors.userName}</span>}
//               </div>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     fontSize: "16px",
//                   }}
//                 />
//                 {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
//               </div>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Confirm Password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     fontSize: "16px",
//                   }}
//                 />
//                 {errors.confirmPassword && <span style={{ color: "red" }}>{errors.confirmPassword}</span>}
//               </div>

//               <h3 style={{ textAlign: "left", color: "#333", marginBottom: "20px", gridColumn: "span 2" }}>
//                 Additional Information
//               </h3>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Date of Birth</label>
//                 <input
//                   type="date"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     fontSize: "16px",
//                   }}
//                 />
//                 {errors.dateOfBirth && <span style={{ color: "red" }}>{errors.dateOfBirth}</span>}
//               </div>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Gender</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     fontSize: "16px",
//                   }}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Contact Number</label>
//                 <input
//                   type="text"
//                   name="contactNumber"
//                   value={formData.contactNumber}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   onKeyDown={(e) => handleKeyDown(e, "contactNumber")}
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     fontSize: "16px",
//                   }}
//                 />
//                 {errors.contactNumber && <span style={{ color: "red" }}>{errors.contactNumber}</span>}
//               </div>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     fontSize: "16px",
//                   }}
//                 />
//                 {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
//               </div>

//               <div style={{ display: "flex", flexDirection: "column", gridColumn: "span 2" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: "bold" }}>District</label>
//                 <input
//                   type="text"
//                   name="district"
//                   value={formData.district}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   onKeyDown={(e) => handleKeyDown(e, "district")}
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     fontSize: "16px",
//                   }}
//                 />
//                 {errors.district && <span style={{ color: "red" }}>{errors.district}</span>}
//               </div>

//               <div style={{ gridColumn: "span 2", textAlign: "center" }}>
//                 <button
//                   type="submit"
//                   style={{
//                     backgroundColor: "#4CAF50",
//                     color: "white",
//                     padding: "10px 20px",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     fontSize: "16px",
//                     marginRight: "10px",
//                   }}
//                 >
//                   Submit
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   style={{
//                     backgroundColor: "#f44336",
//                     color: "white",
//                     padding: "10px 20px",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyerRegistrationForm;
