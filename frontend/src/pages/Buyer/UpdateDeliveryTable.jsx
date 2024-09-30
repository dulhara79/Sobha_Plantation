
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Form, notification } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useParams
import axios from "axios";

const UpdateBuyerDeliveryRecords = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL parameters

  const [loading, setLoading] = useState(false);

  // Validation rules
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
      message: "Only numbers are allowed.",
    },
    {
      required: true,
      message: "This field is required.",
    },
  ];

  // Fetch the record data from the backend
  useEffect(() => { 
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8090/api/deliveryRecords/${id}`);
        const data = response.data.BuyerDeliveryRecord
        console.log("response.data: " + response.data.deliveryRecord);
        console.log(response.data.BuyerDeliveryRecord);
        
        
        // Set form values with the fetched data
        form.setFieldsValue({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          address: data.address || "",
          city: data.city || "",
          country: data.country || "",
          postalCode: data.postalCode || "",
          phone: data.phone || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
        setLoading(false);
        notification.error({
          message: "Error",
          description: "Could not fetch the record data.",
        });
      }
    };

    fetchData();
  }, [id, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Make a PUT request to update the record
      await axios.put(`http://localhost:8090/api/deliveryRecords/${id}`, values);

      notification.success({
        message: "Record Updated",
        description: "Record has been updated successfully",
      });

      form.resetFields();
      navigate("/Bdeliverytable");
      setLoading(false);
    } catch (error) {
      console.error("An error occurred: ", error);
      setLoading(false);
      notification.error({
        message: "Error",
        description: "An error occurred while updating the record",
      });
    }
  };

  const handleCancel = () => {
    navigate("/Bdeliverytable");
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
                  title: "Update Record",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">
              Update Buyer Delivery Record
            </h1>

            <Form
              form={form}
              layout="vertical"
              className="mt-6"
              onFinish={handleSubmit}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={alphabeticRule}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={alphabeticRule}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={alphabeticRule}
              >
                <Input placeholder="Enter address" />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={alphabeticNumericRule}
              >
                <Input placeholder="Enter your city" />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                rules={alphabeticNumericRule}
              >
                <Input placeholder="Enter your country" />
              </Form.Item>

              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={numericRule}
              >
                <Input placeholder="Enter your postal code" />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={numericRule}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              <div className="flex justify-center mt-4 space-x-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
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

export default UpdateBuyerDeliveryRecords;


// import React, { useState, useEffect } from "react";
// import Header from "../../components/Header";
// import Sidebar from "../../components/Sidebar";
// import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
// import { Breadcrumb, Button, Input, DatePicker, Form, notification, Select } from "antd";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import moment from "moment";
// import axios from "axios";

// const { Option } = Select;

// const UpdateBuyerDeliveryRecords = () => {
//   const [form] = Form.useForm();
//   // const [dateOfDelivery, setDateOfDelivery] = useState(null);
//   // const [suggestedReDeliveryDate, setSuggestedReDeliveryDate] = useState(null);
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get ID from URL parameters

//   // // Disable future dates
//   // const disableFutureDates = (current) => current && current > moment().endOf("day");

//   // // Disable past dates
//   // const disablePastDates = (current) => current && current < moment().startOf("day");

//   // Fetch record by ID
//   useEffect(() => {
//     const fetchRecord = async () => {
//       try {
//         const response = await axios.get('http://localhost:8090/api/deliveryRecords/${id}');
//         const data = response.data.deliveryRecord;

//         // Set form values including DatePicker values
//         form.setFieldsValue({
//           firstName: data.firstName || "",
//           lastName: data.lastName || "",
//           email: data.email || "",
//           address: data.address || "",
//           city: data.city || "",
//           country: data.country || "",
//           postalCode: data.postalCode || "",
//           phone: data.phone || "",
          
//         });

//       //   // Update state with DatePicker values
//       //   setDateOfInspection(data.dateOfInspection ? moment(data.dateOfInspection) : null);
//       //   setSuggestedReInspectionDate(data.suggestedReInspectionDate ? moment(data.suggestedReInspectionDate) : null);
//       } catch (error) {
//         notification.error({
//           message: "Fetch Error",
//           description: error.response?.data?.message || "Error fetching record data.",
//         });
//       }
    
//     };

//     fetchRecord();
//   }, [id, form]);

//   // Handle form submission
//   const handleSubmit = async (values) => {
//     try {
//       const payload = {
//         ...values,
//         // dateOfInspection: dateOfInspection ? dateOfInspection.toISOString() : null,
//         // suggestedReInspectionDate: suggestedReInspectionDate ? suggestedReInspectionDate.toISOString() : null,
//       };

//       await axios.put('http://localhost:8090/api/deliveryRecords/${id}, payload');

//       notification.success({
//         message: "Record updated successfully",
//         description: "Record has been updated successfully",
//       });

//       navigate("/BuyerDeliveryTable");
//     } catch (error) {
//       notification.error({
//         message: "Update Error",
//         description: "An error occurred while updating the record.",
//       });
//     }
//   };

//   // Cancel button handler
//   const handleCancel = () => {
//     navigate("/BuyerDeliveryTable");
//   };

//   return (
//     <div>
//       <Header />
//       <div className="flex h-screen">
//         <Sidebar />
//         <div className="flex-1 ml-[300px] p-4 overflow-auto">
//           <nav className="flex items-center justify-between p-4 bg-transparent">
//             <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-800">
//               <LeftOutlined className="text-xl" />
//             </button>
//             <div className="flex space-x-4">
//               <Link to="/diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">Home</Link>
//               <Link to="/CoconutInspections" className="text-[#3CCD65] hover:text-[#2b8f57]">Inspections</Link>
//               <Link to="/CoconutTreatments" className="text-[#236A64] font-semibold">Treatments</Link>
//               <Link to="/pests-diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">Pests and Diseases</Link>
//               <Link to="/maintenance" className="text-[#3CCD65] hover:text-[#2b8f57]">Maintenance</Link>
//               <Link to="/UserProfile" className="text-[#3CCD65] hover:text-[#2b8f57]">My Profile</Link>
//             </div>
//           </nav>

//           <div className="mt-4">
//             <Breadcrumb items={[{ href: "", title: <HomeOutlined /> }, { href: "", title: "Update current Delivery Record" }]} />
//           </div>

//           <div className="p-6 mt-4 bg-white rounded-md shadow-md">
//             <h1 className="text-2xl font-bold text-center">Delivery Information </h1>

//             <Form form={form} layout="vertical" className="mt-6" onFinish={handleSubmit}>
//               <Form.Item
//                 label="First Name"
//                 name="firstName"
//                 rules={[{ required: true, message: "First Name" }]}
//               >
             
//               </Form.Item>

//               <Form.Item
//                 label="Section of Land"
//                 name="sectionOfLand"
//                 rules={[{ required: true, message: "This field is required." }]}
//               >
                
//               </Form.Item>

//               <Form.Item
//                 label="Identified Pest" //////me widiyata karanna
//                 name="identifiedPest"
//                 rules={[
//                   { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
//                   { required: true, message: "This field is required." }
//                 ]}
//               >
//                 <Input placeholder="Enter identified pest" />
//               </Form.Item>



//               <Form.Item
//                 label="Identified Disease"
//                 name="identifiedDisease"
//                 rules={[
//                   { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
//                   { required: true, message: "This field is required." }
//                 ]}
//               >
//                 <Input placeholder="Enter identified disease" />
//               </Form.Item>

//               <Form.Item
//                 label="Inspected By"
//                 name="inspectedBy"
//                 rules={[
//                   { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
//                   { required: true, message: "This field is required." }
//                 ]}
//               >
//                 <Input placeholder="Enter name of inspector" />
//               </Form.Item>

//               <Form.Item
//                 label="Inspection Result"
//                 name="inspectionResult"
//                 rules={[
//                   { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
//                   { required: true, message: "This field is required." }
//                 ]}
//               >
//                 <Input placeholder="Enter the inspection result" />
//               </Form.Item>

              

//               <div className="flex justify-center mt-4 space-x-4">
//                 <Button type="primary" htmlType="submit" style={{ backgroundColor: "#236A64", color: "#fff" }}>Submit</Button>
//                 <Button type="default" htmlType="button" onClick={handleCancel}>Cancel</Button>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateBuyerDeliveryRecords;