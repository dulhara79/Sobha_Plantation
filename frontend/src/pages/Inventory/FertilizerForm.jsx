import React from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const { Option } = Select;

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


              <Form.Item label="TYpe" name="TYpe">
                <Select placeholder="Select TYpe">
                  <Option value="Dwarf Coconut">Coconut</Option>
                  <Option value="Tall Coconut">Papaya</Option>
                  <Option value="Hybrid Coconut">Pepper</Option>
                  <Option value="King Coconut">Pineapple</Option>
                  <Option value="King Coconut">Bananna</Option>
                  {/* Add more varieties as needed */}
                </Select>
              </Form.Item>

              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  { required: true, message: "Please enter quantity" },
                ]}
              >
                <Input placeholder="Enter Quantity" />
              </Form.Item>

              <Form.Item label="Storage Location" name="storagelocation">
                <Select placeholder="Select Storage Location">
                  <Option value="Warehouse 1">Warehouse 1</Option>
                  <Option value="Warehouse 2">Warehouse 2</Option>
                  <Option value="Warehouse 3">Warehouse 3</Option>
                  
                  {/* Add more fields as needed */}
                </Select>
              </Form.Item>
              <Form.Item
            label="Expire Date"
            name="expireDate"
            rules={[{ required: true, message: 'Please select the expire date!' }]}
          >
            <DatePicker
              name="expireDate"
              format="YYYY-MM-DD"
              // disabledDate={disablePastDates}
            />
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
