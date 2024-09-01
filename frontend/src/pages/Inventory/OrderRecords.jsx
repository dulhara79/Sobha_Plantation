import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Table, Button, Input, Modal, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const { Search } = Input;

const OrderRecords = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const navigate = useNavigate();

  const generatePDF = () => {
    // Your PDF generation logic here
    console.log("PDF generated!");
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data.data);
      setFilteredOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const onHomeClick = useCallback(() => {
    navigate("/Inventory/InventoryDashboard");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/Inventory/FertilizerRecords");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/Inventory/MaintenanceRecords");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/Inventory/EquipmentRecords");
  }, [navigate]);

  const onGroupContainerClick3 = useCallback(() => {
    navigate("/Inventory/OrderRecords");
  }, [navigate]);

  const onSearch = (value) => {
    setSearchText(value);
    filterOrders(value, filterStatus);
  };

  const filterOrders = (searchText, filterStatus) => {
    let filteredData = orders;
  
    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((order) => 
        Object.values(order).some((value) => 
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }
  
    if (filterStatus !== "All") {
      filteredData = filteredData.filter((order) => order.status === filterStatus);
    }
  
    if (sorter.field) {
      filteredData = [...filteredData].sort((a, b) => {
        if (sorter.order === 'ascend') {
          return a[sorter.field] > b[sorter.field] ? 1 : -1;
        } else {
          return a[sorter.field] < b[sorter.field] ? 1 : -1;
        }
      });
    }
  
    setFilteredOrders(filteredData);
  };

  
  const handleSort = (field, order) => {
    setSorter({ field, order });
    filterOrders(searchText, filterStatus);
  };

  const cancelSorting = () => {
    setSorter({ field: null, order: null });
    filterOrders(searchText, filterStatus);
  };

  const handleUpdate = (id) => {
    navigate(`/Inventory/EditOrderRecords/${id}`);
  };
  
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/orders/${id}`);
      if(response.status === 200) {
        notification.success({
          message: 'Success',
          description: ' record deleted successfully!',
        });
        // Update local state to remove the deleted record
        setFilteredOrders(filteredOrders.filter(record => record._id !== id));
      } else {
        notification.error({
          message: 'Error',
          description: 'There was an error deleting the record.',
        });
      }
    } catch (error) {
      console.error('Error deleting record:', error.response?.data?.message || error.message);
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'There was an error deleting the  record.',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[300px] pt-3 flex-1">
          <nav className="p-4 mb-5">
            {/* Navigation Buttons */}
            <div className="container flex items-center justify-between mx-auto space-x-4">
              <div
                className="flex items-center justify-center pt-px px-2 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform bg-gray-200 rounded-41xl hover:bg-gray-300"
                onClick={onBackClick}
              >
                <ArrowBack className="text-gray-700" />
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onHomeClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Home
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Fertilizers & Agrochemicals
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick1}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Maintenance Records
                </a>
              </div>
              <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick2}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Equipments & Machines
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#40857e] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick3}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Order Details
              </a>
            </div>
            </div>
          </nav>

          <Breadcrumb
            items={[
              { title: 'Home', href: '/' },
              { title: 'orders', href: '/Inventory/OrderRecords' }
            ]}
          />
          {/* Welcome Message Component 
          <div className="flex flex-row items-center justify-between shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-[98%] mb-5">
            <b className="text-3xl">Welcome Maheesha</b>
          </div> */}

          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Search
                  placeholder="Search by any field"
                  onChange={(e) => onSearch(e.target.value)}  // Trigger filter on input change
                  style={{ width: 200 }}
                  value={searchText}  // Keep the input controlled
                />
                <Button 
                  style={{ backgroundColor: "#60DB19", color: "#fff" }} 
                  onClick={() => navigate("/Inventory/AddFertilizerRecord")}
                >
                  Add Records
                </Button>
                <Button 
                  style={{ backgroundColor: "#60DB19", color: "#fff" }} 
                  onClick={generatePDF}
                >
                  Generate PDF Report
                </Button>
              </div>
            </div>
            <Table
              columns={[
                {
                  title: "Order Date",
                  dataIndex: "orderdate",
                  key: "orderdate",
                  sorter: true,
                  sortOrder: sorter.field === 'orderdate' ? sorter.order : null,
                  render: (text) => moment(text).format("YYYY-MM-DD"),
                },
                {
                  title: "Order Type",
                  dataIndex: "ordertype",
                  key: "ordertype",
                  sorter: true,
                  sortOrder: sorter.field === 'ordertype' ? sorter.order : null,
                },
                {
                    title: "Item Name",
                    dataIndex: "itemname",
                    key: "itemname",
                    sorter: true,
                    sortOrder: sorter.field === 'itemname' ? sorter.order : null,
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                  sorter: true,
                  sortOrder: sorter.field === 'quantity' ? sorter.order : null,
                },
                {
                  title: "Unit",
                  dataIndex: "unit",
                  key: "unit",
                  sorter: true,
                  sortOrder: sorter.field === 'unit' ? sorter.order : null,
                },
                {
                  title: "Referred Location",
                  dataIndex: "referredlocation",
                  key: "referredlocation",
                  sorter: true,
                  sortOrder: sorter.field === 'referredlocation' ? sorter.order : null,
                },
                {
                  title: "Received Date",
                  dataIndex: "receiveddate",
                  key: "receiveddate",
                  sorter: true,
                  sortOrder: sorter.field === 'receiveddate' ? sorter.order : null,
                  render: (text) => moment(text).format("YYYY-MM-DD"),
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",
                  sorter: true,
                  sortOrder: sorter.field === 'status' ? sorter.order : null,
                },
                {
                  title: "Actions",
                  key: "actions",
                  render: (text, record) => (
                    <span>
                      <Button type="link" onClick={() => handleUpdate(record._id)}>
                        Edit
                      </Button>
                      <Button type="link" danger onClick={() => confirmDelete(record._id)}>
                        Delete
                      </Button>
                    </span>
                  ),
                },
              ]}
              dataSource={filteredOrders}
              rowKey="_id"
              pagination={false}  // Disable pagination
              scroll={{ y: 400 }} // Optional: Add vertical scroll if there are many rows
              onChange={(pagination, filters, sorter) => {
                if (sorter && sorter.order) {
                  handleSort(sorter.field, sorter.order);
                } else {
                  cancelSorting();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderRecords;