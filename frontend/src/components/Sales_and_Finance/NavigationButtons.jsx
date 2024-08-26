import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const NavigationButtons = ({ activePage }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-6 space-x-2">
      <Button
        type="primary"
        className="bg-black rounded-full hover:bg-[#39cc63]"
        onClick={() => navigate(-1)}
        icon={<LeftOutlined />}
      />
      <Button
        type="primary"
        className={`rounded-full px-4 py-1 ${activePage === "home" ? "bg-[#1D6660]" : "bg-green-500 hover:bg-[#39cc63]"}`}
        onClick={() => navigate("/salesAndFinance/")}
      >
        Home
      </Button>
      <Button
        type="primary"
        className={`rounded-full px-4 py-1 ${activePage === "sales" ? "bg-[#1D6660]" : "bg-green-500"} hover:bg-[#39cc63]`}
        onClick={() => navigate("/salesAndFinance/sales/")}
      >
        Sales
      </Button>
      <Button
        type="primary"
        className={`rounded-full px-4 py-1 ${activePage === "finance" ? "bg-[#1D6660]" : "bg-green-500 hover:bg-[#39cc63]"}`}
        onClick={() => navigate("/salesAndFinance/finance/")}
      >
        Finance
      </Button>
    </div>
  );
};

export default NavigationButtons;
