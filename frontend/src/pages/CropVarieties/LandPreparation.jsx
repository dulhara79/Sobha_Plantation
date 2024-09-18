import React, { useEffect, useState } from "react";
import { Table, Button, Breadcrumb, message, Modal, Form, Input, Collapse } from "antd";
import { HomeOutlined, FilePdfOutlined, EditOutlined, LeftCircleOutlined } from "@ant-design/icons";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie } from '@ant-design/charts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  const generateReport = () => {
    const content = document.getElementById('report-content');
    html2canvas(content, { useCORS: true })
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        let heightLeft = imgHeight - 295;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= 295;
        }

        pdf.save('land-preparation-report.pdf');
      })
      .catch(error => {
        console.error("Error generating PDF report:", error);
        message.error("Failed to generate report.");
      });
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
        {/* Back Button */}
        <div className="mb-4">
          <LeftCircleOutlined onClick={() => navigate(-1)} style={{ fontSize: '24px', cursor: 'pointer' }} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Land Preparation</h2>
        </div>

        {/* Guidelines Section */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-lg font-semibold">Guidelines for Land Preparation</h2>
          <Collapse accordion>
            <Panel header="1. Soil Testing" key="1">
              <p>Conduct soil testing to determine the nutrient levels, pH, and organic matter content. This will guide the necessary adjustments for your land.</p>
            </Panel>
            <Panel header="2. Clearing the Land" key="2">
              <p>Remove any debris, weeds, and unwanted vegetation. Ensure the land is clean and ready for tilling.</p>
            </Panel>
            <Panel header="3. Tilling the Soil" key="3">
              <p>Till the soil to improve its structure and promote water and nutrient penetration. Depending on your crop, till to the appropriate depth.</p>
            </Panel>
            <Panel header="4. Adding Organic Matter" key="4">
              <p>Incorporate compost or organic matter to enhance soil fertility and improve its ability to retain water.</p>
            </Panel>
            <Panel header="5. Leveling the Land" key="5">
              <p>Level the soil to prevent waterlogging or uneven irrigation. This is particularly important for certain crops like rice.</p>
            </Panel>
            <Panel header="6. Irrigation Planning" key="6">
              <p>Ensure proper irrigation channels or systems are in place to support efficient water distribution during crop growth.</p>
            </Panel>
            <Panel header="7. Fertilization" key="7">
              <p>Based on soil test results, apply the necessary fertilizers to address nutrient deficiencies before planting.</p>
            </Panel>
          </Collapse>
        </div>

        {/* Generate Report Button */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <Button type="primary" icon={<FilePdfOutlined />} onClick={generateReport}>
            Generate Report
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
          <Form form={form} layout="vertical">
            <Form.Item name="soilPH" label="Soil pH" rules={[{ required: true, message: 'Please input Soil pH!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="nutrientLevels" label="Nutrient Levels" rules={[{ required: true, message: 'Please input Nutrient Levels!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fieldName" label="Field Name" rules={[{ required: true, message: 'Please input Field Name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="organicMatterContent" label="Organic Matter Content" rules={[{ required: true, message: 'Please input Organic Matter Content!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="soilType" label="Soil Type" rules={[{ required: true, message: 'Please input Soil Type!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="remarks" label="Remarks" rules={[{ required: true, message: 'Please input Remarks!' }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default LandPreparation;
