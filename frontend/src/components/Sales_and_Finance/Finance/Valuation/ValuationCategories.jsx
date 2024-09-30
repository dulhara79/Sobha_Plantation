// // import React from "react";
// // import { RectangleGroupIcon, TruckIcon, GiFruitBowl, GiWaterTank } from "icons"; // Import necessary icons

// // export default function ValuationCategories({ setSearchQuery }) {
// //   const categories = [
// //     { value: 'land', label: 'Land', icon: <RectangleGroupIcon /> },
// //     { value: 'machinery', label: 'Machinery', icon: <TruckIcon /> },
// //     { value: 'crops', label: 'Crops', icon: <GiFruitBowl /> },
// //     { value: 'water', label: 'Water', icon: <GiWaterTank /> },
// //   ];

// //   return (
// //     <div className="valuation-categories">
// //       {categories.map(cat => (
// //         <button
// //           key={cat.value}
// //           value={cat.value}
// //           onClick={(e) => setSearchQuery(e.target.value)}
// //           className="category-button"
// //         >
// //           {cat.icon}
// //           {cat.label}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // }

// // ValuationCategories Component
// import React from "react";
// import { AppstoreOutlined, CarOutlined, AppleOutlined, CloudOutlined } from '@ant-design/icons'; // Ant Design icons

// export default function ValuationCategories({ setSearchQuery }) {
//   const categories = [
//     { value: 'land', label: 'Land', icon: <AppstoreOutlined /> },
//     { value: 'machinery', label: 'Machinery', icon: <CarOutlined /> },
//     { value: 'crops', label: 'Crops', icon: <AppleOutlined /> },
//     { value: 'water', label: 'Water', icon: <CloudOutlined /> },
//   ];

//   return (
//     <div className="valuation-categories">
//       {categories.map(cat => (
//         <button
//           key={cat.value}
//           value={cat.value}
//           onClick={(e) => setSearchQuery(e.target.value)}
//           className="category-button"
//         >
//           {cat.icon}
//           {cat.label}
//         </button>
//       ))}
//     </div>
//   );
// }

import React from 'react';

const categories = ['All', 'Assets', 'Liabilities', 'Equity', 'Income', 'Expenses'];

export default function ValuationCategories({ setSearchQuery }) {
  return (
    <div className="mb-6">
      <h2 className="mb-3 text-lg font-semibold text-gray-700">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSearchQuery(category === 'All' ? '' : category)}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 ease-in-out bg-gray-200 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}