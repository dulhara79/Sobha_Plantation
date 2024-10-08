import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import CoconutLeafMinerImage from "../../assets/DiseasesImages/CoconutLeafMiner.jpg";
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const CoconutLeafMiner = () => {
  
  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Coconut Leaf Miner", 105, 20, null, null, "center");

    // Include image
    const imgData = CoconutLeafMinerImage; // Adjust path if necessary
    doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "The Coconut Leaf Miner is a pest that primarily affects coconut trees, causing significant damage to the leaves. The larvae of this pest burrow into the leaf tissue, creating mines that reduce the photosynthetic ability of the leaves, leading to a decline in overall tree health and productivity.",
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
      `- Presence of serpentine mines on leaves.
- Yellowing and browning of leaves.
- Reduced leaf area due to tissue damage.
- Premature leaf drop.`,
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
      `- Regular pruning and destruction of infested leaves.
- Application of systemic insecticides.
- Biological control using parasitoids or predators.
- Use of pheromone traps to monitor and control adult populations.`,
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
    doc.save("Coconut_Leaf_Miner.pdf");
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div className={`ml-[300px] p-4`}>
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
              title: "Coconut Leaf Miner",
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">
            Coconut Leaf Miner
          </h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={CoconutLeafMinerImage}
              alt="Coconut Leaf Miner"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Coconut Leaf Miner is a pest that primarily affects coconut
              trees, causing significant damage to the leaves. The larvae of
              this pest burrow into the leaf tissue, creating mines that reduce
              the photosynthetic ability of the leaves, leading to a decline in
              overall tree health and productivity.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of serpentine mines on leaves.</li>
              <li>Yellowing and browning of leaves.</li>
              <li>Reduced leaf area due to tissue damage.</li>
              <li>Premature leaf drop.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular pruning and destruction of infested leaves.</li>
              <li>Application of systemic insecticides.</li>
              <li>Biological control using parasitoids or predators.</li>
              <li>
                Use of pheromone traps to monitor and control adult populations.
              </li>
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

export default CoconutLeafMiner;
