import React from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const { Option } = Select;

const ScheduleForm = () => {
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
              title: "Field View",
            },
            {
              href: "",
              title: "Crop Varieties",
            },
            {
              href: "",
              title: "Add Schedule",
            },
          ]}
        />

        <div className="flex justify-center mt-5">
          <div className="mt-5 bg-white p-6 shadow-md rounded-md w-[600px]">
            <h2 className="text-2xl font-bold mb-4">Schedule</h2>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select the date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Assigned Team"
                name="team"
                rules={[
                  { required: true, message: "Please enter the assigned team" },
                ]}
              >
                <Input placeholder="Enter Assigned Team" />
              </Form.Item>

              <Form.Item
                label="Field Name"
                name="fieldName"
                rules={[
                  { required: true, message: "Please enter the field name" },
                ]}
              >
                <Input placeholder="Enter Field Name" />
              </Form.Item>

              <Form.Item
                label="Varieties"
                name="varieties"
                rules={[
                  { required: true, message: "Please enter the variety name" },
                ]}
              >
                <Input placeholder="Enter Variety" />
              </Form.Item>

              <Form.Item
                label="Date Comparison"
                name="dateComparison"
                rules={[
                  { required: true, message: "Please enter date comparison" },
                ]}
              >
                <Input placeholder="Enter Date Comparison" />
              </Form.Item>

              <Form.Item
                label="Scheduled Date"
                name="scheduledDate"
                rules={[
                  {
                    required: true,
                    message: "Please select the scheduled date",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
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

              <Form.Item
                label="Seeds Used"
                name="seedsUsed"
                rules={[
                  { required: true, message: "Please enter seeds used" },
                ]}
              >
                <Input placeholder="Enter Seeds Used" />
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

export default ScheduleForm;
