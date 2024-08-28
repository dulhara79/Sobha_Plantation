import React from "react";
import { Table, Button, Breadcrumb, message } from "antd";
import { HomeOutlined, PlusOutlined, FilePdfOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const LandPreparation = () => {
  const handleEdit = (key) => {
    message.info(`Editing item with key: ${key}`);
    // Implement your edit functionality here
  };

  const handleDelete = (key) => {
    // Confirm before deletion
    if (window.confirm(`Are you sure you want to delete item with key: ${key}?`)) {
      message.info(`Deleted item with key: ${key}`);
      // Implement your delete functionality here
    }
  };

  const handleInfo = (key) => {
    message.info(`Info for item with key: ${key}`);
    // Implement your info functionality here
  };

  const columns = [
    {
      title: "Soil pH",
      dataIndex: "soilPH",
      key: "soilPH",
    },
    {
      title: "Nutrient Levels",
      dataIndex: "nutrientLevels",
      key: "nutrientLevels",
    },
    {
      title: "Field Name",
      dataIndex: "fieldName",
      key: "fieldName",
    },
    {
      title: "Organic Matter Content",
      dataIndex: "organicMatterContent",
      key: "organicMatterContent",
    },
    {
      title: "Soil Type",
      dataIndex: "soilType",
      key: "soilType",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.key)}
          />
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      soilPH: "6.5",
      nutrientLevels: "N",
      fieldName: "Field A",
      organicMatterContent: "Low",
      soilType: "Clayey",
      remarks: "Suitable for coconut plant",
    },
    {
      key: "2",
      soilPH: "4.3",
      nutrientLevels: "P",
      fieldName: "Field B",
      organicMatterContent: "High",
      soilType: "Loamy",
      remarks: "Good for intercropping",
    },
    {
      key: "3",
      soilPH: "7.5",
      nutrientLevels: "K",
      fieldName: "Field C",
      organicMatterContent: "Medium",
      soilType: "Clayey",
      remarks: "Suitable for pepper plant",
    },
    {
      key: "4",
      soilPH: "10",
      nutrientLevels: "P",
      fieldName: "Field D",
      organicMatterContent: "Medium",
      soilType: "Clayey",
      remarks: "Suitable for banana plant",
    },
  ];

  return (
    <div>
      <Header />
      <Sidebar />

      <div className={`ml-[300px]`}>
        <Breadcrumb
          items={[
            {
              href: "",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: "Field View",
            },
            {
              href: "",
              title: "Dashboard",
            },
            {
              href: "",
              title: "Land Preparation",
            },
          ]}
        />

        {/* Page Header */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Land Preparation</h2>
          <p>
            Today is{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-20 mb-4">
          <Button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            icon={<PlusOutlined />}
          >
            Add New Activity
          </Button>
          <Button
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            icon={<FilePdfOutlined />}
          >
            Generate Reports
          </Button>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default LandPreparation;
