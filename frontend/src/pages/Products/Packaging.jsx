import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, DatePicker, Select, Form, notification, Divider, Typography, Space, Table } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, QrcodeOutlined, FilePdfOutlined } from '@ant-design/icons';
import { QRCodeCanvas } from 'qrcode.react';
import PackagingInstructions from '../../components/Products/PackagingInstructions';
import PackageOverviewChart from '../../components/Products/PackageOverviewChart';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "../../index.css";
import LoadingDot from '../../components/LoadingDots'; 

const { Option } = Select;
const { Title } = Typography;
const { Search } = Input;

const Packaging = () => {
  const [packagingData, setPackagingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(''); 
  const [loading, setLoading] = useState(true);


  // Fetch packaging data from the backend
  const fetchPackagingData = async () => {
    try {
      setTimeout(async () => {
      const response = await axios.get("http://localhost:5000/api/packaging");
      if (response.data.success) {
        setPackagingData(response.data.data);
        calculatePerformanceMetrics(response.data.data);
      }
      setLoading(false); // Stop loading after data fetch
    }, 150); // Adjust the delay as needed
    } catch (error) {
      console.error("Error fetching packaging data:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
  
    const filteredData = packagingData.filter((item) => {
      return (
        item.productName.toLowerCase().includes(value.toLowerCase()) ||
        item.packagingMaterial.toLowerCase().includes(value.toLowerCase()) ||
        item.packagingType.toLowerCase().includes(value.toLowerCase()) ||
        item.status.toLowerCase().includes(value.toLowerCase()) ||
        item.quantity.toString().includes(value) ||
        moment(item.packagingDate).format('YYYY-MM-DD').includes(value)
      );
    });
  
    setFilteredData(filteredData);
  };
  

  // Calculate performance metrics
  const calculatePerformanceMetrics = (data) => {
    const totalPackages = data.length;
    const completedPackages = data.filter(item => item.status === 'Completed').length;
    const pendingPackages = totalPackages - completedPackages;

    setPerformanceMetrics({
      totalPackages,
      completedPackages,
      pendingPackages,
    });
  };

  useEffect(() => {
    fetchPackagingData();
  }, []);

  

  const showModal = (id) => {
    navigate(`/products/editPackage/${id}`);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (currentRecord) {
        await axios.put(`http://localhost:5000/api/packaging/${currentRecord._id}`, values);
        notification.success({ message: 'Packaging schedule updated successfully!' });
      } else {
        await axios.post("http://localhost:5000/api/packaging", values);
        notification.success({ message: 'Packaging schedule added successfully!' });
      }
      fetchPackagingData(); // Refresh data
    } catch (error) {
      notification.error({ message: 'Error saving packaging schedule!' });
      console.error("Error saving packaging schedule:", error);
    } finally {
      setIsModalVisible(false);
      setCurrentRecord(null);
    }
  };

  // Confirm delete
  const confirmDelete = (recordId) => {
    Swal.fire({
      title: "Are you sure you want to delete this package?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(recordId);
        Swal.fire({
          title: "Deleted!",
          text: "Your package has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle delete
  const handleDelete = async (recordId) => {
    try {
      await axios.delete(`http://localhost:5000/api/packaging/${recordId}`);
      fetchPackagingData(); // Refresh the schedule list
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `Failed to delete the schedule. ${error.response?.data?.message || 'Please try again.'}`,
        icon: "error",
      });
    }
  };


// Function to get image data URL for the logo
const getImageDataURL = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Handle cross-origin images
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

// Function to generate PDF
const generatePDF = async () => {
  const doc = new jsPDF();
  const logoUrl = '../src/assets/logo.png'; // Update with your actual logo path

  let logoDataURL;
  try {
    logoDataURL = await getImageDataURL(logoUrl);
  } catch (error) {
    console.error('Failed to load the logo image:', error);
  }

  // Function to draw header and footer
  const drawHeaderFooter = (data) => {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Header
    doc.setFontSize(14);
    doc.text("Sobha Plantation", 10, 10); // Align left

    doc.setFontSize(10);
    doc.text("317/23, Nikaweratiya,", 10, 15); // Address line 1
    doc.text("Kurunagala, Sri Lanka.", 10, 20); // Address line 2
    doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25); // Email address line
    doc.text("Contact: 0112 751 757", 10, 30); // Email address line

    if (logoDataURL) {
      doc.addImage(logoDataURL, 'PNG', pageWidth - 50, 10, 40, 10); // Align right (adjust the x position as needed)
    }

    doc.line(10, 35, pageWidth - 10, 35); // Header line

    // Footer
    doc.setFontSize(10);
    doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 30, pageHeight - 10);
  };

  // Title
  doc.setFontSize(22);
  doc.text("Packaging Schedule Report", 60, 48);

  // Calculate total quantity
  const totalQuantity = packagingData.reduce((sum, item) => sum + item.quantity, 0);

  // Overview details
  const overviewHeaders = [['Detail', 'Value']];
  const overviewRows = [
    ['Total Packages', `${packagingData.length}`],
    ['Completed Packages', `${performanceMetrics.completedPackages}`],
    ['Pending Packages', `${performanceMetrics.pendingPackages}`],
    ['Total Quantity', `${totalQuantity}`],
  ];

  // AutoTable for overview details
  doc.autoTable({
    startY: 60,
    head: overviewHeaders,
    body: overviewRows,
    margin: { top: 20, bottom: 20 },
    styles: { fontSize: 10 },
    headStyles: { fillColor: [64, 133, 126], textColor: [255, 255, 255], fontSize: 12 },
    theme: 'grid',
    didDrawPage: drawHeaderFooter,
  });

  // Packaging details table
  const tableHeaders = [['Product Name', 'Quantity', 'Packaging Date', 'Status', 'Packaging Material', 'Packaging Type']];
  const tableRows = packagingData.map((item) => [
    item.productName,
    item.quantity,
    moment(item.packagingDate).format('YYYY-MM-DD'),
    item.status,
    item.packagingMaterial,
    item.packagingType,
  ]);

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10, // Start below the previous table
    head: tableHeaders,
    body: tableRows,
    margin: { top: 20, bottom: 20 },
    styles: { fontSize: 10 },
    headStyles: { fillColor: [64, 133, 126], textColor: [255, 255, 255], fontSize: 12 },
    theme: 'striped',
    didDrawPage: drawHeaderFooter,
  });

  // Save the PDF
  doc.save('packaging-schedule-report.pdf');
};


const showQrModal = (record) => {
  setQrCodeData(
    `Product: ${record.productName}\n` +
    `Quantity: ${record.quantity}\n` +
    `Date: ${moment(record.packagingDate).format('YYYY-MM-DD')}\n` + // Format date
    `Status: ${record.status}\n` +
    `Packaging Material: ${record.packagingMaterial}\n` +
    `Packaging Type: ${record.packagingType}`
  );
  setQrModalVisible(true);
};


const handleQrModalCancel = () => {
  setQrModalVisible(false);
  setQrCodeData('');
};

const handleDownloadQrCode = () => {
  const canvas = document.getElementById('qr-code-canvas');
  const pngUrl = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');
  
  const link = document.createElement('a');
  link.download = 'qr-code.png';
  link.href = pngUrl;
  link.click();
};

const handleCopyShareLink = () => {
  // Encode the QR code data for URL compatibility
  const encodedQrCodeData = encodeURIComponent(qrCodeData);
  const shareLink = `${window.location.origin}/share/${encodedQrCodeData}`;

  navigator.clipboard.writeText(shareLink)
    .then(() => {
      notification.success({ message: 'Share link copied to clipboard!' });
    })
    .catch(() => {
      notification.error({ message: 'Failed to copy share link.' });
    });

};


if (loading) return <LoadingDot />;

return (
    <div style={{ padding: '24px' }}>
      {/* Packaging Management Section */}
      <Title level={3} style={{ marginBottom: '24px', fontWeight: 'bold', color: '#1D6660' }}>Packaging Management</Title>

      {/* Performance Metrics Chart */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '75px' }}>
        <PackageOverviewChart data={performanceMetrics} />
      </div>

      {/* Packaging Schedule Table */}
      <Divider style={{ marginBottom: '40px', fontSize: '20px', fontWeight: 'bold', color: '#1D6660' }}>
        Packaging Schedule
      </Divider>

      {/* Search and Filters */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        {/* Search Input and Status Filter Dropdown */}
        <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {/* Search Input */}
          <Input
             placeholder="Search packaging..."
             value={searchText}
            onChange={handleSearch}
             style={{ width: 200, marginRight: 16 }}
             allowClear
           />

          {/* Status Filter Dropdown */}
          <Select
            defaultValue="All"
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            style={{ width: 120 }}
          >
            <Option value="">All</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="primary"
            icon={<FilePdfOutlined />}
            style={{ marginRight: '8px', backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#000000' }}
            onClick={generatePDF}
          >
            Generate Report
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/products/addPackage')} // Navigates to the add package page
            style={{ backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#000000' }}
          >
            Add Packaging
          </Button>
        </div>
      </div>

    {/* Packaging Data Table */}
    <Table
      dataSource={packagingData
        .filter((item) => item.productName.toLowerCase().includes(searchText.toLowerCase()))
        .filter((item) => selectedStatus === '' || item.status === selectedStatus)}
      rowKey="_id"
      pagination={{ pageSize: 10 }}
    >
      <Table.Column title="Product Name" dataIndex="productName" key="productName" />
      <Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
      <Table.Column title="Packaging Date" dataIndex="packagingDate" key="packagingDate" render={date => moment(date).format('YYYY-MM-DD')} />
      <Table.Column title="Status" dataIndex="status" key="status" />
      <Table.Column title="Packaging Material" dataIndex="packagingMaterial" key="packagingMaterial" />
      <Table.Column title="Packaging Type" dataIndex="packagingType" key="packagingType" />
      <Table.Column
        title="Actions"
        key="actions"
        render={(text, record) => (
          <Space>
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => showModal(record._id)}
              style={{ marginRight: 8, backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }}
            />
            <Button
              type="default"
              icon={<DeleteOutlined />}
              onClick={() => confirmDelete(record._id)}
              style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: '#fff' }}
            />
            <Button
              type="default"
              icon={<QrcodeOutlined />}
              onClick={() => showQrModal(record)}
              style={{ backgroundColor: '#1D6660', borderColor: '#1D6660', color: '#fff' }}
            />
          </Space>
        )}
      />
    </Table>

    {/* Packaging Instructions Section */}
    <PackagingInstructions />

     {/* Modal for QR Code */}
     <Modal
          title="QR Code"
          visible={qrModalVisible}
          onCancel={handleQrModalCancel}
          footer={[
            <Button key="download" type="primary" onClick={handleDownloadQrCode}>
              Download QR Code
            </Button>,
            <Button key="copy" type="primary" onClick={handleCopyShareLink}>
              Copy Share Link
            </Button>,
            <Button key="close" onClick={handleQrModalCancel}>
              Close
            </Button>,
          ]}
        >
          <QRCodeCanvas id="qr-code-canvas" value={qrCodeData} size={256} />
        </Modal>

    {/* Add/Edit Packaging Modal */}
    <Modal
      title={currentRecord ? 'Edit Packaging' : 'Add Packaging'}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        initialValues={currentRecord ? {
          productName: currentRecord.productName,
          quantity: currentRecord.quantity,
          packagingDate: moment(currentRecord.packagingDate),
          status: currentRecord.status,
          packagingMaterial: currentRecord.packagingMaterial,
          packagingType: currentRecord.packagingType,
        } : {}}
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Product Name"
          name="productName"
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Packaging Date"
          name="packagingDate"
          rules={[{ required: true, message: 'Please select the packaging date!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select the status!' }]}
        >
          <Select placeholder="Select status">
            <Option value="Completed">Completed</Option>
            <Option value="Pending">Pending</Option>
            <Option value="In Progress">In Progress</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Packaging Material"
          name="packagingMaterial"
          rules={[{ required: true, message: 'Please input the packaging material!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Packaging Type"
          name="packagingType"
          rules={[{ required: true, message: 'Please select the packaging type!' }]}
        >
          <Select placeholder="Select packaging type">
            <Option value="Box">Box</Option>
            <Option value="Bag">Bag</Option>
            <Option value="Pallet">Pallet</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#000000' }}>
            {currentRecord ? 'Update Packaging' : 'Add Packaging'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </div>
);
};

export default Packaging;
