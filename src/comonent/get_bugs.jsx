import React, { useEffect, useState } from 'react';
import { deleteBug, getBugs, updateBug } from '../services/serviceApi';
import EditBugForm from './edite_bugs_form';
import FiltersBugs from './filters_bugs';
import { toast } from 'react-hot-toast';
import { Icon } from '@iconify/react';

const BugList = ({ refreshTrigger }) => {
  const [allBugs, setAllBugs] = useState([]);
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [editingBug, setEditingBug] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    severity: 'All Severities',
    status: 'All Statuses'
  });

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const data = await getBugs();
        setAllBugs(data);
        applyFilters(data, filters);
      } catch (error) {
        console.error('Error loading bugs:', error);
        toast.error('Failed to load bugs');
      }
    };
    fetchBugs();
  }, [refreshTrigger]);

  useEffect(() => {
    applyFilters(allBugs, filters);
  }, [filters, allBugs]);

  const applyFilters = (bugs, { severity, status }) => {
    let filtered = [...bugs];
    
    if (severity !== 'All Severities') {
      filtered = filtered.filter(bug => bug.severity === severity);
    }
    
    if (status !== 'All Statuses') {
      filtered = filtered.filter(bug => bug.status === status);
    }
    
    setFilteredBugs(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleEdit = (bug) => {
    setEditingBug(bug);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBug(id);
      const updatedBugs = allBugs.filter(bug => bug.id !== id);
      setAllBugs(updatedBugs);
      applyFilters(updatedBugs, filters);
      toast.success('Bug deleted successfully');
    } catch (error) {
      console.error('Error deleting bug:', error);
      toast.error('Failed to delete bug');
    }
  };

  const handleUpdateSuccess = (updatedBug) => {
    const updatedBugs = allBugs.map(bug => bug.id === updatedBug.id ? updatedBug : bug);
    setAllBugs(updatedBugs);
    applyFilters(updatedBugs, filters);
    setIsEditModalOpen(false);
    toast.success('Bug updated successfully');
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return 'bg-green-100 border-green-400 text-green-700';
      case 'Medium': return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'High': return 'bg-orange-100 border-orange-400 text-orange-700';
      case 'Critical': return 'bg-red-100 border-red-500 text-red-700';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 border-blue-400 text-blue-700';
      case 'In Progress': return 'bg-purple-100 border-purple-400 text-purple-700';
      case 'Resolved': return 'bg-green-100 border-green-400 text-green-700';
      case 'Closed': return 'bg-gray-100 border-gray-400 text-gray-700';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <FiltersBugs onFilterChange={handleFilterChange} />
      
       {(filters.severity !== 'All Severities' || filters.status !== 'All Statuses') && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Active filters:</h3>
          <div className="flex flex-wrap gap-2">
            {filters.severity !== 'All Severities' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Severity: {filters.severity}
              </span>
            )}
            {filters.status !== 'All Statuses' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status: {filters.status}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="text-gray-600 mb-4">
        Showing {filteredBugs.length} of {allBugs.length} bugs
      </div>


      {filteredBugs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No bugs found matching your filters</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBugs.map((bug) => (
            <div
              key={bug.id}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-200 group relative"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-slate-900 text-lg leading-tight pr-2">
                  {bug.title}
                </h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-full flex items-center justify-center transition-colors"
                    onClick={() => handleEdit(bug)}
                    aria-label="Edit bug"
                  >
                    <Icon icon="mdi:text-box-edit" className='text-xl text-blue-700'/>
                  </button>
                  <button
                    className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center transition-colors"
                    onClick={() => handleDelete(bug.id)}
                    aria-label="Delete bug"
                  >
                    <Icon icon="mingcute:delete-2-fill" className='text-xl text-red-500' />
                  </button>
                </div>
              </div>

              <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                {bug.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(bug.severity)}`}>
                  {bug.severity}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bug.status)}`}>
                  {bug.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                {bug.assignee && (
                  <span className="bg-slate-100 px-2 py-1 rounded-full">
                    {bug.assignee}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Bug Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold text-gray-800">Edit Bug Report</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <EditBugForm
                bug={editingBug}
                onSuccess={handleUpdateSuccess}
                onCancel={() => setIsEditModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BugList;