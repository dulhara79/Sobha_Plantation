// src/components/SalesReportGenerator.jsx
import React from 'react';
import { Button } from 'antd';

const SalesReportGenerator = () => {
    const handleGenerateReport = () => {
        // Logic to generate and download the report
    };

    return (
        <div className="flex justify-end p-4">
            <Button type="primary" onClick={handleGenerateReport}>
                Generate Report
            </Button>
        </div>
    );
};

export default SalesReportGenerator;
