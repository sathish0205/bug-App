import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import FiltersBugs from '../comonent/filters_bugs';
import BugList from '../comonent/get_bugs';
import BugReportForm from '../comonent/add_bugs_form';

const IndexPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Using number instead of boolean

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSuccess = () => {
    toggleModal();
    setRefreshTrigger(prev => prev + 1); // Increment to trigger refresh
    toast.success('Bug report submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      
      <div className="w-full space-y-6">
        {/* Header Card */}
        <div className=" p-6 ">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Bug Tracker</h2>
              <p className="text-gray-600 mt-1">Track and manage your software issues</p>
            </div>
            <button
              onClick={toggleModal}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Report New Bug
            </button>
          </div>
        </div>

        {/* Filters and Bug List */}
        <div className="space-y-4">
          <BugList refreshTrigger={refreshTrigger} />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b p-4">
                <h3 className="text-xl font-semibold text-gray-800">Report New Bug</h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <BugReportForm onSuccess={handleSuccess} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;