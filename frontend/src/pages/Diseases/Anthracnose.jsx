import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import AnthracnoseImage from "../../assets/DiseasesImages/Anthracnose.jpg";
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const Anthracnose = () => {
  // Function to generate pdf
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Anthracnose", 105, 20, null, null, "center");

    // Include image
    const imgData = AnthracnoseImage;
    doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "Anthracnose is a fungal disease affecting various plants, including bananas. It primarily targets leaves, stems, and fruits, causing dark, sunken lesions. These lesions can expand, leading to significant tissue damage and impacting the overall health and productivity of the plant.",
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
      `- Dark, sunken lesions on leaves, stems, and fruits.
- Lesions often have a reddish-brown or dark brown center with a yellow halo.
- Premature leaf drop and reduced fruit quality.
- Decreased plant vigor and productivity.`,
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
      `- Removal and destruction of infected plant material.
- Application of fungicides to manage fungal spread.
- Improving plant health through proper nutrition and irrigation.
- Using resistant plant varieties if available.`,
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
    doc.save("Anthracnose.pdf");
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
              title: "Coconut Pests and Diseases",
            },
            {
              href: "",
              title: "Anthracnose",
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Anthracnose</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={AnthracnoseImage}
              alt="Anthracnose"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Anthracnose is a fungal disease affecting various plants,
              including bananas. It primarily targets leaves, stems, and fruits,
              causing dark, sunken lesions. These lesions can expand, leading to
              significant tissue damage and impacting the overall health and
              productivity of the plant.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Dark, sunken lesions on leaves, stems, and fruits.</li>
              <li>
                Lesions often have a reddish-brown or dark brown center with a
                yellow halo.
              </li>
              <li>Premature leaf drop and reduced fruit quality.</li>
              <li>Decreased plant vigor and productivity.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Removal and destruction of infected plant material.</li>
              <li>Application of fungicides to manage fungal spread.</li>
              <li>
                Improving plant health through proper nutrition and irrigation.
              </li>
              <li>Using resistant plant varieties if available.</li>
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

export default Anthracnose;
