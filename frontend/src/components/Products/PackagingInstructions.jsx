// PackagingInstructions.jsx

import React from 'react';
import { Card, Divider, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const PackagingInstructions = () => {
  return (
    <div style={{ backgroundColor: '#f0f2f5', padding: '24px', borderRadius: '8px' }}>

      {/* Packaging Instructions and Guidelines */}
      <Divider style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold', color: '#1D6660' }}>
        Packaging Instructions and Guidelines
      </Divider>
      <Card
        style={{
          padding: '24px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          marginBottom: '24px',
        }}
      >
        <Paragraph
          style={{
            fontSize: '16px',
            fontWeight: '500',
            // color: '#1b5e20',
            marginBottom: '16px',
            textAlign: 'center'
          }}
        >
          Follow these guidelines for efficient and safe packaging:
        </Paragraph>
        <ul
          style={{
            paddingLeft: '0',
            listStyleType: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: '#4caf50',
            }}
          >
            <CheckCircleOutlined style={{ marginRight: '8px', fontSize: '16px' }} />
            Ensure all products are sealed properly.
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: '#4caf50',
            }}
          >
            <CheckCircleOutlined style={{ marginRight: '8px', fontSize: '16px' }} />
            Label each package with the correct product information.
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: '#4caf50',
            }}
          >
            <CheckCircleOutlined style={{ marginRight: '8px', fontSize: '16px' }} />
            Store packages in a cool, dry place.
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: '#4caf50',
            }}
          >
            <CheckCircleOutlined style={{ marginRight: '8px', fontSize: '16px' }} />
            Use appropriate packaging materials to prevent damage.
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default PackagingInstructions;
