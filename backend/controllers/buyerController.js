// // controllers/buyerController.js
// const Buyer = require('../models/buyer');
// const bcrypt = require('bcryptjs');
 
// // Create a new buyer
// exports.registerBuyer = async (req, res) => {
//   try {
//     const { firstName, lastName, userName, password, confirmPassword, dateOfBirth, gender, contactNumber, emailAddress } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     // Check if buyer already exists
//     const existingBuyer = await Buyer.findOne({ emailAddress });
//     if (existingBuyer) {
//       return res.status(400).json({ message: 'Buyer already exists with this email' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new buyer instance
//     const buyer = new Buyer({
//       firstName,
//       lastName,
//       userName,
//       password: hashedPassword,
//       dateOfBirth,
//       gender,
//       contactNumber,
//       emailAddress
//     });

//     // Save buyer to the database
//     await buyer.save();
//     res.status(201).json({ message: 'Buyer registered successfully', buyer });

//   } catch (error) {
//     res.status(500).json({ message: 'Error registering buyer', error });
//   }
// };
// backend/controllers/buyerController.js


// const Buyer = require('../models/buyer');

// // Create a new buyer
// exports.createBuyer = async (req, res) => {
//     try {
//         const buyer = new Buyer(req.body);
//         await buyer.save();
//         res.status(201).json(buyer);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Get all buyers
// exports.getAllBuyers = async (req, res) => {
//     try {
//         const buyers = await Buyer.find();
//         res.status(200).json(buyers);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get a single buyer by ID
// exports.getBuyerById = async (req, res) => {
//     try {
//         const buyer = await Buyer.findById(req.params.id);
//         if (!buyer) {
//             return res.status(404).json({ message: 'Buyer not found' });
//         }
//         res.status(200).json(buyer);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update a buyer by ID
// exports.updateBuyerById = async (req, res) => {
//     try {
//         const buyer = await Buyer.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!buyer) {
//             return res.status(404).json({ message: 'Buyer not found' });
//         }
//         res.status(200).json(buyer);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete a buyer by ID
// exports.deleteBuyerById = async (req, res) => {
//     try {
//         const buyer = await Buyer.findByIdAndDelete(req.params.id);
//         if (!buyer) {
//             return res.status(404).json({ message: 'Buyer not found' });
//         }
//         res.status(200).json({ message: 'Buyer deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
