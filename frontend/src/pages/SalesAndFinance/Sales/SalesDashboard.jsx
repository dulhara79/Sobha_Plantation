import React from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

const SalesDashboard = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <Header />
      <Sidebar activePage="/salesAndFinance/"/>
      <div className={`ml-[300px] pt-3`}>
      <Breadcrumb
      style={{ margin: "10px 0" }}
          items={[
            {
              href: "/dashboard",
              title: <HomeOutlined />,
            },
            {
              href: "/salesAndFinance/sales/",
              title: (
                <>
                  <UserOutlined />
                  <span>Sales and Finance</span>
                </>
              ),
            },
            { 
              title: "Sales Dahsboard",
            },
          ]}
        />
        <div className="p-4 bg-gray-100">
        <NavigationButtons activePage="sales" />
          {/* Rectangle Icons */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="flex items-center justify-center h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/salesAndFinance/sales/addSalesRecord")}
            >
              <AddIcon fontSize="large" className="mr-2" />
              <span className="text-xl font-semibold">Add Record</span>
            </div>
            <div
              className="flex items-center justify-center h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/view-records")}
            >
              <ListIcon fontSize="large" className="mr-2" />
              <span className="text-xl font-semibold">View All Records</span>
            </div>
            <div
              className="flex items-center justify-center col-span-2 h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/analytics")}
            >
              <AnalyticsIcon fontSize="large" className="mr-2" />
              <span className="text-xl font-semibold">Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesDashboard;
