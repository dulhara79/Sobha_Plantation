import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import PapayaRingspotImage from "../../assets/DiseasesImages/PapayaRingspot.jpg";
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const PapayaRingspot = () => {
  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Black Beetle", 105, 20, null, null, "center");

    // Include image
    const imgData = PapayaRingspotImage;
    doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "Papaya Ringspot is a viral disease that affects papaya plants, causing ring-shaped lesions on leaves, fruit, and stems. The disease leads to stunted growth, reduced fruit yield, and in severe cases, plant death. The virus is transmitted by aphids and can spread rapidly in papaya plantations.",
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
      `- Presence of ring-shaped lesions on leaves and fruit.
- Yellowing and mottling of affected leaves.
- Reduced fruit size and quality.
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
- Use of resistant papaya varieties.
- Control of aphid populations using insecticides or natural predators.
- Regular monitoring and sanitation practices to prevent spread.`,
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
    doc.save("PapayaRingspot.pdf");
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
              href: "",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: "Papaya Pests and Diseases",
            },
            {
              href: "",
              title: "Papaya Ringspot",
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">
            Papaya Ringspot
          </h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={PapayaRingspotImage}
              alt="Papaya Ringspot"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Papaya Ringspot is a viral disease that affects papaya plants,
              causing ring-shaped lesions on leaves, fruit, and stems. The
              disease leads to stunted growth, reduced fruit yield, and in
              severe cases, plant death. The virus is transmitted by aphids and
              can spread rapidly in papaya plantations.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of ring-shaped lesions on leaves and fruit.</li>
              <li>Yellowing and mottling of affected leaves.</li>
              <li>Reduced fruit size and quality.</li>
              <li>Stunted plant growth.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Removal and destruction of infected plants.</li>
              <li>Use of resistant papaya varieties.</li>
              <li>
                Control of aphid populations using insecticides or natural
                predators.
              </li>
              <li>
                Regular monitoring and sanitation practices to prevent spread.
              </li>
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

export default PapayaRingspot;
