import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Card } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Mock data for demonstration purposes
const mockData = [
  {
    diseaseName: "Disease A",
    treatments: [
      { method: "Treatment B", successRate: 20 },
      { method: "Treatment C", successRate: 50 },
      { method: "Treatment D", successRate: 80 },
    ],
  },
  {
    diseaseName: "Disease B",
    treatments: [
      { method: "Treatment E", successRate: 70 },
      { method: "Treatment F", successRate: 85 },
    ],
  },
  // Add more data as needed
];

const Insights = () => {
  const [bestTreatments, setBestTreatments] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Get the navigate function
  const passedData = location.state || {}; // Get passed data or fallback to empty object

  // State for pie chart values
  const [healthyValue, setHealthyValue] = useState(0);
  const [maintenanceValue, setMaintenanceValue] = useState(0);
  const [concernedValue, setConcernedValue] = useState(0);

  useEffect(() => {
    // Load values from local storage
    const storedValues = localStorage.getItem("pieChartValues");
    if (storedValues) {
      const { healthy, maintenance, concerned } = JSON.parse(storedValues);
      setHealthyValue(healthy);
      setMaintenanceValue(maintenance);
      setConcernedValue(concerned);
    }
  }, []);

  useEffect(() => {
    // Calculate the best treatment for each disease based on the highest success rate
    const calculateBestTreatments = () => {
      const allData = [...mockData]; // Clone mock data

      // Check if there is any passed data and format it similarly to mockData
      if (passedData.treatedPestOrDisease && passedData.treatmentMethodUsed) {
        const formattedData = {
          diseaseName: passedData.treatedPestOrDisease,
          treatments: [
            {
              method: passedData.treatmentMethodUsed,
              successRate: passedData.successRate,
            },
          ],
        };
        allData.push(formattedData);
      }

      const bestTreatmentsResult = allData.map((disease) => {
        const bestTreatment = disease.treatments.reduce((prev, current) =>
          prev.successRate > current.successRate ? prev : current
        );
        return {
          diseaseName: disease.diseaseName,
          bestTreatmentMethod: bestTreatment.method,
          bestSuccessRate: bestTreatment.successRate,
        };
      });

      setBestTreatments(bestTreatmentsResult);
    };

    calculateBestTreatments();
  }, [passedData]);

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
    navigate("/diseases"); // Use navigate function to change routes
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
          {/* Heading for Pie Chart */}
          <h1 className="text-5xl font-semibold mb-4 text-center">
            Coconut Plantation - Health Overview
          </h1>

          <div className="flex justify-between items-start mt-8">
            <div
              style={{ width: "370px", height: "370px", marginLeft: "110px" }}
            >
              <Pie data={pieData} />
            </div>

            {/* User Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-10 bg-white rounded-3xl shadow-none w-full max-w-md mx-auto"
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="healthy" className="block mb-2">
                    Healthy
                  </label>
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
                  <label htmlFor="maintenance" className="block mb-2">
                    Maintenance Needed
                  </label>
                  <input
                    id="maintenance"
                    type="number"
                    value={maintenanceValue}
                    onChange={(e) =>
                      setMaintenanceValue(Number(e.target.value))
                    }
                    className="p-2 border rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="concerned" className="block mb-2">
                    Concerned
                  </label>
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
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md w-full max-w-xs mx-auto block"
              >
                Update Chart
              </button>
              <button
                type="reset"
                onClick={() => {
                  setHealthyValue(0);
                  setMaintenanceValue(0);
                  setConcernedValue(0);
                }}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md w-full max-w-xs mx-auto block"
              >
                Reset Values
              </button>
              <button
                type="button"
                onClick={handleClick} // Use handleClick function
                className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md w-full max-w-xs mx-auto block"
              >
                Exit
              </button>
            </form>
          </div>
        </div>

        {/* Best Treatment Banner */}
        <div className="mt-20 p-4 bg-[#E0F7FA] text-[#00796B] text-xl font-semibold rounded-md text-center shadow-md">
          {bestTreatments.map((item) => (
            <div key={item.diseaseName}>
              Best treatment for {item.diseaseName}:{" "}
              <span className="font-bold">{item.bestTreatmentMethod}</span> with
              a success rate of{" "}
              <span className="font-bold">{item.bestSuccessRate}%</span>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-6 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockData.map((disease) => (
            <Card
              key={disease.diseaseName}
              title={disease.diseaseName}
              bordered={false}
              className="shadow-lg"
              style={{ borderColor: "#00796B", backgroundColor: "#E0F2F1" }}
            >
              {disease.treatments.map((treatment) => (
                <div key={treatment.method} className="mb-2">
                  <p>
                    <strong>Treatment Used:</strong>{" "}
                    <span style={{ color: "#00796B" }}>{treatment.method}</span>
                  </p>
                  <p>
                    <strong>Success Rate:</strong>{" "}
                    <span style={{ color: "#388E3C" }}>
                      {treatment.successRate}%
                    </span>
                  </p>
                </div>
              ))}
                        </Card>
          ))}

          {/* Display Passed Data Card if Present */}
          {passedData.treatedPestOrDisease &&
            passedData.treatmentMethodUsed && (
              <Card
                key={passedData.treatedPestOrDisease}
                title={passedData.treatedPestOrDisease}
                bordered={false}
                className="shadow-lg"
                style={{ borderColor: "#00796B", backgroundColor: "#E0F2F1" }}
              >
                <div className="mb-2">
                  <p>
                    <strong>Treatment Used:</strong>{" "}
                    <span style={{ color: "#00796B" }}>
                      {passedData.treatmentMethodUsed}
                    </span>
                  </p>
                  <p>
                    <strong>Success Rate:</strong>{" "}
                    <span style={{ color: "#388E3C" }}>
                      {passedData.successRate}%
                    </span>
                  </p>
                </div>
              </Card>
            )}
        </div>
      </div>
    </div>
  );
};

export default Insights;

