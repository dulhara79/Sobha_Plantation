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
      pattern: /^[a-zA-Z0-9\s%]*$/,
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

    // Alphabetic characters only (A-Z, a-z, space)
const handleAlphabeticKeyPress = (e) => {
  const regex = /^[A-Za-z\s]*$/;
  if (!regex.test(e.key)) {
    e.preventDefault(); // Prevent non-alphabetic characters
    setErrorMessage("Only alphabetic characters are allowed."); // Set error message
  } else {
    setErrorMessage(""); // Clear message when valid input is entered
  }
};

// Numeric characters only (0-9)
const handleNumericKeyPress = (e) => {
  const regex = /^[0-9]*$/;
  if (!regex.test(e.key)) {
    e.preventDefault(); // Prevent non-numeric characters
    setErrorMessage("Only numeric characters are allowed.");
  } else {
    setErrorMessage(""); // Clear message when valid input is entered
  }
};

// Alphanumeric characters only (A-Z, a-z, 0-9)
const handleAlphanumericKeyPress = (e) => {
  const regex = /^[A-Za-z0-9\s%]*$/;
  if (!regex.test(e.key)) {
    e.preventDefault(); // Prevent non-alphanumeric characters
    setErrorMessage("Only alphanumeric characters are allowed.");
  } else {
    setErrorMessage(""); // Clear message when valid input is entered
  }
};


  const handleFinish = async (values) => {
    try {
      // Get the existing treatments from localStorage
      const existingTreatments = JSON.parse(localStorage.getItem("bestTreatments")) || [];
  
      // Add the new treatment data
      const updatedTreatments = [...existingTreatments, values];
  
      // Save the updated data in localStorage
      localStorage.setItem("bestTreatments", JSON.stringify(updatedTreatments));
  
      // Optionally, navigate to the insights page
      navigate("/insights", { state: values });
    } catch (error) {
      console.error("Error saving treatment data:", error);
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
                  onKeyPress={handleNumericKeyPress}
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
                  onKeyPress={handleAlphabeticKeyPress}
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
                  onKeyPress={handleAlphanumericKeyPress}
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
                  onKeyPress={handleNumericKeyPress}
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
                  onKeyPress={handleNumericKeyPress}
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
