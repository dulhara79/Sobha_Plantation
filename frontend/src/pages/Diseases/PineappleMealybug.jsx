import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import PineappleMealybugImage from '../../assets/DiseasesImages/PineappleMealybug.jpeg';
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const PineappleMealybug = () => {
  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Pineapple Mealybug", 105, 20, null, null, "center");

    // Include image
    const imgData = PineappleMealybugImage;
    doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "The Pineapple Mealybug is a pest that affects pineapple plants, causing significant damage by feeding on plant juices. This pest produces a white, waxy coating that can cover the plant, leading to reduced plant vigor and yield.",
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
      `- Presence of white, waxy coatings on plant surfaces.
- Yellowing and wilting of plant leaves.
- Stunted plant growth.
- Presence of sooty mold on honeydew-covered areas.`,
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
          `- Regular removal and destruction of infested plant parts.
- Application of systemic insecticides or insecticidal soaps.
- Introduction of natural predators like ladybugs or lacewings.
- Use of neem oil to reduce mealybug populations.`,
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
    doc.save("PineappleMealybug.pdf");
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
              title: 'Pineapple Pests and Diseases',
            },
            {
              href: '',
              title: 'Pineapple Mealybug',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Pineapple Mealybug</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={PineappleMealybugImage}
              alt="Pineapple Mealybug"
              className="w-1/5 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Pineapple Mealybug is a pest that affects pineapple plants, causing significant damage by feeding on plant juices. This pest produces a white, waxy coating that can cover the plant, leading to reduced plant vigor and yield. Infestation can also lead to the growth of sooty mold on the honeydew excreted by the mealybugs.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of white, waxy coatings on plant surfaces.</li>
              <li>Yellowing and wilting of plant leaves.</li>
              <li>Stunted plant growth.</li>
              <li>Presence of sooty mold on honeydew-covered areas.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular removal and destruction of infested plant parts.</li>
              <li>Application of systemic insecticides or insecticidal soaps.</li>
              <li>Introduction of natural predators like ladybugs or lacewings.</li>
              <li>Use of neem oil to reduce mealybug populations.</li>
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

export default PineappleMealybug;
