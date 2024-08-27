import React from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const { Option } = Select;

 // Function to disable past dates
// Function to disable past dates
const disablePastDates = (current) => {
  return current && current < moment().startOf('day');
};
const FertilizerForm = () => {
  const navigate = useNavigate();

  // Handle form submission
  const onFinish = (values) => {
    console.log("Form values: ", values);
    // Handle form submission logic here
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div className={`ml-[300px]`}>
        <Breadcrumb
          items={[
            {
              href: "",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: "Inventory",
            },
            {
              href: "",
              title: "Fertilizer",
            },
            {
              href: "",
              title: "Add Fertilizer",
            },
          ]}
        />

        <div className="flex justify-center mt-5">
          <div className="mt-5 bg-white p-6 shadow-md rounded-md w-[600px]">
            <h2 className="text-2xl font-bold mb-4">Add Fertilizer Details</h2>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select the date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>


              <Form.Item
                 label="Type"
                 name="type"
                rules={[{ required: true, message: "Please select a type" }]}
              >
  <Select placeholder="Select Type">
    <Option value="Coconut">Coconut</Option>
    <Option value="Papaya">Papaya</Option>
    <Option value="Pepper">Pepper</Option>
    <Option value="Pineapple">Pineapple</Option>
    <Option value="Banana">Banana</Option>
    {/* Add more varieties as needed */}
  </Select>
</Form.Item>

              <Form.Item
  label="Quantity"
  name="quantity"
  rules={[
    { required: true, message: "Please enter quantity" },
    {
      validator: (_, value) => {
        if (value <= 0) {
          return Promise.reject(new Error('Quantity must be greater than 0!'));
        }
        return Promise.resolve();
       }
     }
     ]}
    >
       <Input
          type="number"
          placeholder="Enter Quantity"
          min={0}
          step={1}
        />
       </Form.Item>

             <Form.Item
                 label="storagelocation"
                 name="storagelocation"
                rules={[{ required: true, message: "Please select a Storage Location" }]}
              >
                <Select placeholder="Select Storage Location">
                  <Option value="Warehouse 1">Warehouse 1</Option>
                  <Option value="Warehouse 2">Warehouse 2</Option>
                  <Option value="Warehouse 3">Warehouse 3</Option>
                  
                  {/* Add more Storage Locations as needed */}
                </Select>
              </Form.Item>
             

              <Form.Item
                label="expiredate"
                name="expiredate"
                rules={[{ required: true, message: "Please select the expire date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button
                  type="default"
                  htmlType="button"
                  className="ml-2"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerForm;
