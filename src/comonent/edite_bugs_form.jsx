import React, { useState } from 'react';
import { updateBug } from '../services/serviceApi';

const EditBugForm = ({ bug, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({ ...bug });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBug = await updateBug(bug.id, formData);
      onSuccess(updatedBug);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded px-3 py-2"
          rows="4"
          required
        />
      </div>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Severity</label>
          <select name="severity" value={formData.severity} onChange={handleChange} className="border border-gray-200 px-2 py-1 rounded">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="border border-gray-200 px-2 py-1 rounded">
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>



      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditBugForm;
