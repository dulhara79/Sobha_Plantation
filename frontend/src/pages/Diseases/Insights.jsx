import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Card } from 'antd';

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
  const passedData = location.state || {};  // Get passed data or fallback to empty object

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

  return (
    <div>
      <Header />
      <Sidebar />

      <div className={`ml-[300px] p-4`}>
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: 'Insights',
            },
          ]}
        />

        {/* Best Treatment Banner */}
        <div className="mt-4 p-4 bg-[#E0F7FA] text-[#00796B] text-xl font-semibold rounded-md text-center shadow-md">
          {bestTreatments.map((item) => (
            <div key={item.diseaseName}>
              Best treatment for {item.diseaseName}:{" "}
              <span className="font-bold">{item.bestTreatmentMethod}</span> with a success rate of{" "}
              <span className="font-bold">{item.bestSuccessRate}%</span>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockData.map((disease) => (
            <Card
              key={disease.diseaseName}
              title={disease.diseaseName}
              bordered={false}
              className="shadow-lg"
              style={{ borderColor: '#00796B', backgroundColor: '#E0F2F1' }}
            >
              {disease.treatments.map((treatment) => (
                <div key={treatment.method} className="mb-2">
                  <p>
                    <strong>Treatment Used:</strong>{" "}
                    <span style={{ color: '#00796B' }}>{treatment.method}</span>
                  </p>
                  <p>
                    <strong>Success Rate:</strong>{" "}
                    <span style={{ color: '#388E3C' }}>{treatment.successRate}%</span>
                  </p>
                </div>
              ))}
            </Card>
          ))}

          {/* Display Passed Data Card if Present */}
          {passedData.treatedPestOrDisease && passedData.treatmentMethodUsed && (
            <Card
              key={passedData.treatedPestOrDisease}
              title={passedData.treatedPestOrDisease}
              bordered={false}
              className="shadow-lg"
              style={{ borderColor: '#00796B', backgroundColor: '#E0F2F1' }}
            >
              <div className="mb-2">
                <p>
                  <strong>Treatment Used:</strong>{" "}
                  <span style={{ color: '#00796B' }}>{passedData.treatmentMethodUsed}</span>
                </p>
                <p>
                  <strong>Success Rate:</strong>{" "}
                  <span style={{ color: '#388E3C' }}>{passedData.successRate}%</span>
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
