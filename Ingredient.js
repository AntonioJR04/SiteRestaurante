class Ingredient {
    constructor(id, name, stockQuantity, unit, costPerUnit, minStockLevel) {
        this.id = id;
        this.name = name;
        this.stockQuantity = stockQuantity; 
        this.unit = unit; 
        this.costPerUnit = costPerUnit; 
        this.minStockLevel = minStockLevel; 
    }
}

module.exports = Ingredient;