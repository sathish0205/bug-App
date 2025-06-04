const pool = require('../config/db');

const getAllBugs = async (filters = {}) => {
  try {
    let query = 'SELECT * FROM bugs WHERE 1=1';
    const params = [];

    if (filters.severity) {
      query += ' AND severity = ?';
      params.push(filters.severity);
    }
    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    const [rows] = await pool.query(query, params);
    return rows;
  } catch (err) {
    throw err;
  }
};

const createBug = async ({ title, description, severity, status }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO bugs (title, description, severity, status) VALUES (?, ?, ?, ?)',
      [title, description, severity, status]
    );
    return { id: result.insertId, title, description, severity, status };
  } catch (err) {
    throw err;
  }
};

const updateBug = async (id, data) => {
  try {
    const fields = [];
    const values = [];

    for (let key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    values.push(id);

    const [result] = await pool.query(
      `UPDATE bugs SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0 ? { id, ...data } : null;
  } catch (err) {
    throw err;
  }
};

const deleteBug = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM bugs WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllBugs,
  createBug,
  updateBug,
  deleteBug
};