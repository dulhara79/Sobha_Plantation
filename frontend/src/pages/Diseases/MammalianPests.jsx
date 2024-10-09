import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import ratImage from '../../assets/DiseasesImages/rat.png';
import batImage from '../../assets/DiseasesImages/bat.jpg';
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const MammalianPests = () => {
// Function to generate PDF
const generatePDF = () => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(22);
  doc.setTextColor(40);
  doc.text("Mammalian Pests", 105, 20, null, null, "center");

  // Include image
  const imgData = ratImage;
  doc.addImage(imgData, "PNG", 15, 30, 180, 100);

      // Add description with creative formatting
      doc.setFontSize(14);
      doc.setTextColor(50);
      doc.setFont("helvetica", "bold");
      doc.text("Description:", 20, 150);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      doc.text(
        "Mammalian pests such as rats and bats can cause significant damage to coconut trees. Rats are known for gnawing on tender parts of the plant and fruits, while bats may feed on the nectar and fruit, leading to decreased yield and quality.",
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
        `- Chewed leaves, stems, or fruits indicating rat activity.
- Droppings and gnaw marks near the base of the tree.
- Presence of bats around the coconut plantation, especially at dusk or dawn.
- Partially eaten coconuts or scattered remnants around the tree base.`,
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
        `- Setting up traps or using rodenticides to control rat populations.
- Installing nets or barriers to prevent bat access to coconut flowers and fruits.
- Maintaining cleanliness around the plantation to reduce food sources for pests.
- Encouraging natural predators such as owls and snakes to control rodent populations.`,
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
    doc.save("MammalianPests.pdf");
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
              title: 'Mammalian Pests',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Mammalian Pests</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={ratImage}
              alt="Mammalian Pests"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
            <img
                src={batImage}
                alt="Mammalian Pests"
                className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Mammalian pests such as rats and bats can cause significant damage to coconut trees. Rats are known for gnawing on tender parts of the plant and fruits, while bats may feed on the nectar and fruit, leading to decreased yield and quality.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Chewed leaves, stems, or fruits indicating rat activity.</li>
              <li>Droppings and gnaw marks near the base of the tree.</li>
              <li>Presence of bats around the coconut plantation, especially at dusk or dawn.</li>
              <li>Partially eaten coconuts or scattered remnants around the tree base.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Setting up traps or using rodenticides to control rat populations.</li>
              <li>Installing nets or barriers to prevent bat access to coconut flowers and fruits.</li>
              <li>Maintaining cleanliness around the plantation to reduce food sources for pests.</li>
              <li>Encouraging natural predators such as owls and snakes to control rodent populations.</li>
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

export default MammalianPests;
