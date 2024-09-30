import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Button, Table, notification, Popconfirm, Input, Select, Modal, Form, DatePicker } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FieldViewNavbar from '../../components/FieldView/FieldViewNavbar';
const { Content } = Layout;
const { Option } = Select;

const VarietySchedule = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null); 
  const [form] = Form.useForm();

  // Functions to restrict input to letters
  const restrictInputToLetters = (e) => {
    const charCode = e.which || e.keyCode;
    const char = String.fromCharCode(charCode);

    // Allow alphabetic characters and spaces
    if (!/^[a-zA-Z ]+$/.test(char)) {
      e.preventDefault();
    }
  };

  const preventNonAlphabeticPaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');

    if (!/^[a-zA-Z ]+$/.test(paste)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schedules');
        const schedules = response.data;

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
    const filtered = data.filter(item => {
      const matchesSearch = searchText ? 
        (item.team.toLowerCase().includes(searchText.toLowerCase()) ||
         item.fieldName.toLowerCase().includes(searchText.toLowerCase()) ||
         item.varieties.toLowerCase().includes(searchText.toLowerCase())) : true;
      const matchesStatus = statusFilter ? item.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredData(filtered);
  }, [searchText, statusFilter, data]);

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      date: moment(record.date, 'MM/DD/YYYY'), 
      scheduledDate: moment(record.scheduledDate, 'MM/DD/YYYY'), 
    });
    setIsModalVisible(true);
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

  const handleUpdate = async () => {
    try {
      const updatedValues = form.getFieldsValue();
      const formattedValues = {
        ...updatedValues,
        date: updatedValues.date.format('MM/DD/YYYY'),
        scheduledDate: updatedValues.scheduledDate.format('MM/DD/YYYY'),
      };

      await axios.put(`http://localhost:5000/api/schedules/${currentRecord.key}`, formattedValues);
      setData(data.map(item => (item.key === currentRecord.key ? { ...item, ...formattedValues } : item)));
      notification.success({ message: 'Schedule updated successfully' });
      setIsModalVisible(false);
    } catch (error) {
      notification.error({ message: 'Error updating schedule', description: error.message });
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();

    doc.text('Variety Schedule Report', 10, 10);

    const tableHeaders = [
      ['Date', 'Assigned Team', 'Field Name', 'Varieties', 'Scheduled Date', 'Status', 'Seeds Used'],
    ];

    const tableRows = filteredData.map(item => [
      item.date,
      item.team,
      item.fieldName,
      item.varieties,
      item.scheduledDate,
      item.status,
      item.seedsUsed || 'N/A',
    ]);

    doc.autoTable({
      head: tableHeaders,
      body: tableRows,
      startY: 20,
    });

    doc.save('VarietyScheduleReport.pdf');
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Date"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onPressEnter={() => setSearchText(searchText)}
          />
        </div>
      ),
    },
    {
      title: 'Assigned Team',
      dataIndex: 'team',
      key: 'team',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Team"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onPressEnter={() => setSearchText(searchText)}
          />
        </div>
      ),
    },
    {
      title: 'Field Name',
      dataIndex: 'fieldName',
      key: 'fieldName',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Field Name"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onPressEnter={() => setSearchText(searchText)}
          />
        </div>
      ),
    },
    {
      title: 'Varieties',
      dataIndex: 'varieties',
      key: 'varieties',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Varieties"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onPressEnter={() => setSearchText(searchText)}
          />
        </div>
      ),
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
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Scheduled Date"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onPressEnter={() => setSearchText(searchText)}
          />
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Planned', value: 'Planned' },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Completed', value: 'Completed' },
      ],
      onFilter: (value, record) => record.status.includes(value),
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
      <Header />
      <Layout className="site-layout" style={{ marginLeft: 300 }}>
        
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Breadcrumb style={{ marginBottom: '16px' }}>
            <Breadcrumb.Item href="">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Field View</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Schedule</Breadcrumb.Item>
          </Breadcrumb>
          <FieldViewNavbar/>

          <div className="mb-4">
            <LeftCircleOutlined onClick={() => navigate(-1)} />
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 my-4">
            <h2 className="text-xl font-semibold">Schedule</h2>
            <p>Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
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

            <div className="flex space-x-4">
              <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/scheduleForm')}>
                + Add New Activity
              </Button>
              <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={generateReport}>
                Generate Reports
              </Button>
            </div>
          </div>

          <Table columns={columns} dataSource={filteredData} pagination={false} loading={loading} />

          <Modal
            title="Edit Schedule"
            visible={isModalVisible}
            onOk={handleUpdate}
            onCancel={() => setIsModalVisible(false)}
          >
            <Form form={form} layout="vertical">
            <Form.Item
              name="team"
              label="Assigned Team"
              rules={[{ required: true, message: 'Please input the team!' }]}
            >
              <Input
                onKeyPress={restrictInputToLetters} // Only allow letters
                onPaste={preventNonAlphabeticPaste} // Prevent non-letter paste
              />
            </Form.Item>
              <Form.Item name="fieldName" label="Field Name" rules={[{ required: true, message: 'Please select the field name!' }]}>
              <Select placeholder="Select Field Name">
                <Option value="Field A">Field A</Option>
                <Option value="Field B">Field B</Option>
                <Option value="Field C">Field C</Option>
                <Option value="Field D">Field D</Option>
                <Option value="Field E">Field E</Option>
              </Select>
            </Form.Item>
            <Form.Item name="varieties" label="Varieties" rules={[{ required: true, message: 'Please select the crop variety!' }]}>
              <Select placeholder="Select Variety">
                <Option value="Coconut">Coconut</Option>
                <Option value="Papaya">Papaya</Option>
                <Option value="Banana">Banana</Option>
                <Option value="Pepper">Pepper</Option>
                <Option value="Pineapple">Pineapple</Option>
              </Select>
            </Form.Item>
              <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date!' }]}>
                <DatePicker format="MM/DD/YYYY" />
              </Form.Item>
              <Form.Item name="scheduledDate" label="Scheduled Date" rules={[{ required: true, message: 'Please select the scheduled date!' }]}>
                <DatePicker format="MM/DD/YYYY" />
              </Form.Item>
              <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]}>
                <Select>
                  <Option value="Planned">Planned</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Completed">Completed</Option>
                </Select>
              </Form.Item>
              <Form.Item name="seedsUsed" label="Seeds Used">
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default VarietySchedule;
