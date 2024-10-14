import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import FusariumWiltImage from '../../assets/DiseasesImages/FusariumWilt.jpg';
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const FusariumWilt = () => {
  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Fusarium Wilt", 105, 20, null, null, "center");

    // Include image
    const imgData = FusariumWiltImage;
    doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "Fusarium Wilt is a serious fungal disease that affects a wide range of plants, including coconut trees. The disease is caused by the fungus Fusarium oxysporum, which infects the plant's vascular system, leading to wilting, yellowing of leaves, and ultimately plant death .",
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
      `- Yellowing and wilting of leaves, often starting from the bottom of the plant.
- Stunted growth and reduced yield.
- Dark discoloration of the vascular tissue in the stem.
- Premature leaf drop and plant death.`,
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

    doc.text(
      `- Improving soil drainage and avoiding waterlogging.
- Application of fungicides and soil treatments.
- Use of resistant plant varieties where available.
- Practicing crop rotation and field sanitation to reduce disease inoculum.`,
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
    doc.save("FusariumWilt.pdf");
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
              title: 'Fusarium Wilt',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Fusarium Wilt</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={FusariumWiltImage}
              alt="Fusarium Wilt"
              className="w-1/5 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Fusarium Wilt is a serious fungal disease that affects a wide range of plants, including coconut trees. The disease is caused by the fungus Fusarium oxysporum, which infects the plant's vascular system, leading to wilting, yellowing of leaves, and ultimately plant death.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Yellowing and wilting of leaves, often starting from the bottom of the plant.</li>
              <li>Stunted growth and reduced yield.</li>
              <li>Dark discoloration of the vascular tissue in the stem.</li>
              <li>Premature leaf drop and plant death.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Improving soil drainage and avoiding waterlogging.</li>
              <li>Application of fungicides and soil treatments.</li>
              <li>Use of resistant plant varieties where available.</li>
              <li>Practicing crop rotation and field sanitation to reduce disease inoculum.</li>
            </ul>
          </div>

          {/* Button to download PDF */}
          <div className="flex justify-center mt-15 mb-10">
            <Button
              type="primary"
              icon={<FilePdfOutlined />}
              onClick={generatePDF}
              style={{
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
                fontSize: "16px",
                padding: "10px 20px",
              }}
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

export default FusariumWilt;
