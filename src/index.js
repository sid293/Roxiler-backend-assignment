const express = require("express");
const connectDB = require("./utils/db");
const app = express();
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");
const Transaction = require("./models/models");
const routes = require("./routes/routes");
const {getAllTransactions, getStatistics, getBarChart} = require("./controller/transactions");
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

app.get("/initialize", async (req, res) => {
    let transactions = await axios.get(process.env.API_URL);
    transactions.data.forEach(async (transaction) => {  
        await Transaction.create(transaction);
    });
    res.json({ message: "Transactions initialized" });
});

app.get("/data", async (req, res) => {
    let ans = {};
    let { month = "March", searchText = "", page = 1 } = req.query;
    let localUrl = process.env.LOCAL_URL;
    let transactions = await axios.get(`${localUrl}/data/transactions?month=${month}&searchText=${searchText}&page=${page}`);
    let statistics = await axios.get(`${localUrl}/data/statistics?month=${month}`);
    let barChart = await axios.get(`${localUrl}/data/bar-chart?month=${month}`);
    ans.transactions = transactions.data;
    ans.statistics = statistics.data;
    ans.barChart = barChart.data;
    res.json(ans);
});

app.use("/data", routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

