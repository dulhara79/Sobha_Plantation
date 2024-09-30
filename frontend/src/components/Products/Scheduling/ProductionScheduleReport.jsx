import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

// Function to get image data URL
const getImageDataURL = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Ensure cross-origin images are handled
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = url;
  });
};

const ProductionScheduleReport = ({ filteredSchedules }) => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Load the logo image
    const logoUrl = '../src/assets/logo.png'; // Adjust the logo path as needed
    let logoDataURL;
    try {
      logoDataURL = await getImageDataURL(logoUrl);
    } catch (error) {
      console.error('Failed to load the logo image:', error);
    }

    // Function to draw header, footer, and horizontal line
    const drawHeaderFooter = (data) => {
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Header with logo
      if (logoDataURL) {
        doc.addImage(logoDataURL, 'PNG', 10, 10, 40, 10); // Adjust position and size
      }
      doc.setFontSize(12);
      doc.text("Sobha Plantation", 170, 15); // Adjust x, y position
      doc.line(10, 25, pageWidth - 10, 25); // Line under header

      // Footer with page number
      doc.setFontSize(10);
      doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 30, pageHeight - 10);
    };

    // Set the margins for header and footer space
    const marginTop = 30; // space reserved for header
    const marginBottom = 20; // space reserved for footer

    // Title of the report
    doc.setFontSize(22);
    doc.text("Production Schedule Report", 50, 35); // Adjust y-coordinate to start below header

    // Calculate status summary
    const statusSummary = filteredSchedules.reduce((summary, schedule) => {
      const status = schedule.status;
      if (!summary[status]) {
        summary[status] = 0;
      }
      summary[status]++;
      return summary;
    }, {});

    // Convert status summary to an array for the table
    const statusRows = Object.entries(statusSummary).map(([status, count]) => [status, count]);

    // First Table: Overview Details
    const overviewHeaders = [['Detail', 'Value']];
    const overviewRows = [
      ['Total Schedules', `${filteredSchedules.length}`],
      ['Total Quantity', `${filteredSchedules.reduce((sum, item) => sum + item.quantity, 0)}`],
    ];

    // Add status details to the overview
    statusRows.forEach(([status, count]) => {
      overviewRows.push([`Total ${status} Schedules`, `${count}`]);
    });

    doc.autoTable({
      startY: marginTop + 20, // Start the first table below the header space
      head: overviewHeaders,
      body: overviewRows,
      margin: { top: marginTop, bottom: marginBottom, horizontal: 10 },
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: 'grid',
      didDrawPage: drawHeaderFooter, // Add header and footer to each page
    });

    // Second Table: Production Schedule Data
    const scheduleRows = filteredSchedules.map(schedule => [
      schedule.productType,
      schedule.quantity,
      moment(schedule.startDate).format('YYYY-MM-DD'),
      moment(schedule.endDate).format('YYYY-MM-DD'),
      schedule.status,
      `${schedule.progress}%`
    ]);

    const scheduleHeaders = [['Product Type', 'Quantity', 'Start Date', 'End Date', 'Status', 'Progress (%)']];

    let finalY = doc.lastAutoTable.finalY + 10; // Adjust space between tables

    doc.autoTable({
      startY: finalY,  // Start this table below the first table
      head: scheduleHeaders,
      body: scheduleRows,
      margin: { top: marginTop, bottom: marginBottom, horizontal: 10 },
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: 'striped',
      didDrawPage: drawHeaderFooter,
    });

    // Save the PDF
    doc.save('production_schedule_report.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF Report</button>
    </div>
  );
};

export default ProductionScheduleReport;
