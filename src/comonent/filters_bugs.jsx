import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const FiltersBugs = ({ onFilterChange, filteredCount, totalCount }) => {
  const [filters, setFilters] = useState({
    severity: 'All Severities',
    status: 'All Statuses'
  });

  const severityOptions = ['All Severities', 'Critical', 'High', 'Medium', 'Low'];
  const statusOptions = ['All Statuses', 'Open', 'In Progress', 'Resolved', 'Closed'];

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:filter" className="text-gray-400 w-5 h-5" />
            <span className="text-gray-700 font-medium">Filters</span>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="severity" className="text-sm text-gray-600">Severity:</label>
            <select
              id="severity"
              value={filters.severity}
              onChange={(e) => handleFilterChange('severity', e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {severityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="status" className="text-sm text-gray-600">Status:</label>
            <select
              id="status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {typeof filteredCount === 'number' && typeof totalCount === 'number' && (
          <div className="text-gray-600 text-sm bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
            <span className="font-medium text-gray-700">{filteredCount}</span> of <span className="font-medium text-gray-700">{totalCount}</span> bugs shown
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersBugs;