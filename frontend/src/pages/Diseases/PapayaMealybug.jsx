import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import PapayaMealybugImage from '../../assets/DiseasesImages/PapayaMealybug.jpeg';
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const PapayaMealybug = () => {

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Papaya Mealybug", 105, 20, null, null, "center");

    // Include image
    const imgData = PapayaMealybugImage;
    doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "The Papaya Mealybug is a common pest that infests papaya plants, feeding on the sap of leaves, stems, and fruits. This can lead to stunted growth, deformed fruit, and a reduction in overall plant health. The mealybugs excrete a sticky substance that can attract sooty mold, further harming the plant.",
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
      `- Presence of white, waxy clusters on leaves, stems, and fruits.
- Yellowing and wilting of affected plant parts.
- Stunted growth and reduced fruit size.
- Sticky residue on plant surfaces and surrounding areas.`,
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
      `- Regular inspection and removal of mealybugs by hand.
- Application of insecticidal soaps or neem oil.
- Introduce natural predators like ladybugs or lacewings.
- Maintain good plant hygiene and remove heavily infested plants.`,
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
    doc.save("PapayaMealybug.pdf");
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="ml-[300px] p-4"> {/* Adjust margin-left as per your layout */}
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: 'Papaya Pests and Diseases',
            },
            {
              href: '',
              title: 'Papaya Mealybug',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Papaya Mealybug</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={PapayaMealybugImage}
              alt="Papaya Mealybug"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Papaya Mealybug is a common pest that infests papaya plants, feeding on the sap of leaves, stems, and fruits. This can lead to stunted growth, deformed fruit, and a reduction in overall plant health. The mealybugs excrete a sticky substance that can attract sooty mold, further harming the plant.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of white, waxy clusters on leaves, stems, and fruits.</li>
              <li>Yellowing and wilting of affected plant parts.</li>
              <li>Stunted growth and reduced fruit size.</li>
              <li>Sticky residue on plant surfaces and surrounding areas.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular inspection and removal of mealybugs by hand.</li>
              <li>Application of insecticidal soaps or neem oil.</li>
              <li>Introduce natural predators like ladybugs or lacewings.</li>
              <li>Maintain good plant hygiene and remove heavily infested plants.</li>
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

export default PapayaMealybug;
