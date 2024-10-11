import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import LeafSpotImage from '../../assets/DiseasesImages/LeafSpot.jpg';
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const LeafSpot = () => {
  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Leaf Spot", 105, 20, null, null, "center");

    // Include image
    const imgData = LeafSpotImage;
    doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "Leaf spot is a common fungal disease that affects coconut trees, characterized by the appearance of spots on the leaves. These spots can vary in color, often starting as small yellow or brown spots and gradually turning dark brown or black as they enlarge.",
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
        `- Small yellow or brown spots on leaves.
- Spots may merge to form larger necrotic areas.
- Severe infections can cause premature leaf drop.
- Reduced photosynthetic ability due to leaf damage.`,
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
        `- Pruning and removal of affected leaves to reduce spread.
- Application of appropriate fungicides to control infection.
- Improving air circulation around trees to reduce humidity.
- Ensuring proper nutrition and water management to maintain tree health.`,
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
    doc.save("LeafSpot.pdf");
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
              title: 'Leaf Spot',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Leaf Spot</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={LeafSpotImage}
              alt="Leaf Spot"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Leaf spot is a common fungal disease that affects coconut trees, characterized by the appearance of spots on the leaves. These spots can vary in color, often starting as small yellow or brown spots and gradually turning dark brown or black as they enlarge.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Small yellow or brown spots on leaves.</li>
              <li>Spots may merge to form larger necrotic areas.</li>
              <li>Severe infections can cause premature leaf drop.</li>
              <li>Reduced photosynthetic ability due to leaf damage.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Pruning and removal of affected leaves to reduce spread.</li>
              <li>Application of appropriate fungicides to control infection.</li>
              <li>Improving air circulation around trees to reduce humidity.</li>
              <li>Ensuring proper nutrition and water management to maintain tree health.</li>
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

export default LeafSpot;
