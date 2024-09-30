import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Card,
  DatePicker,
  Select,
  Input,
  Button,
  Popconfirm,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import moment from "moment";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// import NewLoadingScreen from '../../NewLoadingScreen';
import NewLoadingScreen from "../../../components/LoadingDots";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Option } = Select;

const SalesTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [revenueGenerated, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Filter states
  const [dateRange, setDateRange] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/salesAndFinance/sales/tracking"
        );
        const data = response.data.data;

        console.log("response: ", response);

        setTransactions(data);
        setFilteredData(data);
        calculateTotal(data);
      } catch (error) {
        setError("Error fetching transactions");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Setup WebSocket for real-time updates
    const socket = new WebSocket("ws://localhost:5000");
    socket.onmessage = (event) => {
      const updatedData = JSON.parse(event.data);
      setTransactions(updatedData);
      setFilteredData(updatedData);
      calculateTotal(updatedData);
    };

    return () => {
      socket.close();
    };
  }, []);

  let total = 0;
  const calculateTotal = (data) => {
    var totalIncome = data
        total += totalIncome;
    setTotalAmount(total);
  };

  const applyFilters = (data) => {
    let filtered = [...data];

    if (dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter(
        (transaction) =>
          moment(transaction.saleDate).isSameOrAfter(startDate, "day") &&
          moment(transaction.saleDate).isSameOrBefore(endDate, "day")
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(
        (transaction) => transaction.type === typeFilter
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((transaction) =>
        Object.values(transaction).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
    calculateTotal(filtered);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    applyFilters(transactions);
  };

  const handleTypeChange = (value) => {
    setTypeFilter(value);
    applyFilters(transactions);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    applyFilters(transactions);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      applyFilters(transactions);
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "sales Data.csv");
    link.click();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "sales Data.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("sales Data", 14, 16);

    autoTable(doc, {
      head: [
        [
          "Date",
          "Product",
          "Unit Price",
          "Quantity",
          "Revenue Generated"
        ],
      ],
      body: filteredData.map((tx) => [
        format(new Date(tx.saleDate), "yyyy-MM-dd"),
        tx.product,
        tx.unitPrice,
        tx.quantitySold,
        tx.revenueGenerated.toFixed(2),
      ]),
      foot: [["", "", "", "", "", "Balance:", revenueGenerated.toFixed(2)]],
    });

    doc.save("sales Data.pdf");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/salesAndFinance/sales/tracking/${id}`
      );
      const updatedData = filteredData.filter((item) => item._id !== id);
      setFilteredData(updatedData);
      setTransactions(updatedData);
      calculateTotal(updatedData);

      // Notify server of the deletion for real-time updates
      const socket = new WebSocket("ws://localhost:5000");
      socket.send(JSON.stringify({ action: "delete", id }));
      socket.close();
    } catch (error) {
      console.error("Error deleting transaction", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/salesAndFinance/sales/editSalesRecord/${id}`);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "saleDate",
      key: "saleDate",
      render: (text) => <>{format(new Date(text), "yyyy-MM-dd")}</>,
      sorter: (a, b) => new Date(a.saleDate) - new Date(b.saleDate),
    },
    {
      title: "Product Name",
      dataIndex: "product",
      key: "product",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (text) => <>{text.toFixed(2)}</>,
    },
    {
      title: "Sold Quantity",
      dataIndex: "quantitySold",
      key: "quantitySold",
    },
    {
      title: "Amount",
      dataIndex: "revenueGenerated",
      key: "revenueGenerated",
      render: (text) => <>{text.toFixed(2)}</>, // text.toFixed(2)
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-4">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined onClick={() => handleEdit(record._id)} />}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this transaction?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
          <Tooltip title={`Details: ${record.description} - ${record.amount}`}>
            <Button icon={<InfoCircleOutlined />} />
          </Tooltip>
        </div>
      ),
    },
  ];

  // Determine the balance color
