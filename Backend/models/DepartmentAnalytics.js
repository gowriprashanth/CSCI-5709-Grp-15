/**
 * @author Gowri Kanagaraj
 */
const mongoose = require('mongoose');

const departmentAnalyticsSchema = new mongoose.Schema({
  created: Number,
  resolved: Number,
  categories: String
});

const DepartmentAnalytics = mongoose.model('DepartmentAnalytics', departmentAnalyticsSchema);

module.exports = DepartmentAnalytics;