import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Card } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DatePicker from "react-datepicker"; // Using a date picker library for better date management
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Insights = () => {
  const [bestTreatments, setBestTreatments] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); 
  const passedData = location.state || {}; 

  // State for pie chart values
  const [healthyValue, setHealthyValue] = useState(0);
  const [maintenanceValue, setMaintenanceValue] = useState(0);
  const [concernedValue, setConcernedValue] = useState(0);

  useEffect(() => {
    // Load values from local storage
    const storedData = JSON.parse(localStorage.getItem("bestTreatments")) || [];
    setBestTreatments(storedData);
  }, []);

    const calculateBestTreatment = (disease) => {
      const filteredData = bestTreatments.filter(
        (t) => t.treatedPestOrDisease === disease
      );
      if (filteredData.length === 0) return null;
  
      const bestTreatment = filteredData.reduce((prev, current) => {
        const prevSuccessRate = 
          (parseFloat(prev.percentageReductionInSymptoms) +
            parseFloat(prev.improvementInPlantHealth)) / 2;
        const currentSuccessRate =
          (parseFloat(current.percentageReductionInSymptoms) +
            parseFloat(current.improvementInPlantHealth)) / 2;
        return prevSuccessRate > currentSuccessRate ? prev : current;
      });
  
      return {
        bestTreatmentMethod: bestTreatment.treatmentMethodUsed,
        bestSuccessRate: (
          (parseFloat(bestTreatment.percentageReductionInSymptoms) +
            parseFloat(bestTreatment.improvementInPlantHealth)) / 2
        ).toFixed(2),
      };
    };
  
    const updateBestTreatmentBanner = () => {
      const diseases = [...new Set(bestTreatments.map(t => t.treatedPestOrDisease))];
      return diseases.map(disease => {
        const best = calculateBestTreatment(disease);
        return {
          diseaseName: disease,
          bestTreatmentMethod: best.bestTreatmentMethod,
          bestSuccessRate: best.bestSuccessRate,
        };
      });
    };
  
    // Delete a treatment
    const handleDelete = (index) => {
      const updatedTreatments = bestTreatments.filter((_, i) => i !== index);
      setBestTreatments(updatedTreatments);
      localStorage.setItem("bestTreatments", JSON.stringify(updatedTreatments));
    };
  
    // Update treatment values
    const handleUpdate = (index, field, value) => {
      const updatedTreatments = [...bestTreatments];
      updatedTreatments[index][field] = value;
      setBestTreatments(updatedTreatments);
      localStorage.setItem("bestTreatments", JSON.stringify(updatedTreatments));
    };

    // Format Date to MM/DD/YYYY
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  
    const bestTreatmentBanner = updateBestTreatmentBanner();

  // Pie chart data using state values
  const pieData = {
    labels: ["Healthy", "Maintenance Needed", "Concerned"],
    datasets: [
      {
        data: [healthyValue, maintenanceValue, concernedValue],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save updated values to local storage
    const values = {
      healthy: healthyValue,
      maintenance: maintenanceValue,
      concerned: concernedValue,
    };
    localStorage.setItem("pieChartValues", JSON.stringify(values));
  };

  const handleClick = () => {
    navigate("/diseases"); 
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div className={`ml-[300px] p-4`}>
        <Breadcrumb
          items={[
            {
              href: "/diseases",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: "Insights",
            },
          ]}
        />
        {/* Pie Chart Section */}
        <div className="mt-8">
          <h1 className="text-5xl font-semibold mb-4 text-center">
            Coconut Plantation - Health Overview
          </h1>

          <div className="flex justify-between items-start mt-8">
            <div style={{ width: "370px", height: "370px", marginLeft: "110px" }}>
              <Pie data={pieData} />
            </div>

            {/* User Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-10 bg-white rounded-3xl shadow-none w-full max-w-md mx-auto"
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="healthy" className="block mb-2">Healthy</label>
                  <input
                    id="healthy"
                    type="number"
                    value={healthyValue}
                    onChange={(e) => setHealthyValue(Number(e.target.value))}
                    className="p-2 border rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="maintenance" className="block mb-2">Maintenance Needed</label>
                  <input
                    id="maintenance"
                    type="number"
                    value={maintenanceValue}
                    onChange={(e) => setMaintenanceValue(Number(e.target.value))}
                    className="p-2 border rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="concerned" className="block mb-2">Concerned</label>
                  <input
                    id="concerned"
                    type="number"
                    value={concernedValue}
                    onChange={(e) => setConcernedValue(Number(e.target.value))}
                    className="p-2 border rounded-md w-full"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md w-full max-w-xs mx-auto block">
                Update Chart
              </button>
              <button type="reset" onClick={() => { setHealthyValue(0); setMaintenanceValue(0); setConcernedValue(0); }} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md w-full max-w-xs mx-auto block">
                Reset Values
              </button>
              <button type="button" onClick={handleClick} className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md w-full max-w-xs mx-auto block">
                Exit
              </button>
            </form>
          </div>
        </div>

        
          {/* Banner Displaying Best Treatment Information */}
          <div className="mt-5 p-4 bg-[#E0F7FA] text-[#00796B] text-xl font-semibold rounded-md text-center shadow-md">
            {bestTreatmentBanner.map((item, index) => (
              <div key={index}>
                Best treatment for {item.diseaseName}:{" "}
                <span className="font-bold">{item.bestTreatmentMethod}</span> with
                a success rate of{" "}
                <span className="font-bold">{item.bestSuccessRate}%</span>
              </div>
            ))}
          </div>

        {/* Summary Section */}
           {/* Editable Treatment Table */}
           <div className="overflow-x-auto mt-10 mb-6">
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Completion Date</th>
                  <th className="py-3 px-6 text-left">Treated Pest/Disease</th>
                  <th className="py-3 px-6 text-left">Treatment Method</th>
                  <th className="py-3 px-6 text-left">Reduction in Symptoms (%)</th>
                  <th className="py-3 px-6 text-left">Improvement in Health (%)</th>
                  <th className="py-3 px-6 text-left">Success Rate (%)</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bestTreatments.map((treatment, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="py-4 px-6">
                      <DatePicker
                        selected={new Date(treatment.completionDateOfTreatment)}
                        onChange={(date) =>
                          handleUpdate(index, "completionDateOfTreatment", date)
                        }
                        dateFormat="MM/dd/yyyy"
                        className="w-full p-1"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        type="text"
                        value={treatment.treatedPestOrDisease}
                        onChange={(e) =>
                          handleUpdate(index, "treatedPestOrDisease", e.target.value)
                        }
                        className="w-full p-1"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        type="text"
                        value={treatment.treatmentMethodUsed}
                        onChange={(e) =>
                          handleUpdate(index, "treatmentMethodUsed", e.target.value)
                        }
                        className="w-full p-1"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        type="number"
                        value={treatment.percentageReductionInSymptoms}
                        onChange={(e) =>
                          handleUpdate(index, "percentageReductionInSymptoms", e.target.value)
                        }
                        className="w-full p-1"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        type="number"
                        value={treatment.improvementInPlantHealth}
                        onChange={(e) =>
                          handleUpdate(index, "improvementInPlantHealth", e.target.value)
                        }
                        className="w-full p-1"
                      />
                    </td>
                    <td className="py-4 px-6 font-bold text-green-600">
                      {(
                        (parseFloat(treatment.percentageReductionInSymptoms) +
                          parseFloat(treatment.improvementInPlantHealth)) /
                        2
                      ).toFixed(2)}
                      %
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default Insights;
``
