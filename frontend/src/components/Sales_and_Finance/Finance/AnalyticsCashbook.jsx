// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import moment from "moment";

// const TraditionalCashbook = () => {
//   const [cashbook, setCashbook] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/salesAndFinance/finance/transaction")
//       .then((response) => {
//         if (Array.isArray(response.data.data)) {
//           setCashbook(response.data.data);
//         } else {
//           console.error("Expected an array but received:", response.data);
//         }
//       })
//       .catch((error) => console.error("Error fetching cashbook:", error));
//   }, []);

//   const processEntries = () => {
//     let processedEntries = [];
//     let runningBalance = 0;
//     let currentMonth = null;

//     cashbook.sort((a, b) => moment(a.date).diff(moment(b.date))).forEach((entry, index) => {
//       const entryMonth = moment(entry.date).format("YYYY-MM");

//       if (entryMonth !== currentMonth) {
//         if (currentMonth !== null) {
//           // Add Balance C/D for the previous month
//           processedEntries.push({
//             date: moment(entry.date).subtract(1, 'month').endOf("month").format("YYYY-MM-DD"),
//             description: "Balance C/D",
//             income: null,
//             expense: null,
//             balance: runningBalance,
//             isBalance: true,
//           });
//         }
//         // Add Balance B/D for the new month
//         processedEntries.push({
//           date: moment(entry.date).startOf("month").format("YYYY-MM-DD"),
//           description: "Balance B/D",
//           income: null,
//           expense: null,
//           balance: runningBalance,
//           isBalance: true,
//         });
//         currentMonth = entryMonth;
//       }

//       const amount = entry.type === "income" ? entry.amount : -entry.amount;
//       runningBalance += amount;

//       processedEntries.push({
//         ...entry,
//         income: entry.type === "income" ? entry.amount : null,
//         expense: entry.type === "expense" ? entry.amount : null,
//         balance: runningBalance,
//       });
//     });

//     // Add final Balance C/D
//     if (processedEntries.length > 0) {
//       processedEntries.push({
//         date: moment(processedEntries[processedEntries.length - 1].date).endOf("month").format("YYYY-MM-DD"),
//         description: "Balance C/D",
//         income: null,
//         expense: null,
//         balance: runningBalance,
//         isBalance: true,
//       });
//     }

//     return processedEntries;
//   };

//   const processedEntries = processEntries();

//   return (
//     <div className="p-4 mt-4 bg-white rounded shadow">
//       <h3 className="mb-0 font-semibold text-center">Sobha Plantations</h3>
//       <h1 className="mt-1 mb-4 font-semibold text-center">Cash Book</h1>
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border border-gray-300 table-auto">
//           <thead className="text-white bg-gray-800">
//             <tr>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Description</th>
//               <th className="px-4 py-2 border">Income (LKR)</th>
//               <th className="px-4 py-2 border">Expense (LKR)</th>
//               <th className="px-4 py-2 border">Balance (LKR)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {processedEntries.map((entry, index) => (
//               <tr key={index} className={entry.isBalance ? "font-semibold bg-gray-200" : ""}>
//                 <td className="px-4 py-2 border">{moment(entry.date).format("YYYY-MM-DD")}</td>
//                 <td className="px-4 py-2 border">{entry.description}</td>
//                 <td className="px-4 py-2 border">
//                   {entry.income !== null
//                     ? entry.income.toLocaleString("en-US", {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2,
//                       })
//                     : ""}
//                 </td>
//                 <td className="px-4 py-2 border">
//                   {entry.expense !== null
//                     ? entry.expense.toLocaleString("en-US", {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2,
//                       })
//                     : ""}
//                 </td>
//                 <td className="px-4 py-2 border">
//                   {entry.balance.toLocaleString("en-US", {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TraditionalCashbook;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import moment from "moment";
// import jsPDF from "jspdf";

