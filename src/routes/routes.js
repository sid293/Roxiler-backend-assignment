let express = require("express");
let router = express.Router();

const {getAllTransactions, getStatistics, getBarChart, getPieChart} = require("../controller/transactions");

router.get("/transactions", getAllTransactions);

router.get("/statistics",getStatistics);

router.get("/bar-chart", getBarChart);

router.get("/pie-chart", getPieChart);

module.exports = router;
