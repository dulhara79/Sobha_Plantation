import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import BacterialWiltImage from '../../assets/DiseasesImages/BacterialWilt.jpg';
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const BacterialWilt = () => {

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Bacterial Wilt", 105, 20, null, null, "center");

    // Include image
    const imgData = BacterialWiltImage;
    doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

  // Add description with creative formatting
  doc.setFontSize(14);
  doc.setTextColor(50);
  doc.setFont("helvetica", "bold");
  doc.text("Description:", 20, 150);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80);
  doc.text(
    "Bacterial Wilt is a serious plant disease caused by bacterial pathogens that affect various crops, including bananas, tomatoes, and potatoes. The disease is characterized by wilting, yellowing, and dying of leaves due to the bacterial infection blocking the plant’s vascular system.",
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
      `- Wilting of leaves, often starting from the lower part of the plant.
- Yellowing and browning of foliage.
- Blackening of vascular tissues.
- Stunted plant growth.`,
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
      `- Removal and destruction of infected plants.
- Use of resistant plant varieties.
- Application of copper-based bactericides.
- Soil management practices to reduce bacterial load.`,
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
    doc.save("BacterialWilt.pdf");
  }

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
              title: 'Bacterial Wilt',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Bacterial Wilt</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={BacterialWiltImage}
              alt="Bacterial Wilt"
              className="w-1/4 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Bacterial Wilt is a serious plant disease caused by bacterial pathogens that affect various crops, including bananas, tomatoes, and potatoes. The disease is characterized by wilting, yellowing, and dying of leaves due to the bacterial infection blocking the plant’s vascular system.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Wilting of leaves, often starting from the lower part of the plant.</li>
              <li>Yellowing and browning of foliage.</li>
              <li>Blackening of vascular tissues.</li>
              <li>Stunted plant growth.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Removal and destruction of infected plants.</li>
              <li>Use of resistant plant varieties.</li>
              <li>Application of copper-based bactericides.</li>
              <li>Soil management practices to reduce bacterial load.</li>
            </ul>
          </div>

          {/* Button to download PDF */}
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

export default BacterialWilt;
