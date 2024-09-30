import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, DatePicker, Select, Form, notification, Divider, Typography, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, QrcodeOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { QRCodeCanvas } from 'qrcode.react';
import PackagingInstructions from '../../components/Products/PackagingInstructions';
import PackageOverviewChart from '../../components/Products/PackageOverviewChart';
import moment from 'moment'; // Ensure moment is imported for date formatting

const { Option } = Select;
const { Title } = Typography;

const Packaging = () => {
  const [packagingData, setPackagingData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');

  useEffect(() => {
    setPerformanceMetrics({
      totalPackages: 150,
      completedPackages: 100,
      pendingPackages: 50,
    });

    setPackagingData([
      { _id: '1', productName: 'Coconut Oil', quantity: 100, packagingDate: '2024-08-01', status: 'Completed', packagingMaterial: 'Plastic', packagingType: 'Bottle' },
      { _id: '2', productName: 'Coconut Milk', quantity: 50, packagingDate: '2024-08-02', status: 'Completed', packagingMaterial: 'Carton', packagingType: 'Box' },
    ]);
  }, []);

  const showModal = (record = null) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  const handleFormSubmit = (values) => {
    if (currentRecord) {
      notification.success({ message: 'Packaging schedule updated successfully!' });
    } else {
      notification.success({ message: 'Packaging schedule added successfully!' });
    }
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = (recordId) => {
    notification.success({ message: 'Packaging schedule deleted successfully!' });
  };

  const showQrModal = (record) => {
    setQrCodeData(`Product: ${record.productName}, Quantity: ${record.quantity}, Date: ${record.packagingDate}`);
    setQrModalVisible(true);
  };

  const handleQrModalCancel = () => {
    setQrModalVisible(false);
    setQrCodeData('');
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Packaging Management Section */}
      <Title level={3} style={{ marginBottom: '24px', fontWeight: 'bold', color: '#1D6660' }}>Packaging Management</Title>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <PackageOverviewChart data={performanceMetrics} />
      </div>

      {/* Packaging Schedule Table */}
      <Divider style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold', color: '#1D6660' }}>
        Packaging Schedule
      </Divider>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: '24px', backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#000000' }}
      >
        Add Packaging
      </Button>
      <Table
        dataSource={packagingData}
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
                type="link"
                icon={<EditOutlined />}
                onClick={() => showModal(record)}
              >
                Edit
              </Button>
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </Button>
              <Button
                type="link"
                icon={<QrcodeOutlined />}
                onClick={() => showQrModal(record)}
              >
                QR Code
              </Button>
            </Space>
          )}
        />
      </Table>

      {/* Packaging Instructions Section */}
      <PackagingInstructions />
  
      {/* QR Code Modal */}
      <Modal
        title="QR Code"
        visible={qrModalVisible}
        onCancel={handleQrModalCancel}
        footer={null}
      >
        <QRCodeCanvas
          value={qrCodeData || ''}
          size={256}
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          includeMargin
        />
      </Modal>
  
      {/* Add/Edit Packaging Modal */}
      <Modal
        title={currentRecord ? 'Edit Packaging' : 'Add Packaging'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleFormSubmit} initialValues={currentRecord}>
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please input the quantity!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="packagingDate"
            label="Packaging Date"
            rules={[{ required: true, message: 'Please select the packaging date!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select>
              <Option value="Pending">Pending</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="packagingMaterial"
            label="Packaging Material"
            rules={[{ required: true, message: 'Please input the packaging material!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="packagingType"
            label="Packaging Type"
            rules={[{ required: true, message: 'Please input the packaging type!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentRecord ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Packaging;
