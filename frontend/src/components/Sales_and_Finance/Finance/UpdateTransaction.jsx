import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, Input, Select, Button, Radio } from "antd";
import moment from "moment";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";

const { Group } = Radio;

export default function UpdateTransaction() {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch the transaction data based on ID
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/salesAndFinance/finance/transaction/${id}`);
        setTransaction(response.data.data);
      } catch (error) {
        enqueueSnackbar("Error fetching transaction data", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleSaveTransactionRecord = async () => {
    // Add validation and save logic here
    if (!transaction.date || !transaction.type || !transaction.subtype || !transaction.amount || !transaction.description || !transaction.payer_payee || !transaction.method) {
      enqueueSnackbar("Please fill in all fields.", { variant: "error" });
      return;
    }

    if (transaction.amount <= 0 || transaction.amount > 10000000) {
      enqueueSnackbar("Please enter a valid amount between 0 and 10 million.", { variant: "error" });
      return;
    }

    if (new Date(transaction.date) > new Date()) {
      enqueueSnackbar("Please select a date on or before today.", { variant: "error" });
      return;
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/salesAndFinance/finance/transaction/${id}`, transaction);
      enqueueSnackbar("Transaction updated successfully", { variant: "success" });
      navigate("/salesAndFinance/finance/transaction-display");
    } catch (error) {
      enqueueSnackbar("Error updating transaction", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !transaction) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2>Edit Transaction</h2>
      <div>
        <label>Date:</label>
        <DatePicker
          value={moment(transaction.date)}
          onChange={(date) => setTransaction({ ...transaction, date: date.format("YYYY-MM-DD") })}
        />
      </div>
      <div>
        <label>Type:</label>
        <Group
          onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
          value={transaction.type}
        >
          <Radio value="income">Income</Radio>
          <Radio value="expense">Expense</Radio>
        </Group>
      </div>
      <div>
        <label>Subtype:</label>
        <Input
          value={transaction.subtype}
          onChange={(e) => setTransaction({ ...transaction, subtype: e.target.value })}
        />
      </div>
      <div>
        <label>Amount:</label>
        <Input
          type="number"
          value={transaction.amount}
          onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
        />
      </div>
      <div>
        <label>Description:</label>
        <Input
          value={transaction.description}
          onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
        />
      </div>
      <div>
        <label>Payer/Payee:</label>
        <Input
          value={transaction.payer_payee}
          onChange={(e) => setTransaction({ ...transaction, payer_payee: e.target.value })}
        />
      </div>
      
      <Button type="primary" onClick={handleSaveTransactionRecord}>Save</Button>
      <Button type="default" onClick={() => navigate("/salesAndFinance/finance/transaction-display")}>Cancel</Button>
    </div>
  );
}
