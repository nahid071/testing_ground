const mongoose = require("mongoose");

const WeekDataSchema = new mongoose.Schema({
  weekData: [Number],
  startDate: Date,
  endDate: Date,
});

const WeekData = mongoose.model("WeekData", WeekDataSchema);

module.exports = WeekData;
