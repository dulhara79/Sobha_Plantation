import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Table, notification, Input, Select, Modal, Form, DatePicker } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FieldViewNavbar from '../../components/FieldView/FieldViewNavbar';
import Swal from 'sweetalert2'; // Import SweetAlert2

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

  // Function to fetch schedules
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

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Filter data based on search text and status
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
    // SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the schedule!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/schedules/${id}`);
        setData(data.filter(item => item.key !== id));
        notification.success({ message: 'Schedule deleted successfully' });
      } catch (error) {
        notification.error({ message: 'Error deleting schedule', description: error.message });
      }
    }
  };

  const handleUpdate = async () => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this schedule?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
        try {
            const updatedValues = form.getFieldsValue();
            const formattedValues = {
                ...updatedValues,
                date: updatedValues.date.format('MM/DD/YYYY'),
                scheduledDate: updatedValues.scheduledDate.format('MM/DD/YYYY'),
            };

            // Update the schedule in the backend
            await axios.put(`http://localhost:5000/api/schedules/${currentRecord.key}`, formattedValues);

            // Log current record and formatted values for debugging
            console.log('Current Record:', currentRecord);
            console.log('Formatted Values:', formattedValues);

            // Update the local state
            setData((prevData) =>
                prevData.map((item) =>
                    item.key === currentRecord.key ? { ...item, ...formattedValues } : item
                )
            );

            notification.success({ message: 'Schedule updated successfully' });
            setIsModalVisible(false);
        } catch (error) {
            notification.error({ message: 'Error updating schedule', description: error.message });
        }
    }
};

  

  const generateReport = async () => {
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
        { title: "Date", dataKey: "date" },
        { title: "Assigned Team", dataKey: "team" },
        { title: "Field Name", dataKey: "fieldName" },
        { title: "Varieties", dataKey: "varieties" },
        { title: "Scheduled Date", dataKey: "scheduledDate" },
        { title: "Status", dataKey: "status" },
        { title: "Seeds Used", dataKey: "seedsUsed" }
    ];

    // Map the filtered data to match the columns
    const rows = filteredData.map((item) => ({
        date: item.date,
        team: item.team,
        fieldName: item.fieldName,
        varieties: item.varieties,
        scheduledDate: item.scheduledDate,
        status: item.status,
        seedsUsed: item.seedsUsed || 'N/A',
    }));

    // Add title and table to PDF
    doc.setFontSize(22);
    doc.text("Variety Schedule Report", 60, 50);

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
    doc.save("VarietyScheduleReport.pdf");
    notification.success({ message: 'PDF report generated and downloaded!' });
  };

  const getImageDataURL = (url) => {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              const dataURL = canvas.toDataURL('image/png');
              resolve(dataURL);
          };
          img.onerror = (err) => {
              reject(err);
          };
      });
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
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
        </div>
      ),
    },
  ];

  // Function to restrict the plantation date to today's date and up to one year in the future
  const disabledDate = (current) => {
    const today = moment();
    const oneYearFromNow = moment().add(1, 'year');
    
    // Disable past dates and dates after one year from today
    return current < today.startOf('day') || current > oneYearFromNow.endOf('day');
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Header />
      <div className="site-layout" style={{ marginLeft: 300 }}>
        <div style={{ margin: '24px 16px 0', padding: 24, background: '#fff', minHeight: 360 }}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <HomeOutlined onClick={() => navigate('/')} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Variety Schedules</Breadcrumb.Item>
          </Breadcrumb>
          <FieldViewNavbar />

          {/* Page Header */}
          <div className="bg-white shadow-md rounded-lg p-4 my-4">
            <h2 className="text-xl font-semibold">Planting Schedule</h2>
          </div>
          
          {/* Flexbox container for search/filter and buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Select
                placeholder="Filter by Status"
                style={{ marginRight: 8, width: 200 }}
                onChange={value => setStatusFilter(value)}
                allowClear
              >
                <Option value="Planned">Planned</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
              </Select>
              <Input
                placeholder="Search"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
           {/* Button container for alignment */}
           <div style={{ display: 'flex', gap: '8px' }}>
              <Button type="primary" onClick={() => navigate('/scheduleForm')}>
                Add Schedule
              </Button>
              <Button
                type="primary"
                onClick={generateReport}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Generate Report
              </Button>
          </div>
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            pagination={{ pageSize: 10 }}
            rowKey="key"
          />

          {/* Modal for editing schedule */}
          <Modal
            title="Edit Schedule"
            visible={isModalVisible}
            onOk={handleUpdate}
            onCancel={async () => {
              // SweetAlert2 confirmation dialog
              const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Unsaved changes will be lost. Do you want to cancel?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, cancel it!',
                cancelButtonText: 'No, stay here!',
              });

              if (result.isConfirmed) {
                setIsModalVisible(false);
              }
            }}
            okText="Update"
            cancelText="Cancel"
          >
            <Form form={form} layout="vertical">
            <Form.Item
                name="date"
                label="Plantation Date"
                rules={[{ required: true, message: 'Please select a date' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format="MM/DD/YYYY"
                  disabledDate={disabledDate} // Restrict the date selection
                  onKeyPress={restrictInputToLetters}
                  onPaste={preventNonAlphabeticPaste}
                />
              </Form.Item>
              <Form.Item
                name="assignedTeam"
                label="Assigned Team"
                rules={[{ required: true, message: 'Please enter a team name' }]}
              >
                <Input
                  onKeyPress={restrictInputToLetters}
                  onPaste={preventNonAlphabeticPaste}
                />
              </Form.Item>
              <Form.Item
                name="fieldName"
                label="fieldName"
                rules={[{ required: true, message: 'Please select a Field Name' }]}
              >
                <Select placeholder="Select Field Name" allowClear>
                  <Option value="Field A">Field A</Option>
                  <Option value="Field B">Field B</Option>
                  <Option value="Field C">Field C</Option>
                  <Option value="Field C">Field C</Option>
                  
                </Select>
              </Form.Item>
              <Form.Item
                name="varieties"
                label="Varieties"
                rules={[{ required: true, message: 'Please select a variety' }]}
              >
                <Select placeholder="Select Variety" allowClear>
                  <Option value="Coconut">Coconut</Option>
                  <Option value="Papaya">Papaya</Option>
                  <Option value="Banana">Banana</Option>
                  <Option value="Pepper">Pepper</Option>
                  <Option value="Pineapple">Pineapple</Option>
                </Select>
              </Form.Item>
              <Form.Item
      name="scheduledDate"
      label="Scheduled Date"
    >
      <DatePicker
        style={{ width: '100%' }}
        format="MM/DD/YYYY"
        value={moment(currentRecord?.scheduledDate, 'MM/DD/YYYY')} // Display the current scheduled date
        disabled // Make this field read-only
      />
    </Form.Item>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select a status' }]}
              >
                <Select placeholder="Select Status" allowClear>
                  <Option value="Planned">Planned</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Completed">Completed</Option>
                </Select>
              </Form.Item>
              <Form.Item
  name="seedsUsed"
  label="Seeds Used"
  rules={[
    { required: true, message: 'Please enter the number of seeds used' },
    { type: 'number', message: 'Must be a number' },
  ]}
>
  <Input
    type="number" // Set type to number
    min={0} // Optional: Prevent negative numbers
    onKeyPress={(e) => {
      // Allow only numbers and control keys (e.g., backspace)
      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
      }
    }}
    onPaste={(e) => {
      // Prevent pasting non-numeric values
      const pasteData = (e.clipboardData || window.clipboardData).getData('text');
      if (!/^[0-9]+$/.test(pasteData)) {
        e.preventDefault();
      }
    }}
  />
</Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
    
  );
};

export default VarietySchedule;
