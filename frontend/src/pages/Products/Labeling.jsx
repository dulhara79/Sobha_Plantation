import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, message, Modal, Input, Space, Select } from 'antd';
import { ArrowLeftOutlined, FilePdfOutlined, DeleteOutlined, EyeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'; // Import DeleteOutlined icon
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import LoadingDot from '../../components/LoadingDots'; 
import BarGraph from '../../components/Products/Labeling/BarGraph';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const Labeling = () => {
  const [labelingData, setLabelingData] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedLabeling, setSelectedLabeling] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({});
  const [sorter, setSorter] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product types from backend
    const fetchProductTypes = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get('http://localhost:5000/api/labeling-prices');
          setProductTypes(response.data.data || []);
        setLoading(false); // Stop loading after data fetch
    }, 150); // delay 
      } catch (error) {
        console.error('Error fetching product types:', error);
        message.error('Failed to fetch product types');
      }
    };

    // Fetch labeling data from backend
    const fetchLabelingData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/labeling');
        setLabelingData(response.data.data || []);
      } catch (error) {
        console.error('Error fetching labeling data:', error);
        message.error('Failed to fetch labeling data');
      }
    };

    fetchProductTypes();
    fetchLabelingData();
  }, []);

  const getProductTypePrice = (productType) => {
    const productTypeData = productTypes.find(pt => pt.productType === productType);
    return productTypeData ? productTypeData.unitPrice : 0;
  };

  const calculatePrice = (productType, quantity) => {
    const unitPrice = getProductTypePrice(productType);
    return unitPrice * quantity;
  };

  const enrichedLabelingData = labelingData.map(item => ({
    ...item,
    unitPrice: getProductTypePrice(item.productName),
    price: calculatePrice(item.productName, item.quantity),
  }));



  const handleFilter = (value) => {
    setFilters(value);
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = enrichedLabelingData.filter(item => {
    const searchTextLower = searchText.toLowerCase();
    return (
      item.productName.toLowerCase().includes(searchTextLower) ||
      item.status.toLowerCase().includes(searchTextLower) ||
      moment(item.labelingDate).format('YYYY-MM-DD').includes(searchTextLower) ||
      String(item.quantity).includes(searchTextLower) ||
      String(item.price).includes(searchTextLower)
    );
  }).filter(item => {
    return Object.keys(filters).length === 0 || filters.includes(item.status);
  });

  const handleSort = (sorter) => {
    setSorter(sorter);
  };

  const handleEditLabelingPrices = (id) => {
    navigate(`/products/editPrice/${id}`);
  };

  const handleEditLabeling = (id) => {
    navigate(`/products/editLabeling/${id}`);
  };

// Confirm delete using SweetAlert2
const confirmDelete = (labelingId) => {
  Swal.fire({
    title: "Are you sure you want to delete this label?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete(labelingId);
      Swal.fire({
        title: "Deleted!",
        text: "Your label has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
};

// Handle delete
const handleDelete = async (labelingId) => {
  try {
    await axios.delete(`http://localhost:5000/api/labeling/${labelingId}`);
    setLabelingData(prevData => prevData.filter(item => item._id !== labelingId)); // Refresh the labeling list
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `Failed to delete the label. ${error.response?.data?.message || 'Please try again.'}`,
      icon: "error",
    });
  }
};

  // const handleDeleteLabeling = async (id) => {
  //   setDeleteId(id);
  //   setIsDeleteModalVisible(true);
  // };

  // const confirmDelete = async () => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/labeling/${deleteId}`);
  //     setLabelingData(prevData => prevData.filter(item => item._id !== deleteId));
  //     message.success('Labeling record deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting labeling record:', error);
  //     message.error('Failed to delete labeling record');
  //   } finally {
  //     setIsDeleteModalVisible(false);
  //     setDeleteId(null);
  //   }
  // };

  const handleViewLabeling = (record) => {
    setSelectedLabeling(record);
    setIsViewModalVisible(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalVisible(false);
    setSelectedLabeling(null);
  };

  const getViewModalDetails = () => {
    if (!selectedLabeling) return {};

    const unitPrice = getProductTypePrice(selectedLabeling.productName);
    const totalPrice = calculatePrice(selectedLabeling.productName, selectedLabeling.quantity);

    return {
      unitPrice,
      totalPrice,
    };
  };

  const viewModalDetails = getViewModalDetails();

 // Function to get image data URL
  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Ensure cross-origin images are handled
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

  const generatePDF = async () => {
    const doc = new jsPDF();
  
    // Load the logo image
    const logoUrl = '../src/assets/logo.png'; 
    let logoDataURL;
    try {
      logoDataURL = await getImageDataURL(logoUrl);
    } catch (error) {
      console.error('Failed to load the logo image:', error);
    }
  
    // Function to draw header, footer, and horizontal line
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
  
      // Draw the footer with page number
      doc.setFontSize(10);
      doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 30, pageHeight - 10); // Adjust position as needed
    };
  
    // Add title after the logo
    doc.setFontSize(22);
    doc.text("Labeling Report", 80, 48); // Adjust x, y position as needed
  
    // First Table: Upper table details
    const upperTableHeaders = [['Detail', 'Value']];
    const upperTableRows = [
      ['Total Labeling Products', `${filteredData.length}`],
      ['Total Quantity', `${filteredData.reduce((sum, item) => sum + item.quantity, 0)}`],
      ['Total Price (Rs)', `Rs ${filteredData.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`],
    ];
  
    doc.autoTable({
      startY: 60,  // startY
      head: upperTableHeaders,
      body: upperTableRows,
      margin: { horizontal: 10 },
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: 'grid',
      didDrawPage: drawHeaderFooter, 
    });
  
    // startY for the second table to start below the first table
    let finalY = doc.lastAutoTable.finalY + 10;  // Add a gap between the two tables
  
    // Second Table: Map the filteredData for the labeling details
    const labelingRows = filteredData.map(item => [
      item.productName,
      moment(item.labelingDate).format('YYYY-MM-DD'),
      item.status,
      item.quantity,
      `Rs ${item.price.toFixed(2)}`,
    ]);
  
    // Define the table headers for the second table
    const labelingHeaders = [['Product Name', 'Labeling Date', 'Status', 'Quantity', 'Price (Rs)']];
  
    // Add second table to the PDF
    doc.autoTable({
      startY: finalY,  // Start this table right below the first table
      head: labelingHeaders,
      body: labelingRows,
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
      didDrawPage: drawHeaderFooter, // Add header, footer, and line to each page
    });
  
    // Adjust startY for the third table to start below the second table
    finalY = doc.lastAutoTable.finalY + 10;  // Add a gap between the second and third tables
  
    // Add heading for Unit Prices Table
    doc.setFontSize(14);
    doc.text("Unit Prices Table", 80, finalY); // Adjust x position as needed
    finalY += 10; // Add a little space after the heading
  
    // Third Table: Unit Prices Table details
    const unitPriceRows = filteredData.map(item => [
      item.productName,
      `Rs ${item.unitPrice.toFixed(2)}`
    ]);
  
    // Define the table headers for the third table
    const unitPriceHeaders = [['Product Name', 'Unit Price (Rs)']];
  
    // Add third table to the PDF
    doc.autoTable({
      startY: finalY,  // Start this table right below the heading
      head: unitPriceHeaders,
      body: unitPriceRows,
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
      didDrawPage: drawHeaderFooter, 
    });
  
    // Save the PDF
    doc.save('labeling_report.pdf');
  };

  // Prepare data for the bar graph
  const graphData = labelingData.map(item => ({
    name: item.productName, 
    value: item.quantity, 
  }));

  if (loading) return <LoadingDot />;

  return (
    <div style={{ padding: '24px' }}>
      <Button
        type="primary"
        icon={<ArrowLeftOutlined style={{ color: '#fff' }} />}
        onClick={() => navigate('/products/packaging-labeling')}
        style={{
          marginBottom: '16px',
          backgroundColor: '#000',
          borderColor: '#000',
          color: '#fff',
        }}
      >
        Back
      </Button>
      
      <Title level={3} style={{ marginBottom: '24px', fontWeight: 'bold' }}>
        Labeling Management
      </Title>

      <Title level={4} style={{ marginBottom: '24px', fontWeight: 'bold', color: '#1D6660' }}>
        Unit Prices Table
      </Title>

      <Table
        dataSource={productTypes}
        rowKey="_id"
        bordered
        style={{ marginBottom: '24px' }}
      >
        <Table.Column title="Product Type" dataIndex="productType" key="productType" />
        <Table.Column title="Unit Price (Rs)" dataIndex="unitPrice" key="unitPrice" render={price => `${price.toFixed(2)}`} />
        <Table.Column title="Type Unit" dataIndex="typeUnit" key="typeUnit" />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <div>
              <Button
              icon={<EditOutlined  />}
                onClick={() => handleEditLabelingPrices(record._id)}
                style={{ marginRight: 8, backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }}
              >
                
              </Button>
            </div>
          )}
        />
      </Table>

      <Title level={4} style={{ marginBottom: '24px', fontWeight: 'bold', color: '#1D6660' }}>
        Products Labeling Table
      </Title>
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <Space style={{ marginBottom: '16px' }}>

          <Search 
            placeholder="Search by product name"
            onChange={(e) => onSearch(e.target.value)} // Trigger search as user types
            style={{ width: 200, marginRight: 16 }} // Added marginRight for spacing
            allowClear
          />
          <Select
            placeholder="Filter by status"
            style={{ width: 200 }}
            onChange={handleFilter}
            mode="multiple"
            allowClear
          >
            <Option value="Pending">Pending</Option>
            <Option value="Completed">Completed</Option>
            
          </Select>
        </Space>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
      <Button
          type="default"
          icon={<FilePdfOutlined />}
          onClick={generatePDF}
          style={{
            backgroundColor: '#22c55e', // bg-green-500
            borderColor: '#22c55e',
          }}
          className="px-4 py-2 text-white rounded hover:bg-green-600 hover:border-green-600"
          // style={{ backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#000000' }}
        >
          Generate PDF
        </Button>
        
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/products/addLabeling')}
          style={{
            backgroundColor: '#22c55e', // bg-green-500
            borderColor: '#22c55e',
          }}
          className="px-4 py-2 text-white rounded hover:bg-green-600 hover:border-green-600"
          // style={{ backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#000000' }}
        >
          Add Label
        </Button>
        
      </div>
      </div>

      <Table
        dataSource={filteredData}
        rowKey="_id"
        bordered
        onChange={handleSort}
        pagination={{ pageSize: 8 }}
      >
        <Table.Column title="Product Name" dataIndex="productName" key="productName" />
        <Table.Column
          title="Labeling Date"
          dataIndex="labelingDate"
          key="labelingDate"
          render={date => moment(date).format('YYYY-MM-DD')}
          sorter={(a, b) => moment(a.labelingDate) - moment(b.labelingDate)}
          sortOrder={sorter.columnKey === 'labelingDate' ? sorter.order : undefined}
        />
        <Table.Column title="Status" dataIndex="status" key="status" />
        <Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
        <Table.Column
          title="Price (Rs)"
          dataIndex="price"
          key="price"
          render={price => `Rs ${price.toFixed(2)}`}
          sorter={(a, b) => a.price - b.price}
          sortOrder={sorter.columnKey === 'price' ? sorter.order : undefined}
        />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <div>
              <Button
                icon={<EyeOutlined />}
                onClick={() => handleViewLabeling(record)}
                style={{ marginRight: 8, backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff' }}
              >

              </Button>
              <Button
                icon={<EditOutlined  />}
                onClick={() => handleEditLabeling(record._id)}
                style={{ marginRight: 8, backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }}
              >

              </Button>
              <Button
                icon={<DeleteOutlined />}  // Use DeleteOutlined icon for delete button
                onClick={() => confirmDelete(record._id)}
                style={{ backgroundColor: '#f5222d', borderColor: '#f5222d', color: '#fff' }}
              />
            </div>
          )}
        />
      </Table>

    {/* View Details Modal */}
    <Modal
      title="Labeling Details"
      visible={isViewModalVisible}
      onCancel={handleViewModalClose}
      footer={[
        <Button
          key="close"
          onClick={handleViewModalClose}
          style={{ backgroundColor: '#1D6660', borderColor: '#1D6660', color: '#fff' }}
        >
          Close
        </Button>,
      ]}
      bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} // Center the content
    >
      {selectedLabeling && (
        <>
          <p><strong>Product Name:</strong> {selectedLabeling.productName}</p>
          <p><strong>Labeling Date:</strong> {moment(selectedLabeling.labelingDate).format('YYYY-MM-DD')}</p>
          <p><strong>Status:</strong> {selectedLabeling.status}</p>
          <p><strong>Quantity:</strong> {selectedLabeling.quantity}</p>
          <p><strong>Unit Price:</strong> Rs {viewModalDetails.unitPrice.toFixed(2)}</p>
          <p><strong>Total Price:</strong> Rs {viewModalDetails.totalPrice.toFixed(2)}</p>
        </>
      )}
    </Modal>

    {/* Bar Graph Section */}
    <div style={{ margin: '20px 0' }}>
        <Title level={4}>Labeling Quantity by Product Type</Title>
        <BarGraph data={graphData} />
      </div>


      {/* Delete Modal */}
      {/* <Modal
        title="Confirm Deletion"
        visible={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true, style: { backgroundColor: '#f5222d', borderColor: '#f5222d' } }}
        cancelButtonProps={{ style: { backgroundColor: '#1D6660', borderColor: '#1D6660', color: '#fff' } }}
      >
        <p>Are you sure you want to delete this labeling record?</p>
      </Modal> */}
    </div>
  );
};

export default Labeling;
