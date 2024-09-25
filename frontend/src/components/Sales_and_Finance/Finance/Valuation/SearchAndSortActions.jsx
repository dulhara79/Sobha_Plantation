import React from "react";

export default function SearchAndSortActions({ searchQuery, setSearchQuery, sortBy, setSortBy, sortOrder, setSortOrder }) {
  const handleSort = (criteria) => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  return (
    <div className="search-sort-actions">
      {/* Add Search Bar, Sort Options */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search records..."
      />
      <button onClick={() => handleSort('date')}>
        Sort by Date {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}
