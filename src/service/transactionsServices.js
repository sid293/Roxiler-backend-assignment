const monthToNumber = require("../utils/monthsTransactions");
const Transaction = require("../models/models");

async function getAllTransactionsFromMonth(month) {
    let monthNumber = monthToNumber(month);

    let transactions = await Transaction.find({
        $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber]
        }
    });
    return transactions;
}

module.exports = getAllTransactionsFromMonth;

