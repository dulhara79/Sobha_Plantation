import React from "react";
import { Layout, Breadcrumb, Button, Table } from "antd";
import { HomeOutlined, SearchOutlined, FilePdfOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar"; // Assuming you have a Sidebar component
import Header from "../../components/Header";   // Assuming you have a Header component

const { Content } = Layout;

const VarietySchedule = () => {
  const navigate = useNavigate();

  // Define the table columns including Scheduled Date and Status
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Assigned Team",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Field Name",
      dataIndex: "fieldName",
      key: "fieldName",
    },
    {
      title: "Varieties",
      dataIndex: "varieties",
      key: "varieties",
    },
    {
      title: "Date Comparison",
      dataIndex: "dateComparison",
      key: "dateComparison",
    },
    {
      title: "Scheduled Date",
      dataIndex: "scheduledDate",
      key: "scheduledDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        let color;
        if (text === "Completed") color = "green";
        else if (text === "In Progress") color = "blue";
        else if (text === "Scheduled") color = "orange";
        return <span style={{ color }}>{text}</span>;
      }
    },
    {
      title: "Seeds Used",
      dataIndex: "seedsUsed",
      key: "seedsUsed",
      render: (text) => <span style={{ color: text === "Papaya" ? "blue" : "green" }}>{text}</span>
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: () => (
        <div className="flex space-x-2">
          <Button icon={<SearchOutlined />} />
          <Button icon={<FilePdfOutlined />} />
        </div>
      )
    },
  ];

  // Define the table data with Scheduled Date and Status
  const data = [
    {
      key: "1",
      date: "2024-08-20",
      team: "T.Perera",
      fieldName: "Field A",
      varieties: "Papaya",
      dateComparison: "1 day overdue",
      scheduledDate: "2024-08-19",
      status: "In Progress",
      seedsUsed: "Papaya",
    },
    {
      key: "2",
      date: "2024-08-18",
      team: "S.Bandara",
      fieldName: "Field B",
      varieties: "Coconut",
      dateComparison: "To date",
      scheduledDate: "2024-08-18",
      status: "Scheduled",
      seedsUsed: "Dwarf Coconut",
    },
    {
      key: "3",
      date: "2024-08-20",
      team: "W.Sirisena",
      fieldName: "Field C",
      varieties: "Pepper",
      dateComparison: "1 day late",
      scheduledDate: "2024-08-19",
      status: "Completed",
      seedsUsed: "Pepper",
    },
    {
      key: "4",
      date: "2024-08-21",
      team: "Lasantha",
      fieldName: "Field D",
      varieties: "Banana",
      dateComparison: "To date",
      scheduledDate: "2024-08-21",
      status: "Scheduled",
      seedsUsed: "Banana",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout className="site-layout" style={{ marginLeft: 300 }}>
        <Header />
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          <Breadcrumb style={{ marginBottom: "16px" }}>
            <Breadcrumb.Item href="">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Land prepare</Breadcrumb.Item>
            <Breadcrumb.Item>Crop Variety</Breadcrumb.Item>
            <Breadcrumb.Item>Seedling</Breadcrumb.Item>
            <Breadcrumb.Item>Growth</Breadcrumb.Item>
            <Breadcrumb.Item>Schedule</Breadcrumb.Item>
          </Breadcrumb>
{/* Back Button */}
<div className="mb-4">
          {/* <Button onClick={() => navigate(-1)} className="bg-gray-300 text-black"> */}
          <LeftCircleOutlined onClick={() => navigate(-1)}/>
          {/* </Button> */}
        </div>

          {/* Page Header */}
    <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Schedule</h2>
          <p>Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="flex justify-center space-x-20 mb-4">
  <Button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/scheduleForm')}>
  
    <span>+ Add New Activity</span>
  </Button>
  <Button className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
    <span>Generate Reports</span>
  </Button>
</div>

          {/* Table */}
          <Table columns={columns} dataSource={data} pagination={false} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default VarietySchedule;
