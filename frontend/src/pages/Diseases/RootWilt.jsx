import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import RootWiltImage from '../../assets/DiseasesImages/RootWilt.jpg';
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const RootWilt = () => {
// Function to generate PDF
const generatePDF = () => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(22);
  doc.setTextColor(40);
  doc.text("Root Wilt", 105, 20, null, null, "center");

  // Include image
  const imgData = RootWiltImage;
  doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "Root Wilt is a serious disease that affects coconut trees, caused by the fungus Thielaviopsis paradoxa. The disease is characterized by the wilting and death of the tree's roots, leading to a decline in tree health and productivity.",
      20,
      160,
      { maxWidth: 170, align: "justify" }
    );

        // Add Symptoms
        doc.setFontSize(14);
        doc.setTextColor(50);
        doc.setFont("helvetica", "bold");
        doc.text("Symptoms:", 20, 190);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80);
        doc.text(
          `- Yellowing and wilting of leaves.
- Stunted growth and reduced yield.
- Presence of dry, brittle fronds.
- Decline in overall tree health.`,
          20,
          200,
          { maxWidth: 170, align: "left" }
        );

        // Add Treatments
        doc.setFontSize(14);
        doc.setTextColor(50);
        doc.setFont("helvetica", "bold");
        doc.text("Treatments:", 20, 230);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80);
        doc.text(
          `- Improvement of soil fertility through the application of organic manures.
- Regular irrigation and mulching to maintain soil moisture.
- Removal and destruction of severely affected trees to prevent the spread of the disease.
- Use of resistant varieties if available.`,
          20,
          240,
          { maxWidth: 170, align: "left" }
        );

        
        // Add a horizontal line to separate content from the footer
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
        doc.setDrawColor(0);
        doc.line(20, pageHeight - 25, pageWidth - 20, pageHeight - 25); // Draw a line at the bottom
    
        // Add logo at the bottom center as part of the footer
        const logoData = LogoImage; // Adjust path if necessary
        const logoWidth = 40; // Set logo width
        const logoHeight = 20; // Set logo height
        const xPosition = (pageWidth - logoWidth) / 2; // Calculate center position
        const yPosition = pageHeight - logoHeight - 4; // Set position 10 units from bottom
        doc.addImage(logoData, "PNG", xPosition, yPosition, logoWidth, logoHeight);


  // Save the PDF
  doc.save("RootWilt.pdf");
};




  return (
    <div>
      <Header />
      <Sidebar />

      <div className="ml-[300px] p-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: 'Coconut Pests and Diseases',
            },
            {
              href: '',
              title: 'Root Wilt',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Root Wilt</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={RootWiltImage}
              alt="Root Wilt"
              className="w-1/5 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Root Wilt is a debilitating disease of coconut trees characterized by the yellowing and wilting of leaves. The disease affects the root system, hindering the tree's ability to absorb water and nutrients, which leads to reduced growth, flowering, and fruit production.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Yellowing and drooping of leaves.</li>
              <li>Delayed flowering and fruiting.</li>
              <li>Presence of dry, brittle fronds.</li>
              <li>Stunted growth of the tree.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Improvement of soil fertility through the application of organic manures.</li>
              <li>Regular irrigation and mulching to maintain soil moisture.</li>
              <li>Removal and destruction of severely affected trees to prevent the spread of the disease.</li>
              <li>Use of resistant varieties if available.</li>
            </ul>
          </div>

          {/* PDF Generation Button */}
          <div className="flex justify-center mt-15 mb-10">
            <Button
              type="primary"
              icon={<FilePdfOutlined />}
              onClick={generatePDF}
              style={{ backgroundColor: "#52c41a", borderColor: "#52c41a", fontSize: "16px", padding: "10px 20px" }}
              size="large"
            >
              Generate PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootWilt;
