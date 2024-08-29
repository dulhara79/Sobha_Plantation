import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, DatePicker, Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const AddCoconutDiseases = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Disable future dates for Date of Inspection
  const disableFutureDates = (current) => {
    return current && current > moment().endOf('day');
  };

  // Disable past dates for Suggested Re-Inspection Date
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Validation rules
  const alphabeticNumericRule = [
    {
      pattern: /^[a-zA-Z0-9\s]*$/,
      message: 'Only alphabetic characters and numbers are allowed.',
    },
    {
      required: true,
      message: 'This field is required.',
    },
  ];

  const alphabeticRule = [
    {
      pattern: /^[a-zA-Z\s]*$/,
      message: 'Only alphabetic characters are allowed.',
    },
    {
      required: true,
      message: 'This field is required.',
    },
  ];

  const handleFinish = (values) => {
    console.log('Form values:', values);
    // Handle form submission logic here
    navigate('/CoconutInspections'); // Navigate to CoconutInspections after form submission
  };

  const handleCancel = () => {
    navigate('/CoconutInspections'); // Navigate to CoconutInspections on cancel
  };

  return (
    <div>
      <Header />
      <div className='flex h-screen'>
        <Sidebar />
        <div className="flex-1 ml-[300px] p-4 overflow-auto">
          {/* Navigation Bar */}
          <nav className="flex items-center justify-between p-4 bg-transparent">
            {/* Go Back Icon */}
            <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-800">
              <LeftOutlined className="text-xl" />
            </button>
            {/* Navigation Items */}
            <div className="flex space-x-4">
              <Link to="/diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">
                Home
              </Link>
              <Link to="/CoconutInspections" className="text-[#3CCD65] hover:text-[#2b8f57]">
                Inspections
              </Link>
              <Link to="/CoconutTreatments" className="text-[#236A64] font-semibold">
                Treatments
              </Link>
              <Link to="/pests-diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">
                Pests and Diseases
              </Link>
              <Link to="/maintenance" className="text-[#3CCD65] hover:text-[#2b8f57]">
                Maintenance
              </Link>
              <Link to="/UserProfile" className="text-[#3CCD65] hover:text-[#2b8f57]">
            My Profile
          </Link>
            </div>
          </nav>

          {/* Corrected Breadcrumb div */}
          <div className="mt-4">
            <Breadcrumb
              items={[
                {
                  href: '',
                  title: <HomeOutlined />,
                },
                {
                  href: '',
                  title: 'Add New Record for Coconut Diseases',
                },
              ]}
            />
          </div>

          {/* Body Section */}
          <div className="mt-4 p-6 bg-white shadow-md rounded-md">
            {/* Topic */}
            <h1 className="text-2xl font-bold text-center">Pest / Disease Records - Coconuts</h1>

            {/* Form Section */}
            <Form
              form={form}
              layout="vertical"
              className="mt-6"
              onFinish={handleFinish}
            >
              {/* Identified Pest */}
              <Form.Item
                label="Identified Pest"
                name="identifiedPest"
                rules={alphabeticNumericRule}
              >
                <Input placeholder="Enter identified pest" />
              </Form.Item>

              {/* Identified Disease */}
              <Form.Item
                label="Identified Disease"
                name="identifiedDisease"
                rules={alphabeticNumericRule}
              >
                <Input placeholder="Enter identified disease" />
              </Form.Item>

              {/* Date of Inspection */}
              <Form.Item
                label="Date of Inspection"
                name="dateOfInspection"
                rules={[
                  {
                    required: true,
                    message: 'Please select a date of inspection.',
                  },
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  disabledDate={disableFutureDates}
                  onChange={(date, dateString) => {
                    if (date && date > moment()) {
                      form.setFields([
                        {
                          name: 'dateOfInspection',
                          errors: ['Please select a date that is not in the future.'],
                        },
                      ]);
                    }
                  }}
                />
              </Form.Item>

              {/* Section of Land */}
              <Form.Item
                label="Section of Land"
                name="sectionOfLand"
                rules={alphabeticRule}
              >
                <Input placeholder="Enter section of land" />
              </Form.Item>

              {/* Inspected By */}
              <Form.Item
                label="Inspected By"
                name="inspectedBy"
                rules={alphabeticRule}
              >
                <Input placeholder="Enter name of inspector" />
              </Form.Item>

              {/* Suggested Re-Inspection Date */}
              <Form.Item
                label="Suggested Re-Inspection Date"
                name="suggestedReInspectionDate"
                rules={[
                  {
                    required: true,
                    message: 'Please select a suggested re-inspection date.',
                  },
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  disabledDate={disablePastDates}
                />
              </Form.Item>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-4">
                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#236A64', color: '#fff' }}>
                  Submit
                </Button>
                <Button type="default" htmlType="button" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCoconutDiseases;
