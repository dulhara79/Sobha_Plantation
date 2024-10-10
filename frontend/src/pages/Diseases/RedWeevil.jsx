import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import RedWeevilImage from '../../assets/DiseasesImages/RedWeevil.jpg';
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const RedWeevil = () => {
  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Red Palm Weevil", 105, 20, null, null, "center");

    // Include image
    const imgData = RedWeevilImage;
    doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "The Red Palm Weevil is a significant pest affecting palm species, including coconut palms. The larvae bore into the trunk, causing structural damage, and potentially leading to the collapse and death of the tree if left untreated.",
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
      `- Visible holes on the trunk with oozing sap.
- Presence of frass (insect excrement) near the entry points.
- Wilting and yellowing of fronds.
- Unnatural leaning or collapse of the tree in severe cases.`,

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
      `- Regular inspection and removal of infested parts.
- Application of insecticidal treatments to affected areas.
- Use of pheromone traps to monitor and reduce adult populations.
- Implementing biological controls using entomopathogenic fungi.`,
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
    doc.save("RedPalmWeevil.pdf");
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
              title: 'Red Palm Weevil',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Red Palm Weevil</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={RedWeevilImage}
              alt="Red Palm Weevil"
              className="w-1/5 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Red Palm Weevil is a significant pest affecting palm species, including coconut palms. The larvae bore into the trunk, causing structural damage, and potentially leading to the collapse and death of the tree if left untreated.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Visible holes on the trunk with oozing sap.</li>
              <li>Presence of frass (insect excrement) near the entry points.</li>
              <li>Wilting and yellowing of fronds.</li>
              <li>Unnatural leaning or collapse of the tree in severe cases.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular inspection and removal of infested parts.</li>
              <li>Application of insecticidal treatments to affected areas.</li>
              <li>Use of pheromone traps to monitor and reduce adult populations.</li>
              <li>Implementing biological controls using entomopathogenic fungi.</li>
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

export default RedWeevil;
