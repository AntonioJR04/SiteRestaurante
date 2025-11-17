class Table {
    constructor(id, capacity, status = 'LIVRE') {
        this.id = id;
        this.capacity = capacity;
        this.status = status; 
    }
}

module.exports = Table;