import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import ThripsImage from "../../assets/DiseasesImages/Thrips.jpg";
import LogoImage from "../../assets/Logo.png";
import jsPDF from "jspdf";

const Thrips = () => {
// Function to generate PDF
const generatePDF = () => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(22);
  doc.setTextColor(40);
  doc.text("Thrips", 105, 20, null, null, "center");

  // Include image
  const imgData = ThripsImage;
  doc.addImage(imgData, "JPEG", 15, 30, 180, 100);

    // Add description with creative formatting
    doc.setFontSize(14);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 150);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(
      "Thrips are tiny insects that can cause considerable damage to a variety of plants, including coconut trees. They feed on plant tissues, leading to stippling, discoloration, and distortion of leaves and flowers. Thrips can also transmit plant viruses, compounding their impact on plant health.",
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
          `- Silver or bronzed patches on leaves.
- Deformed or stunted plant growth.
- Black or dark spots on leaves from fecal deposits.
- Reduced flowering and fruiting.`,
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
          `- Regular monitoring and use of insecticidal soaps or oils.
- Application of systemic insecticides to control infestations.
- Introduction of natural predators such as ladybugs or lacewings.
- Utilization of yellow sticky traps to capture adult thrips.`,
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
  doc.save("Thrips.pdf");
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
              title: "Thrips",
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Thrips</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={ThripsImage}
              alt="Thrips"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Thrips are tiny insects that can cause considerable damage to a
              variety of plants, including coconut trees. They feed on plant
              tissues, leading to stippling, discoloration, and distortion of
              leaves and flowers. Thrips can also transmit plant viruses,
              compounding their impact on plant health.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Silver or bronzed patches on leaves.</li>
              <li>Deformed or stunted plant growth.</li>
              <li>Black or dark spots on leaves from fecal deposits.</li>
              <li>Reduced flowering and fruiting.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular monitoring and use of insecticidal soaps or oils.</li>
              <li>
                Application of systemic insecticides to control infestations.
              </li>
              <li>
                Introduction of natural predators such as ladybugs or lacewings.
              </li>
              <li>
                Utilization of yellow sticky traps to capture adult thrips.
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

export default Thrips;
