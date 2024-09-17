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
        <NavigationButtons />
        <div className="p-4 bg-gray-100">
          {/* Rectangle Icons */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="flex flex-col items-center justify-center h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/salesAndFinance/sales/addSalesRecord")}
            >
              <AddIcon fontSize="large" className="mb-8 mr-2 size-24" />
              <span className="text-xl font-semibold">Add Record</span>
            </div>
            <div
              className="flex flex-col items-center justify-center h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/salesAndFinance/sales/viewSalesRecord")}
            >
              <ListIcon fontSize="large" className="mb-8 mr-2 size-24" />
              <span className="text-xl font-semibold">View All Records</span>
            </div>
            <div
              className="flex flex-col items-center justify-center col-span-2 h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/salesAndFinance/sales/analytics")}
            >
              <AnalyticsIcon fontSize="large" className="mb-8 mr-2 size-24" />
              <span className="text-xl font-semibold">Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesDashboard;
