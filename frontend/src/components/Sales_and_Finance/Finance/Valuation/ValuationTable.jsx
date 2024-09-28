// import React from "react";
// import { TrashIcon, PencilSquareIcon } from "icons"; // Import necessary icons

// export default function ValuationTable({ records, loading, handleDelete }) {
//   if (loading) return <p>Loading...</p>;

//   return (
//     <table className="valuation-table">
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Type</th>
//           <th>Subtype</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {records.map((record) => (
//           <tr key={record._id}>
//             <td>{record.date}</td>
//             <td>{record.type}</td>
//             <td>{record.subtype}</td>
//             <td>
//               <button onClick={() => handleDelete(record._id)}><TrashIcon /></button>
//               <button><PencilSquareIcon /></button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }


// ValuationTable Component
import React from "react";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; // Ant Design icons

export default function ValuationTable({ records, loading, handleDelete }) {
  if (loading) return <p>Loading...</p>;

  return (
    <table className="valuation-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Subtype</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record._id}>
            <td>{record.date}</td>
            <td>{record.type}</td>
            <td>{record.subtype}</td>
            <td>
              <button onClick={() => handleDelete(record._id)}><DeleteOutlined /></button>
              <button><EditOutlined /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