// const TraditionalCashbook = () => {
//   const [cashbook, setCashbook] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // State for the search term

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/salesAndFinance/finance/transaction")
//       .then((response) => {
//         if (Array.isArray(response.data.data)) {
//           setCashbook(response.data.data);
//         } else {
//           console.error("Expected an array but received:", response.data);
//         }
//       })
//       .catch((error) => console.error("Error fetching cashbook:", error));
//   }, []);

//   const processEntries = () => {
//     let processedEntries = [];
//     let runningBalance = 0;
//     let currentMonth = null;

//     cashbook.sort((a, b) => moment(a.date).diff(moment(b.date))).forEach((entry) => {
//       const entryMonth = moment(entry.date).format("YYYY-MM");

//       if (entryMonth !== currentMonth) {
//         if (currentMonth !== null) {
//           // Add Balance C/D for the previous month
//           processedEntries.push({
//             date: moment(entry.date).subtract(1, 'month').endOf("month").format("YYYY-MM-DD"),
//             description: "Balance C/D",
//             income: null,
//             expense: null,
//             balance: runningBalance,
//             isBalance: true,
//           });
//         }
//         // Add Balance B/D for the new month
//         processedEntries.push({
//           date: moment(entry.date).startOf("month").format("YYYY-MM-DD"),
//           description: "Balance B/D",
//           income: null,
//           expense: null,
//           balance: runningBalance,
//           isBalance: true,
//         });
//         currentMonth = entryMonth;
//       }

//       const amount = entry.type === "income" ? entry.amount : -entry.amount;
//       runningBalance += amount;

//       processedEntries.push({
//         ...entry,
//         income: entry.type === "income" ? entry.amount : null,
//         expense: entry.type === "expense" ? entry.amount : null,
//         balance: runningBalance,
//       });
//     });

//     // Add final Balance C/D
//     if (processedEntries.length > 0) {
//       processedEntries.push({
//         date: moment(processedEntries[processedEntries.length - 1].date).endOf("month").format("YYYY-MM-DD"),
//         description: "Balance C/D",
//         income: null,
//         expense: null,
//         balance: runningBalance,
//         isBalance: true,
//       });
//     }

//     return processedEntries;
//   };

//   const processedEntries = processEntries();

//   const getImageDataURL = (url) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = "Anonymous"; // Ensure cross-origin images are handled
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         context.drawImage(img, 0, 0);
//         resolve(canvas.toDataURL("image/png"));
//       };
//       img.onerror = reject;
//       img.src = url;
//     });
//   };

//   // Function to generate PDF
//   const generatePDF = async () => {
//     const element = document.getElementById("cashbook-table");
//     const doc = new jsPDF();

//     // Load the logo image
//     const logoUrl = "../../../../src/assets/logo.png"; // Update the path as necessary
//     let logoDataURL;
//     try {
//       logoDataURL = await getImageDataURL(logoUrl);
//     } catch (error) {
//       console.error("Failed to load the logo image:", error);
//     }

//     const drawHeaderFooter = (data) => {
//       const pageWidth = doc.internal.pageSize.width;
//       const pageHeight = doc.internal.pageSize.height;

//       // Header with logo
//       if (logoDataURL) {
//         doc.addImage(logoDataURL, "PNG", 10, 10, 40, 10); // Adjust position and size
//       }
//       doc.setFontSize(12);
//       doc.text("Sobha Plantation", 170, 15); // Adjust x, y position
//       doc.line(10, 25, pageWidth - 10, 25); // Line under header

//       // Footer with page number
//       doc.setFontSize(10);
//       doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 30, pageHeight - 10);
//     };

//     const marginTop = 30; // space reserved for header
//     const marginBottom = 20; // space reserved for footer

//     // Title of the report
//     doc.setFontSize(22);
//     doc.text("Cash Book Report", 50, 35); // Adjust y-coordinate to start below header

