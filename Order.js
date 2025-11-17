class Order {
    constructor(id, tableId, items = [], status = 'ABERTO') {
        this.id = id;
        this.tableId = tableId; 
        this.items = items; 
        this.status = status; 
        this.createdAt = new Date();
    }
}

module.exports = Order;