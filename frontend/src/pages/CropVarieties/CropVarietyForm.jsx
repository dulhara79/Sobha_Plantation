import React from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb,Button, Input, Form,Select, DatePicker } from 'antd';
import {LeftCircleOutlined} from "@ant-design/icons"
import moment from 'moment';

const { Option } = Select;

const CropVarietyForm = () => {
    const navigate = useNavigate();

    const validateAssignedPerson = (_, value) => {
        // Regex to only allow letters (no numbers or special characters)
        if (!value || /^[A-Za-z\s]+$/.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Assigned Person cannot include numbers or special characters.'));
      };


      // Function to disable dates that are not today's date
      const disabledDate = (current) => {
        // Only allow the current date
        return current && current.format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD');
      };


  return (
    <div>
      
      <Header/>
      <Sidebar/>

      <div className={`ml-[300px] `}>
      <Breadcrumb
    items={[
      {
        href: '',
        title: <HomeOutlined />,
      },
      {
        href: '',
        title: 'Field View',
      },
      {
        href: '',
        title: 'Dashboard',
      },
      {
        href: '',
        title: 'Crop Varieties',
      },
      {
        href: '',
        title: 'Add New Activity',
      },
    ]}
  />
  {/* Back Button */}
  <div className="mb-4">
          {/* <Button onClick={() => navigate(-1)} className="bg-gray-300 text-black"> */}
          <LeftCircleOutlined onClick={() => navigate(-1)}/>
          {/* </Button> */}
        </div>


        <div className="flex justify-center mt-5">
          <div className="mt-5 bg-white p-6 shadow-md rounded-md w-[600px] ">
            <h2 className="text-2xl font-bold mb-4">Plantation Form</h2>

            <Form layout="vertical">
              {/* Assigned Person with Validation */}
              <Form.Item
                label="Assigned Person"
                name="assignedPerson"
                rules={[{ validator: validateAssignedPerson }]}
              >
                <Input placeholder="Enter Assigned Person" />
              </Form.Item>

              <Form.Item label="Field Name" name="fieldName">
                <Select placeholder="Select Field Name">
                  <Option value="Field A">Field A</Option>
                  <Option value="Field B">Field B</Option>
                  <Option value="Field C">Field C</Option>
                  <Option value="Field D">Field D</Option>
                  {/* Add more fields as needed */}
                </Select>
              </Form.Item>

              {/* Updated Variety Field as Dropdown */}
              <Form.Item label="Variety" name="variety">
                <Select placeholder="Select Variety">
                  <Option value="Dwarf Coconut">Coconut</Option>
                  <Option value="Tall Coconut">Papaya</Option>
                  <Option value="Hybrid Coconut">Pepper</Option>
                  <Option value="King Coconut">Pineapple</Option>
                  <Option value="King Coconut">Bananna</Option>
                  {/* Add more varieties as needed */}
                </Select>
              </Form.Item>

              <Form.Item label="Date" name="date">
                <DatePicker
                  disabledDate={disabledDate}
                  defaultValue={moment()}
                  format="YYYY-MM-DD"
                />
              </Form.Item>

              {/* Updated Status as Dropdown */}
              <Form.Item label="Status" name="status">
                <Select placeholder="Select Status">
                  <Option value="Scheduled">Scheduled</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="Delayed">Delayed</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button type="default" htmlType="button" className="ml-2">
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
    </div>
    </div>

  )
}

export default CropVarietyForm
