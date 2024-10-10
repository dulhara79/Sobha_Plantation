import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, message, Card } from 'antd';
import moment from 'moment';

const EditSalaryRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Salary Record by ID
  useEffect(() => {
    axios.get(`http://localhost:5000/api/salesAndFinance/finance/salary/${id}`)
      .then(response => {
        setRecord(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        message.error('Error fetching record');
        console.error(error);
      });
  }, [id]);

  // Handle form field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle date change for payment_date
  const handleDateChange = (date) => {
    setRecord(prevState => ({ ...prevState, payment_date: date.format("YYYY-MM-DD") }));
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/salesAndFinance/finance/salary/${id}`, record);
      message.success("Record updated successfully");
      navigate("/salesAndFinance/finance/viewSalaryRecord"); // Redirect to the records list page
    } catch (error) {
      message.error("Error updating record");
      console.error(error);
    }
  };

  console.log(record);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-4 text-xl font-semibold">Edit Salary Record</h2>
      <Card className="justify-center w-2/3 p-4 mb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Employee Name (Display Only) */}
        <div>
          <label className="block font-medium text-gray-700">Employee Name</label>
          <input
            type="text"
            name="emp_name"
            value={record.emp_name}
            disabled
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Type (Display Only) */}
        <div>
          <label className="block font-medium text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            value={record.type}
            disabled
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Editable Fields */}
        <div>
          <label className="block font-medium text-gray-700">Basic Days</label>
          <input
            type="number"
            name="basic_days"
            value={record.basic_days}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Bonus Salary</label>
          <input
            type="number"
            name="bonus_salary"
            value={record.bonus_salary}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* OT Hours */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Weekday OT Hours</label>
            <input
              type="number"
              name="ot_hours"
              value={(record.week_hours != 0)?record.week_hours : 0}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Saturday OT Hours</label>
            <input
              type="number"
              name="saturday_hours"
              value={(record.saturday_hours != 0)?record.saturday_hours : 0}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Sunday OT Hours</label>
            <input
              type="number"
              name="sunday_hours"
              value={record.sunday_hours}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* EPF/ETF */}
        <div>
          <label className="block font-medium text-gray-700">EPF/ETF (%)</label>
          <input
            type="number"
            name="epf_etf"
            value={record.epf_etf}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Payment Date */}
        <div>
          <label className="block font-medium text-gray-700">Payment Date</label>
          <DatePicker
            value={record.payment_date ? moment(record.payment_date) : null}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700">Remarks</label>
          <input
            type="text"
            name="description"
            value={record.description || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 font-semibold text-white rounded-md bg-lime-600 hover:bg-lime-700"
        >
          Save Changes
        </button>
      </form>
      </Card>
    </div>
  );
};

export default EditSalaryRecord;
