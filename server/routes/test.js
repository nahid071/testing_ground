const express = require("express");
const router = express.Router();
const WeekData = require("../models/WeekData");
const handlePageVisit = require("../utils/workflow/triggers/handlePageVisit");

const user = {
  name: "Nahid",
  visitedPages: [
    "schedule",
    "budget tool",
    "my social",
    "tip pool",
    "web builder",
  ],
};

router.get("/test", async (req, res) => {
  res.send("Welcome to the Express server with MongoDB!");
});

// POST request to create WeekData
router.post("/create-week-data", async (req, res) => {
  const { weekData, startDate, endDate } = req.body;

  const newWeekData = new WeekData({
    weekData,
    startDate,
    endDate,
  });

  try {
    const savedWeekData = await newWeekData.save();
    res.status(201).json(savedWeekData);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET all WeekData
router.get("/get-all-week-data", async (req, res) => {
  try {
    const allWeekData = await WeekData.find();

    // workflow function ==================================
    handlePageVisit(user, "budget tool");
    // workflow function ==================================

    res.status(201).json(allWeekData);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET data of each day of a month
router.get("/get-monthly-data", async (req, res) => {
  const { month, year } = req.body;

  try {
    console.log("===============>>>", month, year);

    function getDaysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }

    async function getMonthlyData(month, year) {
      // Start and end dates of the desired month
      const startOfMonth = new Date(year, month - 1, 1);
      console.log("🚀 ~ getMonthlyData ~ startOfMonth:", startOfMonth);
      const endOfMonth = new Date(year, month, 0); // The last day of the month
      console.log("🚀 ~ getMonthlyData ~ endOfMonth:", endOfMonth);

      // Query to get all weeks within the month
      const weeklyData = await WeekData.find({
        $or: [
          { startDate: { $gte: startOfMonth, $lte: endOfMonth } },
          { endDate: { $gte: startOfMonth, $lte: endOfMonth } },
          { startDate: { $lte: startOfMonth }, endDate: { $gte: endOfMonth } },
        ],
      });

      return weeklyData;
    }

    async function extractMonthlyData(month, year) {
      const weeklyData = await getMonthlyData(month, year);
      console.log("🚀 ~ extractMonthlyData ~ weeklyData:", weeklyData);

      const daysInMonth = getDaysInMonth(month, year);
      const dailyData = new Array(daysInMonth).fill(null);

      weeklyData.forEach((week) => {
        const weekStartDate = new Date(week.startDate);
        const weekEndDate = new Date(week.endDate);
        const weekDays = week.weekData;

        for (let i = 0; i < weekDays.length; i++) {
          const currentDay = new Date(weekStartDate);
          currentDay.setDate(weekStartDate.getDate() + i);

          if (
            currentDay.getMonth() + 1 === month &&
            currentDay.getFullYear() === year
          ) {
            const dayIndex = currentDay.getDate() - 1;
            dailyData[dayIndex] = weekDays[i];
          }
        }
      });

      return dailyData
    }
    extractMonthlyData(month, year)
      .then((monthlyData) => {
        res
          .status(201)
          .send({ success: true, data: monthlyData, days: monthlyData.length });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
