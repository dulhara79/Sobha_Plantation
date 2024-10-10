import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import TermiteImage from '../../assets/DiseasesImages/Termite.jpg';
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const Termite = () => {
// Function to generate PDF
const generatePDF = () => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(22);
  doc.setTextColor(40);
  doc.text("Termite", 105, 20, null, null, "center");

  // Include image
  const imgData = TermiteImage;
  doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "Termites are a group of pests that can cause extensive damage to coconut trees by feeding on the wood and other organic materials within the tree. This can weaken the structural integrity of the tree, potentially leading to its collapse or death.",
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
          `- Hollow-sounding wood.
- Visible termite mud tubes on the trunk and branches.
- Frass (termite droppings) near the base of the tree.
- Dead or dying branches.`,
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
      `- Applying termiticides around the base of the tree.
- Removing and burning infested parts of the tree.
- Introducing natural predators like ants to control termite populations.
- Maintaining tree health to reduce susceptibility to termites.
- Regular inspection and monitoring of termite activity.`,
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
  doc.save("Termite.pdf");
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
              title: 'Termites',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Termites</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={TermiteImage}
              alt="Termites"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Termites are a group of pests that can cause extensive damage to coconut trees by feeding on the wood and other organic materials within the tree. This can weaken the structural integrity of the tree, potentially leading to its collapse or death.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Hollow-sounding wood.</li>
              <li>Visible termite mud tubes on the trunk and branches.</li>
              <li>Frass (termite droppings) near the base of the tree.</li>
              <li>Dead or dying branches.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Applying termiticides around the base of the tree.</li>
              <li>Removing and burning infested parts of the tree.</li>
              <li>Introducing natural predators like ants to control termite populations.</li>
              <li>Maintaining tree health to reduce susceptibility to termites.</li>
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

export default Termite;
