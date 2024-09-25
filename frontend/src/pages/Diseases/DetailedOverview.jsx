import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, DatePicker, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

const DetailedOverview = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fieldValidity, setFieldValidity] = useState({
    completionDateOfTreatment: false,
    treatedPestOrDisease: false,
    treatmentMethodUsed: false,
    percentageReductionInSymptoms: false,
    improvementInPlantHealth: false,
  });

  const [successRate, setSuccessRate] = useState(null);

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

  const numericRule = [
    {
      pattern: /^[0-9]*$/,
      message: "Only numeric characters are allowed.",
    },
    {
      required: true,
      message: "This field is required.",
    },
  ];

  const handleFinish = async (values) => {
    try {
      await post("/harvest", values);

      // Navigate to Insights with the form data
      navigate("/insights", { state: values });
    } catch (error) {
      console.error("Error creating detailed overview:", error);
    }
  };

  const handleCancel = () => {
    navigate("/CoconutTreatments");
  };

  const handleFieldChange = (changedFields, allFields) => {
    const newFieldValidity = { ...fieldValidity };

    allFields.forEach((field) => {
      if (field.errors.length === 0 && field.value) {
        newFieldValidity[field.name[0]] = true;
      } else {
        newFieldValidity[field.name[0]] = false;
      }
    });

    setFieldValidity(newFieldValidity);
  };

  const calculateSuccessRate = () => {
    const values = form.getFieldsValue();
    const percentageReduction = parseFloat(values.percentageReductionInSymptoms) || 0;
    const improvementInHealth = parseFloat(values.improvementInPlantHealth) || 0;

    const rate = (percentageReduction + improvementInHealth) / 2;
    setSuccessRate(rate);
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
                  href: "/diseases",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: "Detailed Overview of Coconut Treatments",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">
              Detailed Overview of the Treatment
            </h1>

            <Form
              form={form}
              layout="vertical"
              className="mt-6"
              onFinish={handleFinish}
              onFieldsChange={handleFieldChange}
            >
              <Form.Item
                label="Treatment Completion Date"
                name="completionDateOfTreatment"
                rules={[
                  {
                    required: true,
                    message: "Please select the completion date of treatment.",
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
                          name: "dateOfTreatment",
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
                label="Treated Pest or Disease"
                name="treatedPestOrDisease"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter the pest or disease treated"
                  disabled={!fieldValidity.completionDateOfTreatment}
                />
              </Form.Item>

              <Form.Item
                label="Treatment Method Used"
                name="treatmentMethodUsed"
                rules={alphabeticNumericRule}
              >
                <Input
                  placeholder="Enter the treatment method"
                  disabled={!fieldValidity.treatedPestOrDisease}
                />
              </Form.Item>

              <Form.Item
                label="Percentage reduction in disease symptoms"
                name="percentageReductionInSymptoms"
                rules={numericRule}
              >
                <Input
                  placeholder="Enter the percentage reduction in disease symptoms"
                  disabled={!fieldValidity.treatmentMethodUsed}
                />
              </Form.Item>

              <Form.Item
                label="Improvement in plant health"
                name="improvementInPlantHealth"
                rules={numericRule}
              >
                <Input
                  placeholder="Enter the percentage improvement in plant health"
                  disabled={!fieldValidity.percentageReductionInSymptoms}
                />
              </Form.Item>

              <div className="flex justify-center">
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={calculateSuccessRate}
                  style={{ backgroundColor: "#236A64", color: "#fff" }}
                >
                  Calculate Success Rate
                </Button>
              </div>

              {successRate !== null && (
                <div className="mt-4 text-xl font-bold text-center">
                  Success Rate: {successRate.toFixed(2)}%
                </div>
              )}

              <div className="flex justify-center mt-4 space-x-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#236A64", color: "#fff" }}

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

export default DetailedOverview;