//   const balanceColor = revenueGenerated > 0 ? "green" : "red";

  // if (loading) return <NewLoadingScreen />;
  // if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <Card>
        <div className="mb-4">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
            className="ml-4"
            style={{ width: 300 }}
          />
          <Button
            onClick={() => applyFilters(transactions)}
            type="primary"
            className="ml-4"
          >
            Apply Filters
          </Button>
          <Button onClick={exportToCSV} type="default" className="ml-4">
            Export to CSV
          </Button>
          <Button onClick={exportToExcel} type="default" className="ml-4">
            Export to Excel
          </Button>
          <Button onClick={exportToPDF} type="default" className="ml-4">
            Export to PDF
          </Button>
        </div>
        <Table columns={columns} dataSource={filteredData} rowKey="_id" />
        <div className="mt-4 text-5xl" >
          {/* <strong>Total Balance:</strong> {revenueGenerated.toFixed(2)} */}
        </div>
      </Card>
    </div>
  );
};

export default SalesTable;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   Card,
//   DatePicker,
//   Select,
//   Input,
//   Button,
//   Popconfirm,
//   Tooltip,
//   Modal,
//   Form,
// } from "antd";
// import {
//   DeleteOutlined,
//   EditOutlined,
//   InfoCircleOutlined,
// } from "@ant-design/icons";
// import { format } from "date-fns";
// import moment from "moment";
// import Papa from "papaparse";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import NewLoadingScreen from "../../../components/LoadingDots";
// import { useNavigate } from "react-router-dom";

// const { RangePicker } = DatePicker;
// const { Option } = Select;

// const SalesTable = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [revenueGenerated, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentTransaction, setCurrentTransaction] = useState(null); // For the transaction being edited

//   const [products, setProducts] = useState([]);
//   const [unitPrice, setUnitPrice] = useState(null);
//   const [unitType, setUnitType] = useState(null);
//   const [isDateDisabled, setDateDisabled] = useState(true);
//   const [isQuantityDisabled, setQuantityDisabled] = useState(true);
//   const [quantityError, setQuantityError] = useState("");
//   const [soldQuantity, setSoldQuantity] = useState("");
//   const [productToGetQuantity, setProductToGetQuantity] = useState("");
//   const [totalQuantity, setTotalQuantity] = useState("");
//   const [productError, setProductError] = useState("");
//   const [submitDisabled, setSubmitDisabled] = useState(true);
//   const [submitData, setSubmitData] = useState({
//     product: "",
//     saleDate: "",
//     quantitySold: "",
//     unitPrice: "",
//     revenueGenerated: "",
//   });

//   console.log("products: ", products);
//   console.log("productToGetQuantity: ", productToGetQuantity);
//   console.log("totalQuantity: ", totalQuantity);
//   console.log("unitPrice: ", unitPrice);
//   console.log("unitType: ", unitType);
//   console.log("submitData: ", submitData);
//   console.log("soldQuantity: ", soldQuantity);
//   console.log("quantityError: ", quantityError);

//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const handleSoldQuantityChange = (e) => {
//     const { value } = e.target;
//     const regex = /^[0-9\b]+$/;

//     if (!regex.test(value)) {
//       setQuantityError("Invalid quantity. Only numbers are allowed.");
//     } else {
//       setQuantityError("");
//     }

//     const filteredValue = value.replace(/[^0-9]/g, "");
//     setSoldQuantity(filteredValue);
//     form.setFieldsValue({ soldQuantity: filteredValue });

//     if (filteredValue > totalQuantity) {
//       setQuantityError("Sold quantity cannot exceed total quantity");
//       setSubmitDisabled(true);
//     } else if (filteredValue === "") {
//       setQuantityError("Please enter a valid quantity");
//       setSubmitDisabled(true);
//     } else {
//       setQuantityError("");
//       setSubmitDisabled(false);
//     }

//     // Calculate total amount
//     if (filteredValue > 0 && unitPrice > 0) {
//       const totalAmount = filteredValue * unitPrice;
//       form.setFieldsValue({ totalAmount });
//       setSubmitData({
//         ...submitData,
//         quantitySold: filteredValue,
//         revenueGenerated: totalAmount,
//       });
//     } else {
//       form.setFieldsValue({ totalAmount: 0 });
//     }
//   };

