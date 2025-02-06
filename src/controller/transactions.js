const getAllTransactionsFromMonth = require("../service/transactionsServices");

async function getAllTransactions(req, res) {
    let { month = "March", searchText = "", page = 1 } = req.query;
    let transactions = await getAllTransactionsFromMonth(month);
    searchText = searchText.toLowerCase();
    transactions = transactions.filter((transaction, index) => {
        if(transaction.title.toLowerCase().includes(searchText.toLowerCase()) || transaction.description.toLowerCase().includes(searchText.toLowerCase()) || transaction.price.toString().includes(searchText)){
            return transaction;
        }
    });
    transactions.sort((a, b) => {
        return a.id - b.id;
    });
    if(transactions.length > 10){
        let startIndex = (page - 1) * 10;
        let endIndex = startIndex + 10;
        let paginatedTransactions = transactions.slice(startIndex, endIndex);
        res.json(paginatedTransactions);
    }
    else{
        res.json(transactions);
    }
}

async function getStatistics(req, res) {
    let transactions = await getAllTransactionsFromMonth(req.query.month);
    let price = 0;
    let soldItem = 0;
    let notSoldItem = 0;

    transactions.forEach(transaction => {
        if(transaction.sold === true){
            soldItem++;
        }
        else{
            notSoldItem++;
        }
        price += transaction.price;
    });

    res.json({
        totalSale:price,
        totalSoldItem:soldItem,
        totalNotSoldItem:notSoldItem
    });
}

async function getBarChart(req, res) {
    let transactions = await getAllTransactionsFromMonth(req.query.month);
    const priceRanges = [

        { range: "0 - 100", count: 0 },
        { range: "101 - 200", count: 0 },
        { range: "201 - 300", count: 0 },
        { range: "301 - 400", count: 0 },
        { range: "401 - 500", count: 0 },
        { range: "501 - 600", count: 0 },
        { range: "601 - 700", count: 0 },
        { range: "701 - 800", count: 0 },
        { range: "801 - 900", count: 0 },
        { range: "901 - above", count: 0 }
    ];

    transactions.forEach(transaction => {
        const price = transaction.price;
        if (price <= 100) priceRanges[0].count++;
        else if (price <= 200) priceRanges[1].count++;
        else if (price <= 300) priceRanges[2].count++;
        else if (price <= 400) priceRanges[3].count++;
        else if (price <= 500) priceRanges[4].count++;
        else if (price <= 600) priceRanges[5].count++;
        else if (price <= 700) priceRanges[6].count++;
        else if (price <= 800) priceRanges[7].count++;
        else if (price <= 900) priceRanges[8].count++;
        else priceRanges[9].count++;
    });
    res.json(priceRanges);
}

async function getPieChart(req, res) {
    let transactions = await getAllTransactionsFromMonth(req.query.month);
    const categoryCounts = {};

    transactions.forEach(transaction => {
        const category = transaction.category; 
        if (categoryCounts[category]) {
            categoryCounts[category]++;
        } else {
            categoryCounts[category] = 1;
        }
    });
    res.json(categoryCounts);
}

module.exports = {getAllTransactions, getStatistics, getBarChart, getPieChart};



