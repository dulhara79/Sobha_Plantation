import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import ValuationForm from '../../../components/Sales_and_Finance/Finance/ValuationForm';
import { message, Breadcrumb} from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const AddNewValuationPage = () => {
    const [loading, setLoading] = useState(false);
    const [autoSaveTransaction, setAutoSaveTransaction] = useState(true);
    const navigate = useNavigate();

    const handleSaveValuationRecord = async (data) => {
        if (!data.date || !data.type || !data.subtype || !data.quantity || !data.price || !data.description || !data.payerPayee || !data.appreciationOrDepreciation) {
            message.warning('Please fill in all fields. The record will not be saved with incomplete data');
            return;
        }

        if (isNaN(data.quantity) || data.quantity <= 0 || isNaN(data.price) || data.price <= 0) {
            message.warning('Quantity and price must be positive numbers.');
            return;
        }

        if (new Date(data.date) > new Date()) {
            message.warning('Please select a valid date. Future dates are not allowed.');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('/api/valuations', data);
            if (response.status === 200) {
                message.success('Valuation saved successfully!');
                navigate('/finance/valuation-records');
            }
        } catch (error) {
            message.error('Failed to save the valuation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SnackbarProvider maxSnack={3}>
          <Header />
                <Sidebar />
            <div className={`flex flex-row ml-[300px] pt-3`}>
                <div className="w-full">
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
          },{
            href: "/salesAndFinance/sales/",
            title: (
              <>
                <span>Sales</span>
              </>
            ),
          },
          { 
            title: "Sales Dahsboard",
          },
        ]}
      />
                    <div className="w-10/12 mt-10 ml-40">
                        <h1 className="my-4 text-3xl font-bold text-gray-800">Add New Valuation Record</h1>
                        <ValuationForm onSubmit={handleSaveValuationRecord} autoSaveTransaction={autoSaveTransaction} />
                    </div>
                </div>
            </div>
        </SnackbarProvider>
    );
};

export default AddNewValuationPage;
