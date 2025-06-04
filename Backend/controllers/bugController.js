const bugModel = require('../models/bugModel');

const getBugs = async (req, res, next) => {
  try {
    const filters = {
      severity: req.query.severity,
      status: req.query.status
    };
    const bugs = await bugModel.getAllBugs(filters);
    res.json(bugs);
  } catch (err) {
    next(err);
  }
};

const createBug = async (req, res, next) => {
  try {
    const { title, description, severity, status } = req.body;
    
    if (!title || !description || !severity || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newBug = await bugModel.createBug({ title, description, severity, status });
    res.status(201).json(newBug);
  } catch (err) {
    next(err);
  }
};

const updateBug = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bugData = req.body;
    
    if (!id || !bugData || Object.keys(bugData).length === 0) {
      return res.status(400).json({ message: 'ID and update data are required' });
    }

    const updatedBug = await bugModel.updateBug(id, bugData);
    updatedBug 
      ? res.json(updatedBug)
      : res.status(404).json({ message: 'Bug not found' });
  } catch (err) {
    next(err);
  }
};

const deleteBug = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    if (!id) {
      return res.status(400).json({ message: 'Bug ID is required' });
    }

    const deleted = await bugModel.deleteBug(id);
    deleted
      ? res.json({ message: 'Bug deleted successfully' })
      : res.status(404).json({ message: 'Bug not found' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBugs,
  createBug,
  updateBug,
  deleteBug
};