//     // Table headers
//     const tableHeaders = [
//       ["Date", "Description", "Income (LKR)", "Expense (LKR)", "Balance (LKR)"],
//     ];

//     // Prepare the rows for the PDF table
//     const tableRows = filteredEntries.map(entry => [
//       moment(entry.date).format("YYYY-MM-DD"),
//       entry.description,
//       entry.income !== null ? entry.income.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "",
//       entry.expense !== null ? entry.expense.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "",
//       entry.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
//     ]);

//     // Render the table in PDF
//     doc.autoTable({
//       startY: marginTop + 20, // Start the first table below the header space
//       head: tableHeaders,
//       body: tableRows,
//       margin: { top: marginTop, bottom: marginBottom, horizontal: 10 },
//       styles: {
//         fontSize: 10,
//       },
//       headStyles: {
//         fillColor: [64, 133, 126],
//         textColor: [255, 255, 255],
//         fontSize: 12,
//       },
//       theme: "grid",
//       didDrawPage: drawHeaderFooter, // Add header and footer to each page
//     });

//     // Save the PDF
//     doc.save("CashBook.pdf");
//   };

//   // Filtered entries based on the search term
//   const filteredEntries = processedEntries.filter(entry =>
//     entry.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-4 mt-4 bg-white rounded shadow">
//       <h3 className="mb-0 font-semibold text-center">Sobha Plantations</h3>
//       <h1 className="mt-1 mb-4 font-semibold text-center">Cash Book</h1>

//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search by description..."
//         className="w-full p-2 mb-4 border border-gray-300 rounded"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
//       />

//       <div className="overflow-x-auto">
//         <table id="cashbook-table" className="w-full text-left border border-gray-300 table-auto">
//           <thead className="text-white bg-gray-800">
//             <tr>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Description</th>
//               <th className="px-4 py-2 border">Income (LKR)</th>
//               <th className="px-4 py-2 border">Expense (LKR)</th>
//               <th className="px-4 py-2 border">Balance (LKR)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEntries.map((entry, index) => (
//               <tr key={index} className={entry.isBalance ? "font-semibold bg-gray-200" : ""}>
//                 <td className="px-4 py-2 border">{moment(entry.date).format("YYYY-MM-DD")}</td>
//                 <td className="px-4 py-2 border">{entry.description}</td>
//                 <td className="px-4 py-2 border">
//                   {entry.income !== null
//                     ? entry.income.toLocaleString("en-US", {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2,
//                       })
//                     : ""}
//                 </td>
//                 <td className="px-4 py-2 border">
//                   {entry.expense !== null
//                     ? entry.expense.toLocaleString("en-US", {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2,
//                       })
//                     : ""}
//                 </td>
//                 <td className="px-4 py-2 border">
//                   {entry.balance.toLocaleString("en-US", {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Button to generate PDF */}
//       <button onClick={generatePDF} className="p-2 mt-4 text-white bg-blue-600 rounded">
//         Download as PDF
//       </button>
//     </div>
//   );
// };

// export default TraditionalCashbook;