//   const handleDateChange = (date) => {
//     setSubmitData({ ...submitData, saleDate: date.format("YYYY-MM-DD") });
//     setQuantityDisabled(!date);
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/labeling-prices"
//         );
//         setProducts(response.data.data || []);
//       } catch (error) {
//         setProducts([]);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const fetchCompletedProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/labeling");
//         setProductToGetQuantity(response.data.data || []);
//       } catch (error) {
//         setProductToGetQuantity([]);
//       }
//     };

//     fetchCompletedProducts();
//   }, []);

//   const handleProductChange = (value) => {
//     const selectedProduct = products.find(
//       (product) => product.productType === value
//     );
//     const selectedProductQty = productToGetQuantity.find(
//       (product) =>
//         product.productName === value && product.status === "Completed"
//     );

//     if (selectedProduct && selectedProductQty) {
//       if (selectedProductQty.quantity === 0) {
//         setProductError("No quantity available for this product");
//         setSubmitDisabled(true);
//       } else {
//         setProductError("");
//       }

//       setUnitPrice(selectedProduct.unitPrice);
//       setUnitType(selectedProduct.typeUnit);
//       setTotalQuantity(selectedProductQty.quantity);
//       form.setFieldsValue({
//         unitType: selectedProduct.typeUnit,
//         unitPrice: selectedProduct.unitPrice,
//         productToGetQuantity: selectedProductQty.quantity,
//       });
//       setSubmitData({
//         product: selectedProduct.productType,
//         unitPrice: selectedProduct.unitPrice,
//       });
//       setDateDisabled(false);
//     } else {
//       setUnitPrice("");
//       setUnitType("");
//       setTotalQuantity("");
//       setDateDisabled(true);
//       setQuantityDisabled(true);
//       setSubmitDisabled(true);
//       setProductError("No quantity available for this product");
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/salesAndFinance/sales/tracking/`
//         );
//         const data = response.data.data;

//         setTransactions(data);
//         setFilteredData(data);
//         calculateTotal(data);
//       } catch (error) {
//         setError("Error fetching transactions");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const calculateTotal = (data) => {
//     const totalIncome = data.reduce(
//       (sum, item) => sum + item.revenueGenerated,
//       0
//     );
//     setTotalAmount(totalIncome);
//   };

//   const handleEdit = (record) => {
//     setCurrentTransaction(record);

//     // Ensure quantitySold is correctly populated in the form
//     form.setFieldsValue({
//       saleDate: moment(record.saleDate),
//       product: record.product,
//       unitPrice: record.unitPrice,
//       quantitySold: record.quantitySold, // Ensure this is set here
//       revenueGenerated: record.revenueGenerated,
//     });

//     setSoldQuantity(record.quantitySold); // Also set the state for soldQuantity if needed

//     setIsModalVisible(true);
//   };

//   const handleUpdateTransaction = async () => {
//     try {
//       const values = form.getFieldsValue();
//       const updatedTransaction = {
//         ...currentTransaction,
//         saleDate: values.saleDate.toISOString(),
//         product: values.product,
//         unitPrice: values.unitPrice,
//         quantitySold: values.quantitySold,
//         revenueGenerated: values.revenueGenerated,
//       };

//       await axios.put(
//         `http://localhost:5000/api/salesAndFinance/sales/tracking/${currentTransaction._id}`,
//         updatedTransaction
//       );

//       const updatedData = transactions.map((item) =>
//         item._id === currentTransaction._id ? updatedTransaction : item
//       );
//       setTransactions(updatedData);
//       setFilteredData(updatedData);
//       setIsModalVisible(false);
//       calculateTotal(updatedData);
//     } catch (error) {
//       console.error("Error updating transaction", error);
//     }
//   };

