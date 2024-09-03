import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, message, Modal } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const Labeling = () => {
  const [labelingData, setLabelingData] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedLabeling, setSelectedLabeling] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product types from backend
    const fetchProductTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/labeling-prices');
        setProductTypes(response.data.data || []);
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

  // Function to get product type unit price
  const getProductTypePrice = (productType) => {
    const productTypeData = productTypes.find(pt => pt.productType === productType);
    return productTypeData ? productTypeData.unitPrice : 0;
  };

  // Calculate price based on unit price and quantity
  const calculatePrice = (productType, quantity) => {
    const unitPrice = getProductTypePrice(productType);
    return unitPrice * quantity;
  };

  // Prepare Labeling Data with Calculated Prices
  const enrichedLabelingData = labelingData.map(item => ({
    ...item,
    unitPrice: getProductTypePrice(item.productName),
    price: calculatePrice(item.productName, item.quantity),
  }));

  // Function to handle sorting
  const handleSort = (field, order) => {
    console.log(`Sorting by ${field} in ${order} order`);
  };

  // Function to handle edit action for Labeling
  const handleEditLabeling = (id) => {
    navigate(`/products/editLabeling/${id}`, { state: { refreshData: true } });
  };

  // Function to handle delete action for Labeling
  const handleDeleteLabeling = (id) => {
    console.log(`Delete Labeling record with id ${id}`);
    // Implement your delete logic
  };

  // Function to handle view details
  const handleViewLabeling = (record) => {
    setSelectedLabeling(record);
    setIsViewModalVisible(true);
  };

  // Function to close view details modal
  const handleViewModalClose = () => {
    setIsViewModalVisible(false);
    setSelectedLabeling(null);
  };

  // Calculate details for the view modal
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

  useEffect(() => {
    const refreshData = async () => {
      if (window.history.state?.refreshData) {
        // Fetch updated labeling data
        try {
          const response = await axios.get('http://localhost:5000/api/labeling');
          setLabelingData(response.data.data || []);
        } catch (error) {
          console.error('Error fetching labeling data:', error);
          message.error('Failed to fetch updated labeling data');
        }
      }
    };

    refreshData();
  }, [window.history.state?.refreshData]);

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
                onClick={() => handleEditUnitPrice(record._id)}
                style={{ marginRight: 8, backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }}
              >
                Edit
              </Button>
            </div>
          )}
        />
      </Table>

      <Title level={4} style={{ marginBottom: '24px', fontWeight: 'bold', color: '#1D6660' }}>
        Products Labeling Table
      </Title>
      <Button
        type="primary"
        onClick={() => navigate('/products/addLabeling')} // Navigate to the AddLabeling page
        style={{ marginBottom: '24px', backgroundColor: '#1D6660', borderColor: '#1D6660', color: '#fff' }}
      >
        Add Label
      </Button>
      <Table
        dataSource={enrichedLabelingData}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        onChange={(pagination, filters, sorter) => handleSort(sorter.field, sorter.order)}
        bordered
      >
        <Table.Column title="Product Name" dataIndex="productName" key="productName" />
        <Table.Column title="Labeling Date" dataIndex="labelingDate" key="labelingDate" render={date => moment(date).format('YYYY-MM-DD')} />
        <Table.Column title="Status" dataIndex="status" key="status" />
        <Table.Column title="Total Quantity" dataIndex="quantity" key="quantity" />
        <Table.Column title="Price (Rs)" dataIndex="price" key="price" render={price => `Rs ${price.toFixed(2)}`} />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <div>
              <Button
                onClick={() => handleViewLabeling(record)}
                style={{ marginRight: 8, backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }}
              >
                View
              </Button>
              <Button
                onClick={() => handleEditLabeling(record._id)}
                style={{ marginRight: 8, backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteLabeling(record._id)}
                type="danger"
                style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: '#fff' }}
              >
                Delete
              </Button>
            </div>
          )}
        />
      </Table>

      {/* View Details Modal */}
      <Modal
        title="Labeling Details"
        visible={isViewModalVisible}
        onCancel={handleViewModalClose}
        footer={null}
        width={600}
      >
        {selectedLabeling && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p><strong>Product Name:</strong> {selectedLabeling.productName}</p>
            <p><strong>Labeling Date:</strong> {moment(selectedLabeling.labelingDate).format('YYYY-MM-DD')}</p>
            <p><strong>Status:</strong> {selectedLabeling.status}</p>
            <p><strong>Total Quantity:</strong> {selectedLabeling.quantity}</p>
            <p><strong>Unit Price (Rs):</strong> {viewModalDetails.unitPrice.toFixed(2)}</p>
            <p><strong>Total Price (Rs):</strong> {viewModalDetails.totalPrice.toFixed(2)}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Labeling;
