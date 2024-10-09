import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import LethalYellowingImage from '../../assets/DiseasesImages/LethalYellowing.png';
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const LethalYellowing = () => {
// Function to generate PDF
const generatePDF = () => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(22);
  doc.setTextColor(40);
  doc.text("Lethal Yellowing", 105, 20, null, null, "center");

  // Include image
  const imgData = LethalYellowingImage;
  doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

  // Add description with creative formatting
  doc.setFontSize(14);
  doc.setTextColor(50);
  doc.setFont("helvetica", "bold");
  doc.text("Description:", 20, 150);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80);
  doc.text(
    "Lethal Yellowing is a devastating disease affecting coconut palms and other palm species, caused by phytoplasmas. It is characterized by the yellowing of leaves, premature fruit drop, and eventually the death of the infected tree. The disease spreads primarily through insect vectors, particularly planthoppers.",
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
    `- Yellowing of older leaves, progressing to younger leaves.
- Premature fruit drop, often with blackened tips.
- Collapse of the crown and death of the tree.
- Decay of the new emerging spear leaf.`,
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
        `- Regular monitoring and removal of infected trees to prevent spread.
- Application of antibiotics such as oxytetracycline via trunk injection.
- Planting resistant varieties of coconut palms.
- Controlling the vector population through insecticides.`,
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
    doc.save("LethalYellowing.pdf");
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
              title: 'Lethal Yellowing',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Lethal Yellowing</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={LethalYellowingImage}
              alt="Lethal Yellowing"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Lethal Yellowing is a devastating disease affecting coconut palms and other palm species, caused by phytoplasmas. It is characterized by the yellowing of leaves, premature fruit drop, and eventually the death of the infected tree. The disease spreads primarily through insect vectors, particularly planthoppers.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Yellowing of older leaves, progressing to younger leaves.</li>
              <li>Premature fruit drop, often with blackened tips.</li>
              <li>Collapse of the crown and death of the tree.</li>
              <li>Decay of the new emerging spear leaf.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular monitoring and removal of infected trees to prevent spread.</li>
              <li>Application of antibiotics such as oxytetracycline via trunk injection.</li>
              <li>Planting resistant varieties of coconut palms.</li>
              <li>Controlling the vector population through insecticides.</li>
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

export default LethalYellowing;
