import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Button, Table, notification, Popconfirm, Input, Select, Space } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'; // Assuming you have a Sidebar component
import Header from '../../components/Header';   // Assuming you have a Header component

const { Content } = Layout;
const { Option } = Select;

const VarietySchedule = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schedules');
        const schedules = response.data;

        // Format the data for the table
        const formattedData = schedules.map(schedule => ({
          key: schedule._id,
          date: new Date(schedule.plantationDate).toLocaleDateString('en-US'),
          team: schedule.assignedTeam,
          fieldName: schedule.fieldName,
          varieties: schedule.cropVariety,
          dateComparison: new Date(schedule.scheduledDate) > new Date() ? 'To date' : 'Overdue',
          scheduledDate: new Date(schedule.scheduledDate).toLocaleDateString('en-US'),
          status: schedule.status,
          seedsUsed: schedule.seedsUsed,
        }));

        setData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        notification.error({ message: 'Error fetching schedules', description: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    // Filter data based on search text and status filter
    const filtered = data.filter(item => {
      const matchesSearch = item.fieldName.toLowerCase().includes(searchText.toLowerCase()) ||
                            item.team.toLowerCase().includes(searchText.toLowerCase()) ||
                            item.varieties.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilter ? item.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredData(filtered);
  }, [searchText, statusFilter, data]);

  const handleEdit = (record) => {
    navigate(`/scheduleForm/${record.key}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/schedules/${id}`);
      setData(data.filter(item => item.key !== id));
      notification.success({ message: 'Schedule deleted successfully' });
    } catch (error) {
      notification.error({ message: 'Error deleting schedule', description: error.message });
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Assigned Team',
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: 'Field Name',
      dataIndex: 'fieldName',
      key: 'fieldName',
    },
    {
      title: 'Varieties',
      dataIndex: 'varieties',
      key: 'varieties',
    },
    {
      title: 'Date Comparison',
      dataIndex: 'dateComparison',
      key: 'dateComparison',
    },
    {
      title: 'Scheduled Date',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let color;
        if (text === 'Completed') color = 'green';
        else if (text === 'In Progress') color = 'blue';
        else if (text === 'Scheduled') color = 'orange';
        return <span style={{ color }}>{text}</span>;
      }
    },
    {
      title: 'Seeds Used',
      dataIndex: 'seedsUsed',
      key: 'seedsUsed',
    },
    {
      title: 'Remarks',
      key: 'remarks',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure you want to delete this schedule?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout" style={{ marginLeft: 300 }}>
        <Header />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Breadcrumb style={{ marginBottom: '16px' }}>
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
            <LeftCircleOutlined onClick={() => navigate(-1)} />
          </div>

          {/* Page Header */}
          <div className="bg-white shadow-md rounded-lg p-4 my-4">
            <h2 className="text-xl font-semibold">Schedule</h2>
            <p>Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center space-x-4 mb-4">
            <Input.Search
              placeholder="Search..."
              onSearch={value => setSearchText(value)}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              placeholder="Select Status"
              allowClear
              style={{ width: 200 }}
              onChange={value => setStatusFilter(value)}
            >
              <Option value="Planned">Planned</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
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
          <Table columns={columns} dataSource={filteredData} pagination={false} loading={loading} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default VarietySchedule;
