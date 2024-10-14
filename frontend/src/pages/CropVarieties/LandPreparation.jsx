import React, { useEffect, useState } from "react";
import { Table, Button, Breadcrumb, message, Modal, Form, Input, Collapse, Select } from "antd";
import { HomeOutlined, FilePdfOutlined, EditOutlined, LeftCircleOutlined } from "@ant-design/icons";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie } from '@ant-design/charts';
import jsPDF from 'jspdf';
import moment from 'moment'; // Add moment for date formatting
import FieldViewNavbar from "../../components/FieldView/FieldViewNavbar";
import Swal from 'sweetalert2';

const { Panel } = Collapse;
const { Option } = Select; // Import Option from Select

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
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to save the changes?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
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
      }
    });
  };
  
  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to discard the changes?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, discard it!',
      cancelButtonText: 'No, keep editing!',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsModalVisible(false);
        setCurrentRecord(null);
      }
    });
  };
  

  const determineNutrientLevels = (soilPH) => {
    if (soilPH < 6) {
      return "high"; // High nutrient levels for acidic soil
    } else if (soilPH >= 6 && soilPH <= 7.5) {
      return "medium"; // Medium nutrient levels for neutral soil
    } else {
      return "low"; // Low nutrient levels for alkaline soil
    }
  };

  const handleSoilPHChange = (value) => {
    if (value >= 0 && value <= 14) {
      const nutrientLevel = determineNutrientLevels(value);
      form.setFieldsValue({ nutrientLevels: nutrientLevel }); // Automatically set nutrient level
    }
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

  // Handle PDF generation
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Load the logo image
    const logoUrl = '../src/assets/logo.png'; // Adjust the path to your logo as necessary
    let logoDataURL = null;
    try {
      logoDataURL = await getImageDataURL(logoUrl);
    } catch (error) {
      console.error('Failed to load the logo image:', error);
    }

    // Header
    const pageWidth = doc.internal.pageSize.width;
    doc.setFontSize(14);
    doc.text("Sobha Plantation", 10, 10); // Align left
    doc.setFontSize(10);
    doc.text("317/23, Nikaweratiya,", 10, 15); // Address line 1
    doc.text("Kurunagala, Sri Lanka.", 10, 20); // Address line 2
    doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25); // Email address
    doc.text("Contact: 0112 751 757", 10, 30); // Contact

    // Add logo if it exists
    if (logoDataURL) {
      doc.addImage(logoDataURL, 'PNG', pageWidth - 50, 10, 40, 10); // Align right
    }
    doc.line(10, 35, pageWidth - 10, 35); // Header line

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
    doc.text("Land Preparation Report", 50, 50); // Adjust y-coordinate as needed

    doc.autoTable({
      columns: columns,
      body: rows,
      startY: 60, 
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
        const pageNumber = doc.internal.getNumberOfPages();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        doc.setFontSize(10);
        doc.text(`Page ${data.pageNumber} of ${pageNumber}`, pageWidth - 25, pageHeight - 10);
      },
    });

    // Save the PDF
    doc.save("land_preparation_report.pdf");
    message.success({ content: 'PDF report generated and downloaded!' });
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

        <div className="mb-4">
          <LeftCircleOutlined onClick={() => navigate(-1)} style={{ fontSize: '24px', cursor: 'pointer' }} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Land Preparation</h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <button type="primary" icon={<FilePdfOutlined />} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={generatePDF}>
            Generate PDF Report
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 my-4" id="report-content">
          <h2 className="text-lg font-semibold">Soil pH Distribution by Field</h2>
          <Pie {...pieConfig} />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table columns={columns} dataSource={data} rowKey="_id" loading={loading} pagination={false} bordered />
        </div>

        <Modal title="Edit Soil Test" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form}>
            <Form.Item 
              name="soilPH" 
              label="Soil pH" 
              rules={[{ required: true, message: 'Please input a valid Soil pH!' }]}
            >
              <Input 
                type="number" 
                min={0} 
                max={14} 
                step="0.1" 
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  handleSoilPHChange(value);
                }} 
              />
            </Form.Item>
            
            <Form.Item name="nutrientLevels" label="Nutrient Levels" rules={[{ required: true, message: 'Please select the nutrient levels!' }]}>
            <Select disabled> {/* Disable the dropdown to prevent manual selection */}
          <Select.Option value="high">High</Select.Option>
          <Select.Option value="medium">Medium</Select.Option>
          <Select.Option value="low">Low</Select.Option>
        </Select>
            </Form.Item>

            <Form.Item name="organicMatterContent" label="Organic Matter Content" rules={[{ required: true, message: 'Please select the organic matter content!' }]}>
              <Select>
                <Select.Option value="high">High</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="low">Low</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="soilType" label="Soil Type">
            <Select>
        <Select.Option value="sandy">Sandy</Select.Option>
        <Select.Option value="loamy">Loamy</Select.Option>
        <Select.Option value="clay">Clay</Select.Option>
        <Select.Option value="peat">Peat</Select.Option>
        <Select.Option value="chalky">Chalky</Select.Option>
        {/* Add more soil types as needed */}
      </Select>
            </Form.Item>

            <Form.Item name="remarks" label="Remarks">
            <Input 
    onKeyPress={(e) => {
      if (/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    }} 
  />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default LandPreparation;
