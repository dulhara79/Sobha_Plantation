import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import BlackBeetleImage from "../../assets/DiseasesImages/BlackBeetle.jpg";
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const BlackBeetle = () => {
  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Black Beetle", 105, 20, null, null, "center");

    // Include image
    const imgData = BlackBeetleImage;
    doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "The Black Beetle is a common pest affecting coconut trees. This beetle bores into the trunk and fronds, causing significant damage by disrupting the transport of nutrients and water within the tree, ultimately reducing yield and tree health.",
      20,
      160,
      { maxWidth: 170, align: "justify" }
    );

        // Add symptoms
        doc.setFontSize(14);
        doc.setTextColor(50);
        doc.setFont("helvetica", "bold");
        doc.text("Description:", 20, 150);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80);
    doc.text(
      `- Holes bored into the trunk and fronds.
- Wilting and yellowing of leaves.
- Presence of frass around bore holes.
- Reduced growth and vitality of the tree.`,
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
      `- Application of systemic insecticides to kill larvae and adults.
- Use of biological control agents such as entomopathogenic fungi.
- Regular monitoring and removal of infested parts of the tree.
- Use of traps to catch adult beetles and prevent breeding.`,
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
    doc.save("BlackBeetle.pdf");
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
              title: "Black Beetle",
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Black Beetle</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={BlackBeetleImage}
              alt="Black Beetle"
              className="w-1/4 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Black Beetle is a common pest affecting coconut trees. This
              beetle bores into the trunk and fronds, causing significant damage
              by disrupting the transport of nutrients and water within the
              tree, ultimately reducing yield and tree health.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Holes bored into the trunk and fronds.</li>
              <li>Wilting and yellowing of leaves.</li>
              <li>Presence of frass around bore holes.</li>
              <li>Reduced growth and vitality of the tree.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>
                Application of systemic insecticides to kill larvae and adults.
              </li>
              <li>
                Use of biological control agents such as entomopathogenic fungi.
              </li>
              <li>
                Regular monitoring and removal of infested parts of the tree.
              </li>
              <li>Use of traps to catch adult beetles and prevent breeding.</li>
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

export default BlackBeetle;