//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "saleDate",
//       key: "saleDate",
//       render: (text) => <>{format(new Date(text), "yyyy-MM-dd")}</>,
//       sorter: (a, b) => new Date(a.saleDate) - new Date(b.saleDate),
//     },
//     {
//       title: "Product Name",
//       dataIndex: "product",
//       key: "product",
//       sorter: (a, b) => a.type.localeCompare(b.type),
//     },
//     {
//       title: "Unit Price",
//       dataIndex: "unitPrice",
//       key: "unitPrice",
//       render: (text) => <>{text.toFixed(2)}</>,
//     },
//     {
//       title: "Sold Quantity",
//       dataIndex: "quantitySold",
//       key: "quantitySold",
//     },
//     {
//       title: "Amount",
//       dataIndex: "revenueGenerated",
//       key: "revenueGenerated",
//       render: (text) => <>{text.toFixed(2)}</>,
//       sorter: (a, b) => a.revenueGenerated - b.revenueGenerated,
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (text, record) => (
//         <div className="flex space-x-4">
//           <Tooltip title="Edit">
//             <Button
//               icon={<EditOutlined onClick={() => handleEdit(record)} />}
//             />
//           </Tooltip>
//           <Popconfirm
//             title="Are you sure to delete this transaction?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button icon={<DeleteOutlined />} danger />
//           </Popconfirm>
//           <Tooltip
//             title={`Details: ${record.description} - ${record.revenueGenerated}`}
//           >
//             <Button icon={<InfoCircleOutlined />} />
//           </Tooltip>
//         </div>
//       ),
//     },
//   ];

//   console.log("form: ", form);

//   return (
//     <div className="p-4">
//       <Card>
//         <Table columns={columns} dataSource={filteredData} rowKey="_id" />
//       </Card>

//       <Modal
//         title="Edit Transaction"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         onOk={handleUpdateTransaction}
//       >
//         <Form form={form} layout="vertical" initialValues={currentTransaction}>
//           {/* Sale Date Field */}
//           <Form.Item
//             name="saleDate"
//             label="Sale Date"
//             rules={[
//               {
//                 required: true,
//                 message: "Please select the sale date",
//               },
//             ]}
//           >
//             <DatePicker
//               format="YYYY-MM-DD"
//               disabledDate={
//                 (current) => current && current > moment().endOf("day") // Block future dates
//               }
//             />
//           </Form.Item>

//           {/* Product Name Dropdown */}
//           <Form.Item
//             name="product"
//             label="Product Name"
//             rules={[
//               {
//                 required: true,
//                 message: "Please select a product",
//               },
//             ]}
//           >
//             <Select
//               placeholder="Select a product"
//               onChange={handleProductChange} // Update unit price and other fields dynamically
//             >
//               {/* Display the current selected product and other options */}
//               {products.map((product) => (
//                 <Select.Option key={product._id} value={product.productType}>
//                   {product.productType}
//                 </Select.Option>
//               ))}
//             </Select>
//             {productError && (
//               <span style={{ color: "red" }}>{productError}</span>
//             )}
//           </Form.Item>

//           {/* Unit Price Field */}
//           <Form.Item
//             name="unitPrice"
//             label="Unit Price"
//             rules={[
//               {
//                 required: true,
//                 message: "Unit price is required",
//               },
//             ]}
//           >
//             <Input type="number" readOnly value={unitPrice} />{" "}
//             {/* Unit price should be dynamic */}
//           </Form.Item>

//           {/* Quantity Sold Field */}
//           <Form.Item
//             name="quantitySold"
//             label="Quantity Sold"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter the sold quantity",
//               },
//               {
//                 pattern: new RegExp(/^[0-9]+$/),
//                 message: "Only numeric values are allowed",
//               },
//             ]}
//           >
//             <Input
//               value={soldQuantity}
//               onChange={handleSoldQuantityChange} // Calculate revenue when quantity changes
//             />
//             {quantityError && (
//               <span style={{ color: "red" }}>{quantityError}</span>
//             )}
//           </Form.Item>

//           {/* Revenue Generated Field (calculated automatically) */}
//           <Form.Item name="revenueGenerated" label="Revenue Generated">
//             <Input type="number" readOnly value={submitData.revenueGenerated} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default SalesTable;
