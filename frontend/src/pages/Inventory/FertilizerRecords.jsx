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

const FertilizerRecords = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [filteredFertilizers, setFilteredFertilizers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const navigate = useNavigate();

  const generatePDF = () => {
    // Your PDF generation logic here
    console.log("PDF generated!");
  };

  useEffect(() => {
    fetchFertilizers();
  }, []);

  const fetchFertilizers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fertilizers');
      setFertilizers(response.data.data);
      setFilteredFertilizers(response.data.data);
    } catch (error) {
      console.error('Error fetching fertilizer records:', error);
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
    navigate("/Inventory/maintenance");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/Inventory/Order");
  }, [navigate]);

  const onSearch = (value) => {
    setSearchText(value);
    filterFertilizers(value, filterStatus);
  };

  const filterFertilizers = (searchText, filterStatus) => {
    let filteredData = fertilizers;
  
    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((fertilizer) => 
        Object.values(fertilizer).some((value) => 
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }
  
    if (filterStatus !== "All") {
      filteredData = filteredData.filter((fertilizer) => fertilizer.status === filterStatus);
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
  
    setFilteredFertilizers(filteredData);
  };

  
  const handleSort = (field, order) => {
    setSorter({ field, order });
    filterFertilizers(searchText, filterStatus);
  };

  const cancelSorting = () => {
    setSorter({ field: null, order: null });
    filterFertilizers(searchText, filterStatus);
  };

  const handleUpdate = (id) => {
    navigate(`/Inventory/EditFertilizerRecords/${id}`);
  };
  
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this schedule?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/fertilizers/${id}`);
      if(response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'fertilizers record deleted successfully!',
        });
        // Update local state to remove the deleted record
        setFilteredFertilizers(filteredFertilizers.filter(record => record._id !== id));
      } else {
        notification.error({
          message: 'Error',
          description: 'There was an error deleting the fertilizers record.',
        });
      }
    } catch (error) {
      console.error('Error deleting fertilizer:', error.response?.data?.message || error.message);
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'There was an error deleting the fertilizer record.',
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
                  Fertilizer Record
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#40857e] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick1}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Maintenance
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick2}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Order
                </a>
              </div>
            </div>
          </nav>

          <Breadcrumb
            items={[
              { title: 'Home', href: '/' },
              { title: 'fertilizers', href: '/Inventory/FertilizerRecords' }
            ]}
          />
          {/* Welcome Message Component */}
          <div className="flex flex-row items-center justify-between shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-[98%] mb-5">
            <b className="text-3xl">Welcome Maheesha</b>
          </div>

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
                  title: "Added Date",
                  dataIndex: "addeddate",
                  key: "addeddate",
                  sorter: true,
                  sortOrder: sorter.field === 'addeddate' ? sorter.order : null,
                  render: (text) => moment(text).format("YYYY-MM-DD"),
                },
                {
                  title: "Fertilizer Type",
                  dataIndex: "fertilizertype",
                  key: "fertilizertype",
                  sorter: true,
                  sortOrder: sorter.field === 'fertilizertype' ? sorter.order : null,
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                  sorter: true,
                  sortOrder: sorter.field === 'quantity' ? sorter.order : null,
                },
             
                {
                  title: "Storage Location",
                  dataIndex: "storagelocation",
                  key: "storagelocation",
                  sorter: true,
                  sortOrder: sorter.field === 'storagelocation' ? sorter.order : null,
                },
                {
                  title: "Expired Date",
                  dataIndex: "expireddate",
                  key: "expireddate",
                  sorter: true,
                  sortOrder: sorter.field === 'expireddate' ? sorter.order : null,
                  render: (text) => moment(text).format("YYYY-MM-DD"),
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
              dataSource={filteredFertilizers}
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

export default FertilizerRecords;