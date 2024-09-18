import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, DatePicker, Form, Select, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
const { Option } = Select;

const AddCropsDiseases = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [fieldValidity, setFieldValidity] = useState({
    dateOfInspection: false,
    sectionOfLand: false,
    identifiedPest: false,
    identifiedDisease: false,
    inspectedBy: false,
    inspectionResult: false,
    suggestedReInspectionDate: false,
  });

  const handleFieldChange = (changedFields) => {
    const updatedFieldValidity = { ...fieldValidity };
    Object.keys(changedFields).forEach((field) => {
      updatedFieldValidity[field] = !!changedFields[field];
    });
    setFieldValidity(updatedFieldValidity);
  }; 

  const disableFutureDates = (current) => {
    return current && current > moment().endOf("day");
  };

  const disablePastDates = (current) => {
    return current && current < moment().startOf("day");
  };

  const alphabeticNumericRule = [
    {
      pattern: /^[a-zA-Z0-9\s]*$/,
      message: "Only alphabetic characters and numbers are allowed.",
    },
    {
      required: true,
      message: "This field is required.",
    },
  ];

  const alphabeticRule = [
    {
      pattern: /^[a-zA-Z\s]*$/,
      message: "Only alphabetic characters are allowed.",
    },
    {
      required: true,
      message: "This field is required.",
    },
  ];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      //Extract values from form
      const { dateOfInspection, sectionOfLand, identifiedPest, identifiedDisease, inspectedBy, inspectionResult, suggestedReInspectionDate } = values;

      await axios.post("http://localhost:8090/api/cropDiseases", {
        dateOfInspection,
        sectionOfLand,
        identifiedPest,
        identifiedDisease,
        inspectedBy,
        inspectionResult,
        suggestedReInspectionDate
      }); 

      //Handle success, reset loading or form fields if necessary
      notification.success({
        message: "Record created successfully",
        description: "Record has been added successfully"
      });
      setLoading(false);
      form.resetFields();

            //Navigate to the list of records
            navigate("/IntercropInspections");
          } catch (error) {
            console.error("An error occurred: ", error);
            setLoading(false);
            notification.error({
              message: "An error occurred",
              description: "An error occurred while creating the record"
            });
          }
         };
        
        const handleCancel = () => {
          navigate("/IntercropInspections");
        };
      
  return (
    <div>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-[300px] p-4 overflow-auto">
          <nav className="flex items-center justify-between p-4 bg-transparent">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              <LeftOutlined className="text-xl" />
            </button>
            <div className="flex space-x-4">
              <Link
                to="/diseases"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Home
              </Link>
              <Link
                to="/CoconutInspections"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Inspections
              </Link>
              <Link
                to="/CoconutTreatments"
                className="text-[#236A64] font-semibold"
              >
                Treatments
              </Link>
              <Link
                to="/pests-diseases"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Pests and Diseases
              </Link>
              <Link
                to="/maintenance"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Maintenance
              </Link>
              <Link
                to="/UserProfile"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                My Profile
              </Link>
            </div>
          </nav>

          <div className="mt-4">
            <Breadcrumb
              items={[
                {
                  href: "",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: "Add New Record for Other Crop Diseases",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">
              Pest / Disease Records - Inter Crops
            </h1>

            <Form
              form={form}
              layout="vertical"
              className="mt-6"
              onFinish={handleSubmit}
              onValuesChange={(_, values) => handleFieldChange(values)}
            >
              <Form.Item
                label="Date of Inspection"
                name="dateOfInspection"
                rules={[
                  {
                    required: true,
                    message: "Please select a date of inspection.",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={disableFutureDates}
                  onChange={(date, dateString) => {
                    if (date && date > moment()) {
                      form.setFields([
                        {
                          name: "dateOfInspection",
                          errors: [
                            "Please select a date that is not in the future.",
                          ],
                        },
                      ]);
                    }
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Section of Land"
                name="sectionOfLand"
                rules={[
                  {
                    required: true,
                    message: "Please select the section of land.",
                  }
                ]}
              >
                <Select placeholder="Select section of land" disabled={!fieldValidity.dateOfInspection}>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Identified Pest"
                name="identifiedPest"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter identified pest"
                  disabled={!fieldValidity.sectionOfLand}
                />
              </Form.Item>

              <Form.Item
                label="Identified Disease"
                name="identifiedDisease"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter identified disease"
                  disabled={!fieldValidity.identifiedPest}
                />
              </Form.Item>

              <Form.Item
                label="Inspected By"
                name="inspectedBy"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter name of inspector"
                  disabled={!fieldValidity.identifiedDisease}
                />
              </Form.Item>

              <Form.Item
                label="Inspection Result"
                name="inspectionResult"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter the inspection result"
                  disabled={!fieldValidity.inspectedBy}
                />
              </Form.Item>

              <Form.Item
                label="Suggested Re-Inspection Date"
                name="suggestedReInspectionDate"
                rules={[
                  {
                    required: true,
                    message: "Please select a re-inspection date.",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={disablePastDates}
                  disabled={!fieldValidity.inspectionResult}
                />
              </Form.Item>

              <div className="flex justify-center mt-4 space-x-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ backgroundColor: "#236A64", color: "#fff" }}
                  disabled={!fieldValidity.suggestedReInspectionDate}
                >
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

export default AddCropsDiseases;