import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DoubleColumnCashbook = () => {
  const [cashbook, setCashbook] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/salesAndFinance/finance/transaction")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setCashbook(response.data.data);
        } else {
          console.error("Expected an array but received:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching cashbook:", error));
  }, []);

  const processEntries = () => {
    let debitEntries = [];
    let creditEntries = [];
    let runningBalance = 0;
    let currentMonth = null;

    cashbook
      .sort((a, b) => moment(a.date).diff(moment(b.date)))
      .forEach((entry) => {
        const entryMonth = moment(entry.date).format("YYYY-MM");

        if (entryMonth !== currentMonth) {
          if (currentMonth !== null) {
            // Balance C/D for previous month
            const balanceEntry = {
              date: moment(entry.date)
                .subtract(1, "month")
                .endOf("month")
                .format("YYYY-MM-DD"),
              description: "Balance C/D",
              amount: Math.abs(runningBalance),
              type: runningBalance >= 0 ? "debit" : "credit",
              isBalance: true,
            };
            (runningBalance >= 0 ? debitEntries : creditEntries).push(
              balanceEntry
            );
          }
          // Balance B/D for new month
          const balanceBD = {
            date: moment(entry.date).startOf("month").format("YYYY-MM-DD"),
            description: "Balance B/D",
            amount: Math.abs(runningBalance),
            type: runningBalance >= 0 ? "debit" : "credit",
            isBalance: true,
          };
          (runningBalance >= 0 ? debitEntries : creditEntries).push(balanceBD);
          currentMonth = entryMonth;
        }

        // Calculate amount and update balance
        const amount = entry.type === "income" ? entry.amount : -entry.amount;
        runningBalance += amount;

        const newEntry = {
          ...entry,
          amount: Math.abs(entry.amount),
        };
        if (entry.type === "income") {
          debitEntries.push(newEntry);
        } else {
          creditEntries.push(newEntry);
        }
      });

    // Final Balance C/D
    if (debitEntries.length || creditEntries.length) {
      const finalBalance = {
        date: moment(
          debitEntries[debitEntries.length - 1]?.date ||
            creditEntries[creditEntries.length - 1]?.date
        )
          .endOf("month")
          .format("YYYY-MM-DD"),
        description: "Balance C/D",
        amount: Math.abs(runningBalance),
        type: runningBalance >= 0 ? "debit" : "credit",
        isBalance: true,
      };
      (runningBalance >= 0 ? debitEntries : creditEntries).push(finalBalance);
    }

    return { debitEntries, creditEntries };
  };

  const { debitEntries, creditEntries } = processEntries();
  const filteredDebitEntries = debitEntries.filter((entry) =>
    entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCreditEntries = creditEntries.filter((entry) =>
    entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Ensure cross-origin images are handled
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    // Load the logo image
    const logoUrl = "../../../../src/assets/logo.png";
    let logoDataURL;
    try {
      logoDataURL = await getImageDataURL(logoUrl);
    } catch (error) {
      console.error("Failed to load the logo image:", error);
    }

    // Function to draw header, footer, and horizontal line
    const drawHeaderFooter = (data) => {
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Header with logo
      // if (logoDataURL) {
      //   doc.addImage(logoDataURL, "PNG", 10, 10, 40, 10); // Adjust position and size
      // }
      // doc.setFontSize(12);
      // doc.text("Sobha Plantation", 170, 15); // Adjust x, y position
      // doc.line(10, 25, pageWidth - 10, 25); // Line under header
      doc.setFontSize(14);
      doc.text("Sobha Plantation", 10, 10); // Align left

      doc.setFontSize(10);
      doc.text("317/23, Nikaweratiya,", 10, 15); // Address line 1
      doc.text("Kurunagala, Sri Lanka.", 10, 20); // Address line 2
      doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25); // Email address line
      doc.text("Contact: 0112 751 757", 10, 30); // Email address line

      if (logoDataURL) {
        doc.addImage(logoDataURL, "PNG", pageWidth - 50, 10, 40, 10); // Align right (adjust the x position as needed)
      }

      doc.line(10, 35, pageWidth - 10, 35); // Header line
      // Footer with page number
      doc.setFontSize(10);
      doc.text(
        `Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`,
        pageWidth - 30,
        pageHeight - 10
      );
    };

    // Set the margins for header and footer space
    const marginTop = 30; // space reserved for header
    const marginBottom = 20; // space reserved for footer

    // Title of the report
    doc.setFontSize(14);
    doc.text("Sobha Plantations", 85, 50); // Adjust y-coordinate to start below header
    doc.setFontSize(22);
    doc.text("Cash Book", 85, 60); // Adjust y-coordinate to start below header

    // Debit Table
    doc.setFontSize(14);
    doc.text("Debit", 15, 60);
    doc.autoTable({
      startY: 65,
      head: [["Date", "Description", "VNo", "Amount (LKR)"]],
      body: filteredDebitEntries.map((entry) => [
        moment(entry.date).format("YYYY-MM-DD"),
        entry.description,
        entry.vno || "",
        entry.amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      ]),
      margin: { top: marginTop, bottom: marginBottom, right: 105 },
      // theme: "grid",
      // styles: {
      //   minCellHeight: 10, // Sets a uniform row height
      // },
      styles: {
        fontSize: 10,
        minCellHeight: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: "grid",
      didDrawPage: drawHeaderFooter,
    });

    // Credit Table
    doc.setFontSize(14);
    doc.text("Credit", 180, 60);
    doc.autoTable({
      startY: 65,
      head: [["Date", "Description", "VNo", "Amount (LKR)"]],
      body: filteredCreditEntries.map((entry) => [
        moment(entry.date).format("YYYY-MM-DD"),
        entry.description,
        entry.vno || "",
        entry.amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      ]),
      margin: { top: marginTop, bottom: marginBottom, left: 105 },
      // theme: "grid",
      // styles: {
      //   minCellHeight: 10, // Sets a uniform row height
      // },
      styles: {
        fontSize: 10,
        minCellHeight: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: "grid",
      didDrawPage: drawHeaderFooter,
    });

    doc.save("Cashbook.pdf");
  };

  return (
    <div>
      <h1 className="">Transaction Data In CashBook Format</h1>
      <div className="p-4 mt-4">
        <button
          onClick={generatePDF}
          className="float-right p-2 pl-4 pr-4 mt-4 text-base text-white rounded-full bg-lime-600 hover:bg-lime-700"
        >
          Download as PDF
        </button>
        <input
          type="text"
          placeholder="Search by description..."
          className="w-full max-w-lg p-2 mb-4 border rounded-full border-lime-500 active:outline-lime-500 focus:outline-lime-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="p-4 mt-4 bg-white rounded shadow">
          <h3 className="mb-0 font-semibold text-center">Sobha Plantations</h3>
          <h1 className="mt-1 mb-4 font-semibold text-center">Cash Book</h1>

          <div className="flex gap-0 overflow-x-auto">
            {/* Debit (Left) Table */}
            <div className="w-1/2">
              <h2 className="mb-2 font-semibold text-left">Debit</h2>
              <table className="w-full text-left border border-gray-300 table-auto">
                <thead className="text-white bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">VNo</th>
                    <th className="px-4 py-2 border">Amount (LKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDebitEntries.map((entry, index) => (
                    <tr
                      key={index}
                      className={
                        entry.isBalance ? "font-semibold bg-gray-200" : ""
                      }
                    >
                      <td className="px-4 py-2 border">
                        {moment(entry.date).format("YYYY-MM-DD")}
                      </td>
                      <td className="px-4 py-2 border">{entry.description}</td>
                      <td className="px-4 py-2 border">{entry.vno || ""}</td>
                      <td className="px-4 py-2 border">
                        {entry.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Credit (Right) Table */}
            <div className="w-1/2">
              <h2 className="mb-2 font-semibold text-right">Credit</h2>
              <table className="w-full text-left border border-gray-300 table-auto">
                <thead className="text-white bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">VNo</th>
                    <th className="px-4 py-2 border">Amount (LKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCreditEntries.map((entry, index) => (
                    <tr
                      key={index}
                      className={
                        entry.isBalance ? "font-semibold bg-gray-200" : ""
                      }
                    >
                      <td className="px-4 py-2 border">
                        {moment(entry.date).format("YYYY-MM-DD")}
                      </td>
                      <td className="px-4 py-2 border">{entry.description}</td>
                      <td className="px-4 py-2 border">{entry.vno || ""}</td>
                      <td className="px-4 py-2 border">
                        {entry.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleColumnCashbook;
