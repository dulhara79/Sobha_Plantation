import React from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const { Option } = Select;

const MaintenanceForm = () => {
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
              title: "Maintenance",
            },
            {
              href: "",
              title: "Add Maintenance Record",
            },
          ]}
        />

        <div className="flex justify-center mt-5">
          <div className="mt-5 bg-white p-6 shadow-md rounded-md w-[600px]">
            <h2 className="text-2xl font-bold mb-4">Add Maintenance Record</h2>
  
            <Form layout="vertical" onFinish={onFinish}>
             

              <Form.Item
                label="Machine/Equipment Name"
                name="machineName"
                rules={[
                  { required: true, message: "Please enter the machine / Equipment name" },
                ]}
              >
                <Input placeholder="Enter Machine / Equipment Name" />
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

              <Form.Item
                label="Date Referred To"
                name="referredDate"
                rules={[
                  {
                    required: true,
                    message: "Please select the referred date",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Date received "
                name="datereceived"
                rules={[
                  {
                    required: true,
                    message: "Please select the received date",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
               

               <Form.Item
                label="Location"
                name="location"
                rules={[
                  { required: true, message: "Please enter location" },
                ]}
              >
                <Input placeholder="Enter location" />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select the status" }]}
              >
                <Select placeholder="Select Status">
                  <Option value="Completed">Completed</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Scheduled">Scheduled</Option>

                  
                </Select>
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

export default MaintenanceForm;
