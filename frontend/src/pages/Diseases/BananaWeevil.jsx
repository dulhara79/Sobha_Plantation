import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import BananaWeevilImage from "../../assets/DiseasesImages/BananaWeevil.png";
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const BananaWeevil = () => {
  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Banana Weevil", 105, 20, null, null, "center");

    // Include image
    const imgData = BananaWeevilImage;
    doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "The Banana Weevil is a significant pest of banana plants, causing extensive damage to both the fruit and the plant itself. The adult weevils lay their eggs in the banana plant, and the larvae tunnel into the plant tissues, leading to a reduction in plant vigor and fruit yield.",
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
      `- Presence of holes and tunnels in the banana stems.
- Wilting and yellowing of banana leaves.
- Reduced fruit quality and premature ripening.
- Visible larvae and adult weevils on or near the plant.`,
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
      `- Regular inspection and removal of infested plant parts.
- Application of systemic insecticides targeting the larvae.
- Use of pheromone traps to monitor and reduce adult weevil populations.
- Implementing good agricultural practices to reduce pest habitat.`,
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
    doc.save("BananaWeevil.pdf");
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
              title: "Banana Pests and Diseases",
            },
            {
              href: "",
              title: "Banana Weevil",
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Banana Weevil</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={BananaWeevilImage}
              alt="Banana Weevil"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Banana Weevil is a significant pest of banana plants, causing
              extensive damage to both the fruit and the plant itself. The adult
              weevils lay their eggs in the banana plant, and the larvae tunnel
              into the plant tissues, leading to a reduction in plant vigor and
              fruit yield.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of holes and tunnels in the banana stems.</li>
              <li>Wilting and yellowing of banana leaves.</li>
              <li>Reduced fruit quality and premature ripening.</li>
              <li>Visible larvae and adult weevils on or near the plant.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular inspection and removal of infested plant parts.</li>
              <li>
                Application of systemic insecticides targeting the larvae.
              </li>
              <li>
                Use of pheromone traps to monitor and reduce adult weevil
                populations.
              </li>
              <li>
                Implementing good agricultural practices to reduce pest habitat.
              </li>
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

export default BananaWeevil;
