class Reservation {
    constructor(clientName, date, time, tableNumber = null) {
        this.clientName = clientName;
        this.date = date; 
        this.time = time; 
        this.tableNumber = tableNumber;
    }
}

module.exports = Reservation;