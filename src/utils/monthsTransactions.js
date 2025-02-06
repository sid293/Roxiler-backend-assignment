

function monthToNumber(month) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(month) + 1;
}

module.exports = monthToNumber;

