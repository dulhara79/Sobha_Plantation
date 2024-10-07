import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from "axios";
import { message, DatePicker, Select, Input, Button, Radio, Typography } from "antd";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

function EditValuationForm() {
  const [date, setDate] = useState(null);
  const [type, setType] = useState("");
  const [subtype, setSubType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [payerPayee, setPayerPayee] = useState("");
  const [appreciationOrDepreciation, setAppreciationOrDepreciation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  // Fetch data for the form fields based on ID
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/salesAndFinance/finance/valuation/${id}`)
      .then((response) => {
        const data = response.data;
        setDate(data.date ? moment(data.date) : null);
        setType(data.type);
        setSubType(data.subtype);
        setQuantity(data.quantity);
        setPrice(data.price);
        setDescription(data.description);
        setPayerPayee(data.payer_payee);
        setAppreciationOrDepreciation(data.appreciationOrDepreciation);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  // Validation and submission handler for editing the valuation record
  const handleEditValuationRecord = async (e) => {
    e.preventDefault();
    // Additional validation for positive values
    if (isNaN(quantity) || quantity <= 0 || isNaN(price) || price <= 0) {
      message.warning("Quantity and price must be positive numbers.");
      return;
    }
    if (!date || !type || !subtype || !quantity || !price || !description || !payerPayee || !appreciationOrDepreciation) {
      message.warning("Please fill in all fields. The record will not be saved with incomplete data.");
      return;
    }
    
    const data = {
      date,
      type,
      subtype,
      quantity,
      price,
      description,
      payer_payee: payerPayee,
      appreciationOrDepreciation,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/salesAndFinance/finance/valuation/${id}`, data)
      .then(() => {
        setLoading(false);
        message.success("Valuation record has successfully updated.");
        navigate("/salesAndFinance/finance/valuation-dashboard");
      })
      .catch((error) => {
        setLoading(false);
        message.error("Valuation record updating failed.");
        console.log(error);
        // navigate("/finances/valuation");
      });
  };

  // Validation for each input field
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9 ]/g, "");
    if (filteredValue !== "" && filteredValue <= 100000) {
      setQuantity(filteredValue);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9 ]/g, "");
    if (filteredValue !== "" && filteredValue <= 10000000) {
      setPrice(filteredValue);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9 ]/g, "");
    if (filteredValue.length <= 100) {
      setDescription(filteredValue);
    }
  };

  const handlePayerPayeeChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z ]/g, "");
    if (filteredValue.length <= 100) {
      setPayerPayee(filteredValue);
    }
  };

  const handleAppreciationOrDepreciationChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9 ]/g, "");
    if (filteredValue !== "" && filteredValue <= 100) {
      setAppreciationOrDepreciation(filteredValue);
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setSubType("Loans");
  };

  return (
    <SnackbarProvider>
      <form className="flex flex-col items-center justify-center py-6" onSubmit={handleEditValuationRecord}>
        <div className="w-full max-w-3xl px-4 py-8 space-y-6 bg-white rounded-lg shadow-lg">
          <Title level={2}>Edit Valuation Record</Title>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
            <fieldset className="sm:col-span-4">
              <legend className="text-sm font-semibold text-gray-900">Valuation Type</legend>
              <div className="flex items-center mt-4 space-x-6">
                <Radio.Group onChange={handleTypeChange} value={type}>
                  <Radio value="asset">Asset</Radio>
                  <Radio value="liability">Liability</Radio>
                </Radio.Group>
              </div>
            </fieldset>

            <div className="sm:col-span-2">
              <label htmlFor="subtype" className="block text-sm font-medium text-gray-900">Sub Type</label>
              <Select
                id="subtype"
                value={subtype}
                onChange={setSubType}
                className="w-full mt-2"
                style={{ fontSize: '1rem' }}
              >
                {type === "asset" ? (
                  <>
                    <Option value="Land">Land</Option>
                    <Option value="Machinery">Machinery</Option>
                    <Option value="Crops">Crops</Option>
                    <Option value="Infrastructure">Infrastructure</Option>
                    <Option value="Utilities">Utilities</Option>
                    <Option value="Water">Water</Option>
                  </>
                ) : (
                  <>
                    <Option value="Loan">Loan</Option>
                    <Option value="Debts">Debts</Option>
                    <Option value="Leases">Leases</Option>
                    <Option value="Taxes">Taxes</Option>
                  </>
                )}
              </Select>
            </div>

            {/* Date */}
            <div className="sm:col-span-3">
              <label htmlFor="date" className="block text-sm font-medium text-gray-900">Date</label>
              <DatePicker
                value={date}
                onChange={(date) => setDate(date)}
                className="w-full mt-2"
                disabledDate={(current) => current && current > moment().endOf('day')}
                style={{ fontSize: '1rem' }}
              />
            </div>

            {/* Quantity */}
            <div className="sm:col-span-3">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-900">Quantity</label>
              <Input
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                type="number"
                style={{ fontSize: '1rem' }}
              />
            </div>

            {/* Price */}
            <div className="sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-900">Price</label>
              <Input
                id="price"
                name="price"
                value={price}
                onChange={handlePriceChange}
                type="number"
                style={{ fontSize: '1rem' }}
              />
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
              <TextArea
                id="description"
                name="description"
                rows={3}
                value={description}
                onChange={handleDescriptionChange}
                style={{ fontSize: '1rem' }}
              />
            </div>

            {/* Payer/Payee */}
            <div className="col-span-full">
              <label htmlFor="payer_payee" className="block text-sm font-medium text-gray-900">Payer/Payee</label>
              <Input
                type="text"
                name="payer_payee"
                value={payerPayee}
                onChange={handlePayerPayeeChange}
                id="payer_payee"
                style={{ fontSize: '1rem' }}
              />
            </div>

            {/* Percentage */}
            <div className="sm:col-span-2">
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-900">Appreciation / Depreciation %</label>
              <Input
                id="appreciationOrDepreciation"
                name="appreciationOrDepreciation"
                value={appreciationOrDepreciation}
                onChange={handleAppreciationOrDepreciationChange}
                type="number"
                style={{ fontSize: '1rem' }}
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-full">
              <Button type="primary" loading={loading} htmlType="submit" className="w-full py-3">
                Save Valuation Record
              </Button>
            </div>
          </div>
        </div>
      </form>
    </SnackbarProvider>
  );
}

export default EditValuationForm;
