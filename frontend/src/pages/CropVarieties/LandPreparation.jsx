import React, { useEffect, useState } from "react";
import { Table, Button, Breadcrumb, message, Modal, Form, Input, Collapse } from "antd";
import { HomeOutlined, FilePdfOutlined, EditOutlined, LeftCircleOutlined } from "@ant-design/icons";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie } from '@ant-design/charts';
import jsPDF from 'jspdf';
import moment from 'moment'; // Add moment for date formatting
import FieldViewNavbar from "../../components/FieldView/FieldViewNavbar";

const { Panel } = Collapse;

const LandPreparation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/api/soil-tests")
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching soil tests:", error);
        message.error("Failed to fetch soil tests.");
        setLoading(false);
      });
  }, []);

  const showModal = (record) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedRecord = { ...currentRecord, ...values };
      
      axios.put(`http://localhost:5000/api/soil-tests/${currentRecord._id}`, updatedRecord)
        .then(response => {
          message.success("Record updated successfully");
          setData((prevData) =>
            prevData.map((item) => (item._id === currentRecord._id ? updatedRecord : item))
          );
          setIsModalVisible(false);
          setCurrentRecord(null);
        })
        .catch(error => {
          message.error("Failed to update record");
          console.error(error);
        });
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  // Function to get image data URL for the logo
  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  // Updated generatePDF function
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Load the logo image
    const logoUrl = '../src/assets/logo.png'; 
    try {
      const logoDataURL = await getImageDataURL(logoUrl);

      // Add the logo image to the PDF
      doc.addImage(logoDataURL, 'PNG', 10, 10, 40, 20); // Adjust x, y, width, height as needed

    } catch (error) {
      console.error('Failed to load the logo image:', error);
    }

    // Define the table columns
    const columns = [
      { title: "Field Name", dataKey: "fieldName" },
      { title: "Soil pH", dataKey: "soilPH" },
      { title: "Organic Matter Content", dataKey: "organicMatterContent" },
      { title: "Soil Type", dataKey: "soilType" },
      { title: "Nutrient Levels", dataKey: "nutrientLevels" },
      { title: "Remarks", dataKey: "remarks" },
    ];

    // Map the data to match the columns
    const rows = data.map(item => ({
      fieldName: item.fieldName,
      soilPH: item.soilPH,
      organicMatterContent: item.organicMatterContent,
      soilType: item.soilType,
      nutrientLevels: item.nutrientLevels,
      remarks: item.remarks,
    }));

    // Add title and table
    doc.setFontSize(22);
    doc.text("Land Preparation Report", 50, 40); // Adjust y-coordinate as needed

    doc.autoTable({
      columns: columns,
      body: rows,
      startY: 50, 
      margin: { horizontal: 10 },
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126], 
        textColor: [255, 255, 255], 
        fontSize: 12,
      },
      theme: 'striped',
      didDrawPage: (data) => {
        // Add page number to footer
        const pageNumber = doc.internal.getNumberOfPages();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        doc.setFontSize(10);
        doc.text(`Page ${data.pageNumber} of ${pageNumber}`, pageWidth - 25, pageHeight - 10); // Adjust position as needed
      },
    });

    // Save the PDF
    doc.save("land_preparation_report.pdf");
  };

  // Pie chart configuration for soil pH level distribution by field name
  const pieChartData = data.map((item) => ({
    type: item.fieldName,
    value: item.soilPH,
  }));

  const pieConfig = {
    appendPadding: 10,
    data: pieChartData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const columns = [
    { title: "Soil pH", dataIndex: "soilPH", key: "soilPH" },
    { title: "Nutrient Levels", dataIndex: "nutrientLevels", key: "nutrientLevels" },
    { title: "Field Name", dataIndex: "fieldName", key: "fieldName" },
    { title: "Organic Matter Content", dataIndex: "organicMatterContent", key: "organicMatterContent" },
    { title: "Soil Type", dataIndex: "soilType", key: "soilType" },
    { title: "Remarks", dataIndex: "remarks", key: "remarks" },
    {
      title: "Actions", key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(record)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <Sidebar />
      <div className={`ml-[300px]`}>
        <Breadcrumb
          items={[
            { href: "", title: <HomeOutlined /> },
            { href: "", title: "Field View" },
            { href: "", title: "Dashboard" },
            { href: "", title: "Land Preparation" },
          ]}
        />
        <FieldViewNavbar/>
        {/* Back Button */}
        <div className="mb-4">
          <LeftCircleOutlined onClick={() => navigate(-1)} style={{ fontSize: '24px', cursor: 'pointer' }} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Land Preparation</h2>
        </div>

        {/* Generate Report Button */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <Button type="primary" icon={<FilePdfOutlined />} onClick={generatePDF}>
            Generate PDF Report
          </Button>
        </div>

        {/* Pie Chart for Soil pH by Field Name */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4" id="report-content">
          <h2 className="text-lg font-semibold">Soil pH Distribution by Field</h2>
          <Pie {...pieConfig} />
        </div>

        {/* Table of Soil Tests */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table columns={columns} dataSource={data} rowKey="_id" loading={loading} pagination={false} bordered />
        </div>

        {/* Modal for editing */}
        <Modal title="Edit Soil Test" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form}>
            <Form.Item name="soilPH" label="Soil pH">
              <Input />
            </Form.Item>
            <Form.Item name="nutrientLevels" label="Nutrient Levels">
              <Input />
            </Form.Item>
            <Form.Item name="organicMatterContent" label="Organic Matter Content">
              <Input />
            </Form.Item>
            <Form.Item name="soilType" label="Soil Type">
              <Input />
            </Form.Item>
            <Form.Item name="remarks" label="Remarks">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default LandPreparation;
